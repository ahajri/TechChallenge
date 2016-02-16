var bcrypt = require('bcrypt-nodejs'),
crypto = require('crypto');

module.exports.md5 = function md5(value) {
	return crypto.createHash('md5').update(String(value)).digest('hex');
};

