# Montreal Open Data winter trails conditions service wrapper

This simple NodeJS application provides a REST API to retrieve the current Montreal winter trails conditions in JSON. The data is extracted from the [city's Open Data XML file](http://donnees.ville.montreal.qc.ca/dataset/conditions-ski/resource/41721587-bfc4-4ea5-a8d9-2a7584d9979e).
[YaaS (Hybris as a Service)](https://www.yaas.io/) is used to provide a simple persistence layer to store the current trails conditions.

## Installation
* Create a [YaaS account](https://www.yaas.io/register/) if you don't have one
* [Set-up a new project](https://devportal.yaas.io/gettingstarted/setupaproject/index.html)
* Make sure you have a `clientId`, `clientSecret`, `projectId`, `applicationId`, and you subscribed to the Persistence service with the required scopes for your client
* `git clone git@github.com:loic-d/montreal-winter-trails-conditions-service.git`
* `cd montreal-winter-trails-conditions-service`
* `npm install`
* Update `src/config.js` with your settings but leave `trailsDocumentID` unchanged. You will have to create an empty document, get the generated ID and replace it in the config file
* To do so, paste the following code in `src/index.js` and run the script to create an empty document. You can also use Postman or CURL.
```javascript
yaas.document.create(config.applicationId, config.trailsDocumentType, {})
 .then(
     (response) => {
         console.log('Document created', response);
     },
     (error) => {
         console.log(`Error creating document ${config.trailsDocumentID}`, error);
     }
 );
```
* Run `npm start` to start the application, and copy the document ID from the console output in `src/config.js`
* Remove this piece of code, save the file and you will be able to make API calls at `http://localhost:8080/api/trailsCondition`

## JSON structure
Here is an example of the returned payload
```json
{
  "statusCode": 200,
  "body": {
    "Pistes_ski": {
      "piste": [
        {
          "nom": "Sentier de raquette, Angrignon",
          "arrondissement": {
            "nom_arr": "Le Sud-Ouest",
            "cle": "sou",
            "date_maj": "2016-04-15 14:46:39"
          },
          "ouvert": "0",
          "deblaye": "0",
          "condition": "N/A"
        },
        {
          "nom": "Sentier de ski de randonnée, Angrignon",
          "arrondissement": {
            "nom_arr": "Le Sud-Ouest",
            "cle": "sou",
            "date_maj": "2016-04-15 14:46:39"
          },
          "ouvert": {},
          "deblaye": {},
          "condition": "Mauvaise"
        },
        {
          "nom": "Sentier de ski de randonnée, Berges de Lachine",
          "arrondissement": {
            "nom_arr": "Lachine",
            "cle": "lch",
            "date_maj": "2016-03-08 16:22:24"
          },
          "ouvert": "0",
          "deblaye": "0",
          "condition": "N/A"
        },
        {
          "nom": "Sentier de ski de fond, Berges de LaSalle",
          "arrondissement": {
            "nom_arr": "LaSalle",
            "cle": "lsl",
            "date_maj": "2016-03-09 06:44:38"
          },
          "ouvert": {},
          "deblaye": {},
          "condition": "Mauvaise"
        },
        {
          "nom": "Sentier de ski de fond, Berges de Verdun",
          "arrondissement": {
            "nom_arr": "Verdun",
            "cle": "ver",
            "date_maj": "2016-03-16 07:57:20"
          },
          "ouvert": "0",
          "deblaye": "0",
          "condition": "N/A"
        },
        {
          "nom": "Sentier de ski de randonnée, Maisonneuve",
          "arrondissement": {
            "nom_arr": "Rosemont - La Petite-Patrie",
            "cle": "rpp",
            "date_maj": "2016-03-07 06:07:26"
          },
          "ouvert": "1",
          "deblaye": {},
          "condition": "Mauvaise"
        },
        {
          "nom": "Sentier de ski pas de patins, Maisonneuve",
          "arrondissement": {
            "nom_arr": "Rosemont - La Petite-Patrie",
            "cle": "rpp",
            "date_maj": "2016-03-07 06:07:26"
          },
          "ouvert": "1",
          "deblaye": {},
          "condition": "Mauvaise"
        },
        {
          "nom": "Sentier pédestre, Maisonneuve",
          "arrondissement": {
            "nom_arr": "Rosemont - La Petite-Patrie",
            "cle": "rpp",
            "date_maj": "2016-03-07 06:07:26"
          },
          "ouvert": "1",
          "deblaye": {},
          "condition": "Bonne"
        },
        {
          "nom": "Sentier de ski de randonnée, Mont-Royal",
          "arrondissement": {
            "nom_arr": "Ville-Marie",
            "cle": "vma",
            "date_maj": "2016-04-24 07:31:12"
          },
          "ouvert": {},
          "deblaye": "0",
          "condition": "N/A"
        },
        {
          "nom": "Sentier de ski de fond, Parc Kent",
          "arrondissement": {
            "nom_arr": "Côte-des-Neiges - Notre-Dame-de-Grâce",
            "cle": "cdn",
            "date_maj": "2016-03-14 10:16:52"
          },
          "ouvert": {},
          "deblaye": "0",
          "condition": "N/A"
        },
        {
          "nom": "Sentier de ski de fond, Parc Loyola",
          "arrondissement": {
            "nom_arr": "Côte-des-Neiges - Notre-Dame-de-Grâce",
            "cle": "cdn",
            "date_maj": "2016-03-14 10:16:52"
          },
          "ouvert": {},
          "deblaye": "0",
          "condition": "N/A"
        },
        {
          "nom": "Sentier de ski de fond, Parc Notre-Dame-de-Grâce",
          "arrondissement": {
            "nom_arr": "Côte-des-Neiges - Notre-Dame-de-Grâce",
            "cle": "cdn",
            "date_maj": "2016-03-14 10:16:52"
          },
          "ouvert": {},
          "deblaye": "0",
          "condition": "N/A"
        },
        {
          "nom": "Sentier de ski de randonnée CP, Rosemont",
          "arrondissement": {
            "nom_arr": "Rosemont - La Petite-Patrie",
            "cle": "rpp",
            "date_maj": "2016-03-07 06:07:26"
          },
          "ouvert": {},
          "deblaye": {},
          "condition": "Mauvaise"
        }
      ]
    },
    "metadata": {
      "createdAt": "2016-09-17T17:04:41.218+0000",
      "modifiedAt": "2016-09-17T18:24:32.551+0000",
      "version": 29
    },
    "id": "57dd77a9101dcc001d1cea16"
  },
  "headers": {}
}
```

## TO DO
* Add unit tests
* Improve returned payload structure
* Code cleaning and refactoring
