'use strict';
const { TEST_DATABASE_URL, ADMIN_TEST_USER, ADMIN_TEST_PASS } = require('../config');
const { app, closeServer, runServer } = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const jwt = require('jsonwebtoken');
const config = require('../config');
chai.use(chaiHttp);

console.log("\n\n TEST_DATABASE_URL: " + JSON.stringify(TEST_DATABASE_URL));

//seed test db
let seedData = require('../public/models/db_seed_data');


describe('test endpoints', function () {

    before(function () {
        return runServer(TEST_DATABASE_URL);
    });

    beforeEach(function () {
        return seedData;
    });


    after(function () {
        return closeServer();
    });

    describe('getPositions', function () {

        // note there's no `done` parameter passed to `function()` below
        it('should list positions on GET', function () {
            // since we're returning `chai.request.get.then...`
            // we don't need a `done` call back
            return chai.request(app)
                .get('/bed/1/positions')
                .then(function (res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.be.above(0);
                    res.body.forEach(position => {
                        position.forEach(nestedPosition => {
                            expect(nestedPosition).to.have.all.keys(
                                '_id', 'occupied', 'plantType', 'startDate', 'harvestDate');
                        });
                    });
                    // check other stuff
                });
        });
    });


    describe('getOwners', function () {


        it('should list all bed owners on GET', function () {
            return chai.request(app)
                .get('/gardeners')
                .then(function (res) {
                    expect(res).to.have.status(200);
                    //expect(res).to.be.json;
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.be.be.above(0);
                    res.body.forEach(item => {
                        expect(item).to.have.all.keys('owner');
                    });
                });
        });
    });

    //BED Route Tests

    describe('GET all beds in garden', function () {

        it('should get array of all beds in garden', function () {
            return chai.request(app)
                .get('/bed/')
                .then(function (res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body.length).to.be.above(0);
                    expect(res.body).to.be.a('array');

                });
        });
    });


    describe('GET all information for a bed', function () {
        //create new user to auth
        console.log("admin : " + config.ADMIN_TEST_PASS + " user: " + config.ADMIN_TEST_USER);
        const user = {
            "username": config.ADMIN_TEST_USER,
            "password": config.ADMIN_TEST_PASS
        };
        const createAuthToken = function (user) {
            return jwt.sign({ user }, config.JWT_SECRET, {
                subject: user.username,
                expiresIn: config.JWT_EXPIRY,
                algorithm: 'HS256'
            });
        };

        const authToken = createAuthToken((user));
        it('should get position information for bed', function () {
            return chai.request(app)
                .get('/bed/1/')
                .set('Cookie',`authToken=${authToken}`)
                .then(function (res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body).to.have.all.keys('__v', '_id', 'length', 'width', 'bedPositions', 'bedNumber',
                        'owner', 'contact', 'notes', 'media', 'soilLog', 'notifications', 'dateAcquired');
                });
        });
    });


    describe('GET position information for a bed', function () {

        it('should get position information for bed', function () {
            return chai.request(app)
                .get('/bed/1/0,0')
                .then(function (res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body).to.have.all.keys('_id', 'occupied', 'plantType', 'startDate', 'harvestDate');
                });
        });
    });


    //NOTIFICATION ROUTE TESTS

    describe('GET all notifications for a bed', function () {

        it('should get position information for bed', function () {
            return chai.request(app)
                .get('/bed/1/notifications/')
                .then(function (res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body.notifications).to.be.a('array');
                });
        });
    });

    describe('POST a new notification for bed', function () {

        it('should get position information for bed', function () {
            const newNotificationData = {
                message: "new notification message"
            };
            return chai.request(app)
                .post('/bed/1/notifications/')
                .send(newNotificationData)
                .then(function (res) {
                    expect(res).to.have.status(201);
                    expect(res).to.be.json;

                });
        });
    });


    //BED POSITIONS ROUTE TESTS
    describe('POST an update to bed position', function () {

        it('update position in bed', function () {
            const newBedPositionData = {
                occupied: false,
                startDate: "Jan 1 2003"
            };
            return chai.request(app)
                .post('/bed/1/0,0/')
                .send(newBedPositionData)
                .then(function (res) {
                    console.log("POST update bedposition resp: " + JSON.stringify(res.body));
                    expect(res).to.have.status(201);
                    expect(res).to.be.json;
                    //expect(res.body.bedPositions[0][0].occupied).to.be.false;
                });
        });
    });

    //BED DETAILS ROUTE TESTS
    describe('POST an update to bed details', function () {

        it('update details in bed', function () {
            const newBedDetailData = {
                owner: "Franklin",
                dateAcquired: "Feb 29 1629"

            };
            //create new user to auth
            const user = {
                "username": config.ADMIN_TEST_USER,
                "password": config.ADMIN_TEST_PASS
            };
            const createAuthToken = function (user) {
                return jwt.sign({ user }, config.JWT_SECRET, {
                    subject: user.username,
                    expiresIn: config.JWT_EXPIRY,
                    algorithm: 'HS256'
                });
            };

            const authToken = createAuthToken((user));


            return chai.request(app)
                .post('/bed/1')
                .set('Cookie', `authToken=${authToken}`)
                .send(newBedDetailData)
                .then(function (res) {
                    console.log("POST update beddetail resp: " + JSON.stringify(res.body) + "  END #############");
                    expect(res).to.have.status(201);
                    expect(res).to.be.json;
                    //expect(res.body.owner).to.eql("Franklin");

                });
        });
    });

});
