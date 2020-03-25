const knex = require('knex');
const config = require('../../knexfile');

const conect = knex(config.development);

module.exports = conect;