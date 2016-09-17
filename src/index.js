import YaaS from 'yaas.js';
import express from 'express';
import bodyParser from 'body-parser';

import config from './config';
import OpenDataService from './services/OpenDataService';

// Initialize the YaaS NodeJS client with the provided configuration
const { clientId, clientSecret, scopes, projectId } = config;
const yaas = new YaaS();
yaas.init(clientId, clientSecret, scopes, projectId);

// Initialize and configure Express
const app = express();
const port = process.env.PORT || 8080;
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Initialize the Open Data Service
const openDataService = new OpenDataService();

// Retrieve the trails conditions
openDataService.fetch(config.trailsConditionsPath)
    .then(data => {
        const payload = openDataService.toJSON(data);
        if(payload.hasOwnProperty(config.trailsJSONRootKey)){
            // Update the trails condition document
            yaas.document.update(config.applicationId, config.trailsDocumentType, config.trailsDocumentID, payload)
            .then(
                (response) => {
                    console.log(response);
                },
                (err) => {
                    console.log(`Error updating document ${config.trailsDocumentID}: ${err}`);
                }
            );
        }
    });


// Add API Endpoints
router.get(config.trailsConditionEndpoint, function(req, res) {
    // Retrieve the trails condition document
    yaas.document.get(config.applicationId, config.trailsDocumentType, config.trailsDocumentID).then(
        (response) => {
          res.json(response);
        },
        (err) => {
            console.log(`Error getting document ${config.trailsDocumentID}: ${err}`);
        }
    );
});

// Register API endpoints
app.use('/api', router);


yaas.document.create(config.applicationId, config.trailsDocumentType, {})
.then(
    (response) => {
        console.log('create', response);
    },
    (err) => {
        console.log(`Error updating document ${config.trailsDocumentID}: ${err}`);
    }
);

// Start the server
app.listen(port);
