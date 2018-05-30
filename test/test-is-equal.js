const isEqual = require('../isEqual');

const { app } = require('../app');
const { Gardenbeds } = require('../public/models/gardenbeds_model');
const { BedPosition } = require('../public/models/bedPositions_model');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);
// describe('isEqual', function () {
//     it('should give right answers for equal and unequal inputs', function () {
//         expect(isEqual(1, 1)).to.be.true;
//     });
// });

describe('getPositions', function () {

    // before(function () {
    //     return runServer();
    // });
    // after(function () {
    //     return closeServer();
    // });

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