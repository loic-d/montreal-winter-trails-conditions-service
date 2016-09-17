import http from 'http';
import parser from 'xml2json';

class OpenDataService {

    constructor() {
        this._http = http;
        this._parser = parser;
    }

    fetch(resourcePath){
        // Return a new Promise
        return new Promise((resolve, reject) => {
            this._http.get(resourcePath, (response) => {
                let responseBody = "";
                response.on('data', data => {
                    responseBody += data;
                });
                response.on('end', () => {
                    // Resolve the Promise with responseBody
                    resolve(responseBody);
                })
            }).on('error', (error) => {
                // Error, reject the Promise
                console.log(`Error fetching ${resourcePath}: ${error.message}`);
                reject();
            });
        });
    }

    toJSON(XMLString) {
        // Define parsing options
        const options = {
            object: true,
            reversible: false,
            coerce: false,
            sanitize: true,
            trim: true,
            arrayNotation: false
        };

        const JSONString = this._parser.toJson(XMLString.trim());
        return JSON.parse(JSONString);
    }
}

export default OpenDataService