import YaaS from 'yaas.js';
import express from 'express';
import bodyParser from 'body-parser';
import schedule from 'node-schedule';

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

function retrieveTrailsConditions() {
    // Retrieve the trails conditions
    openDataService.fetch(config.trailsConditionsPath)
        .then(data => {
            const payload = openDataService.toJSON(data);
            if(openDataService.isPayloadValid(payload, config.trailsJSONRootKey, config.trailsJSONArrayKey)){
                const trails = payload[config.trailsJSONRootKey][config.trailsJSONArrayKey];
                if(trails) {
                    trails.forEach(trail => {
                        if(trail.hasOwnProperty('nom')) {
                            const name = trail['nom'];
                            const id = name.toLowerCase().replace(/[^\w]/gi, '');
                            trail.id = id;
                        }
                        console.log(payload[config.trailsJSONRootKey][config.trailsJSONArrayKey]);
                    })
                }
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
}


// Initialize the schedule task
// The job will be executed every 59 minutes
const rule = '*/59 * * * *';
schedule.scheduleJob(rule, () => {
    retrieveTrailsConditions();
});

// Initial fetch (will be run when we start the server)
retrieveTrailsConditions();

/* Add API Endpoints
 - /trailsCondition/
 - /trailsCondition/:trailID
*/
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

router.get(config.trailItemConditionEndpoint, function(req, res) {
    yaas.document.get(config.applicationId, config.trailsDocumentType, config.trailsDocumentID).then(
        (response) => {
            // Retreive the trailID from the request parameter
            const trailID = req.params.trailID;
            // Make sure the reponse is valid. It should be as we only persist valid documents
            if(response.body[config.trailsJSONRootKey] && response.body[config.trailsJSONRootKey][config.trailsJSONArrayKey]) {
                const trails = response.body[config.trailsJSONRootKey][config.trailsJSONArrayKey];
                // Define the predicate for the search
                const matchesID = (element) => {
                    return element.id === trailID;
                };
                const trailForID = trails.find(matchesID);
                if(trailForID){
                    // If we have a match, return the response
                    res.json(trailForID);
                }
                else {
                    // Otherwise, return an empty object
                    res.json({});
                }
            }
        },
        (err) => {
            console.log(`Error getting document ${config.trailsDocumentID}: ${err}`);
        }
    );
});

// Register API endpoints
app.use('/api', router);

// Start the server
app.listen(port);
