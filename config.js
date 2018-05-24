exports.DATABASE_URL = process.env.DATABASE_URL ||
                      'mongodb://localhost/gardenmanager';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL ||
                      'mongodb://localhost/test-gardenmanager-app';
exports.PORT = process.env.PORT || 3001;