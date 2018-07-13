exports.DATABASE_URL = process.env.DATABASE_URL ||
                      'mongodb://localhost/gardenmanager';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL ||
                      'mongodb://localhost/test-gardenmanager-app';
exports.PORT = process.env.PORT || 3001;
exports.JWT_SECRET = process.env.JWT_SECRET || 'notsecretatall';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
exports.ADMIN_TEST_PASS = process.env.ADMIN_TEST_PASS || 'password';
exports.ADMIN_TEST_USER = process.env.ADMIN_TEST_USER || 'admin';