// Application configuration
const config = {
    // YaaS
    clientId: 'TjAEGvp4Tmg98Kt525BNLcnNcf0PXlsl',
    clientSecret: '8926X9QhxPjNCW4c',
    scopes: 'hybris.document_view hybris.document_manage hybris.search_view',
    projectId: 'wintertrails',
    applicationId: 'wintertrails.nodejsclient',

    // Trails Ressource
    trailsConditionsPath: 'http://www2.ville.montreal.qc.ca/services_citoyens/pdf_transfert/L29_PISTE_SKI.xml',
    trailsJSONRootKey: 'Pistes_ski',
    trailsJSONArrayKey: 'piste',
    trailsDocumentType: 'trailsConditionDocument',
    trailsDocumentID: '57dd77a9101dcc001d1cea16',

    // API Endpoint
    trailsConditionEndpoint: '/trailsCondition'
};

export default config