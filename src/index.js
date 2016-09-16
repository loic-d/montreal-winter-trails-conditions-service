import YaaS from 'yaas.js';
import express from 'express';
import bodyParser from 'body-parser';

let yaas = new YaaS();
let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 8080;

const clientId = 'TjAEGvp4Tmg98Kt525BNLcnNcf0PXlsl';
const clientSecret = '8926X9QhxPjNCW4c';
const scopes = 'hybris.document_view hybris.document_manage hybris.search_view';
const projectId = 'wintertrails';

let router = express.Router();

yaas.init(
  clientId,
  clientSecret,
  scopes,
  projectId
)
.then(function(response) {
    console.log('INIT OK');
}, function(reason) {
    console.log('INIT FAILED')
});


const trail = {
  "name": "Mont Royal",
  "condition": "Good"
};

yaas.document.create('wintertrails.nodejsclient', 'trail', trail)
.then(
    function(response){
        console.log(response);
    },
    function(err){
        console.error('Error: ', err);
    }
);

router.get('/trails', function(req, res) {

console.log('in trails');
    yaas.document.get('wintertrails.nodejsclient', 'trail', '57dc1472aadac4001d904132').then(
        function(response){
          res.json(response);
        },
        function(err){
            console.error('Error: ', err);
        }
    );

});

app.use('/api', router);
app.listen(port);
console.log('Magic happens on port ' + port);
