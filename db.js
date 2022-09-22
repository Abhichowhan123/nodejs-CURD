const { Pool } = require('pg/lib');

constpool = require('pg').Pool;
const pool  = new Pool({
    user:"postgres",
    host:"localhost",
    database:"student",
    password:"admin",
    port:5432,
})

module.exports = pool;