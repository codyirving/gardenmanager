'use strict';
const {TEST_DATABASE_URL} = require('../config');
const {app, closeServer, runServer}  = require('../server');

const { Gardenbeds } = require('../public/models/gardenbeds_model');
const { BedPosition } = require('../public/models/bedPositions_model');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
// describe('isEqual', function () {
//     it('should give right answers for equal and unequal inputs', function () {
//         expect(isEqual(1, 1)).to.be.true;
//     });
// });

console.log("app" + app);

console.log("\n\n TEST_DATABASE_URL: " + JSON.stringify(TEST_DATABASE_URL));

describe('getPositions', function () {

    before(function () {
        return runServer(TEST_DATABASE_URL);
    });
    after(function () {
        return closeServer();
    });

    // note there's no `done` parameter passed to `function()` below
    it('should list positions on GET', function () {
        // since we're returning `chai.request.get.then...`
        // we don't need a `done` call back
        return chai.request(app)
            .get('/bedpositions/1')
            .then(function (res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.a('array');
                expect(res.body.length).to.be.above(0);
                 res.body.forEach(position => {
                     position.forEach(nestedPosition => {
                        expect(nestedPosition).to.have.all.keys(
                            '_id','occupied','plantType','startDate');
                     });
                 });
                // check other stuff
            });
    });
});

describe('getOwners', function() {

    before(function () {
        return runServer(TEST_DATABASE_URL);
    });
    after(function () {
        return closeServer();
    });
    it('should list all bed owners on GET', function() {
        return chai.request(app)
        .get('/gardeners')
        .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.a('array');
            expect(res.body.length).to.be.be.above(0);
            res.body.forEach(item => {
                expect(item).to.have.all.keys('owner');
            });
        });
    });
});