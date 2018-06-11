'use strict';
const {TEST_DATABASE_URL} = require('../config');
const {app, closeServer, runServer}  = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

console.log("\n\n TEST_DATABASE_URL: " + JSON.stringify(TEST_DATABASE_URL));

//seed test db
require('../public/models/db_seed_data');

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
                            '_id','occupied','plantType','startDate','harvestDate');
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

describe('getHome', function() {

    before(function () {
        return runServer(TEST_DATABASE_URL);
    });
    after(function () {
        return closeServer();
    });
    it('should get full gardenbed information', function() {
        return chai.request(app)
        .get('/')
        .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.html;

        });
    });
});

//BED Route Tests

describe('GET all beds in garden', function() {
        
    before(function () {
        return runServer(TEST_DATABASE_URL);
    });
    after(function () {
        return closeServer();
    });

    it('should get array of all beds in garden', function() {
        return chai.request(app)
        .get('/bed/')
        .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body.length).to.be.above(0);
            expect(res.body).to.be.a('array');
            
        });
    });
});


describe('GET all information for a bed', function() {
    
    before(function () {
        return runServer(TEST_DATABASE_URL);
    });
    after(function () {
        return closeServer();
    });

    it('should get position information for bed', function() {
        return chai.request(app)
        .get('/bed/1/')
        .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.have.all.keys('__v','_id','length','width','bedPositions','bedNumber',
        'owner', 'contact', 'notes', 'media', 'soilLog', 'notifications', 'dateAcquired');
        });
    });
});
   

describe('GET position information for a bed', function() {
    
    before(function () {
        return runServer(TEST_DATABASE_URL);
    });
    after(function () {
        return closeServer();
    });

    it('should get position information for bed', function() {
        return chai.request(app)
        .get('/bed/1/0,0')
        .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.have.all.keys('_id','occupied','plantType','startDate','harvestDate');
        });
    });
});
       
//NOTIFICATION ROUTE TESTS

describe('GET all notifications for a bed', function() {
        
    before(function () {
        return runServer(TEST_DATABASE_URL);
    });
    after(function () {
        return closeServer();
    });

    it('should get position information for bed', function() {
        return chai.request(app)
        .get('/bed/1/notifications/')
        .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body.notifications).to.be.a('array');
        });
    });
});
describe('POST a new notification for bed', function() {
        
    before(function () {
        return runServer(TEST_DATABASE_URL);
    });
    after(function () {
        return closeServer();
    });

    it('should get position information for bed', function() {
        const newNotificationData = {
            message: "new notification message"
        };
        return chai.request(app)
        .post('/bed/1/notifications/')
        .send(newNotificationData)
        .then(function(res) {
            expect(res).to.have.status(201);
            expect(res).to.be.json;
            expect(res.body.success).to.be.true;
        });
    });
});

//BED POSITIONS ROUTE TESTS
describe('POST an update to bed position', function() {
    before(function () {
        return runServer(TEST_DATABASE_URL);
    });
    after(function () {
        return closeServer();
    });
  
    it('update position in bed', function() {
        const newBedPositionData = {
            occupied: false,
            startDate: "Jan 1 2003"
        };
        return chai.request(app)
        .post('/bed/1/0,0/')
        .send(newBedPositionData)
        .then(function(res) {
            expect(res).to.have.status(201);
            expect(res).to.be.json;
            expect(res.body.bedPositions[0][0].occupied).to.be.false;
        });
    });
});

//BED DETAILS ROUTE TESTS
describe('POST an update to bed details', function() {
    before(function () {
        return runServer(TEST_DATABASE_URL);
    });
    after(function () {
        return closeServer();
    });
  
    it('update position in bed', function() {
        const newBedDetailData = {
            owner: "Franklin",
            dateAcquired: "Feb 29 1629"

        };
        return chai.request(app)
        .post('/bed/1')
        .send(newBedDetailData)
        .then(function(res) {
            expect(res).to.have.status(201);
            expect(res).to.be.json;
            expect(res.body.owner).to.eql("Franklin");

        });
    });
});