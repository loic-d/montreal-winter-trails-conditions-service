import http from 'http';
import assert from 'assert';

import OpenDataService from './../src/services/OpenDataService';

import '../src/index.js';

describe('API endpoint', () => {
    it('/trailsCondition should return 200', done => {
        http.get('http://localhost:8080/api/trailsCondition', res => {
            assert.equal(200, res.statusCode);
            done();
        });
    });
});

describe('OpenDataService', () => {
    it('constructor should create a new instance', done => {
       const openDataService = new OpenDataService();
       assert.notStrictEqual(openDataService, undefined);
       done();
    });

    it('instance should have a fetch method', done => {
        const openDataService = new OpenDataService();
        assert.notStrictEqual(openDataService.fetch, undefined);
        done();
    });

    it('instance should have a toJSON method', done => {
        const openDataService = new OpenDataService();
        assert.notStrictEqual(openDataService.toJSON, undefined);
        done();
    });
});