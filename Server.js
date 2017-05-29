const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const md5 = require('md5');
const Rest = require('./REST.js');

const app = express();

function REST() {
  const self = this;
  self.connectMysql();
}

REST.prototype.connectMysql = function () {
  const self = this;
  const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'simplsys',
    password: 'metceivadFebKac',
    database: 'simplsys_WRCStats',
    multipleStatements: true,
    debug: false,
  });
  pool.getConnection((err, connection) => {
    if (err) {
      self.stop(err);
    } else {
      self.configureExpress(connection);
    }
  });
};

REST.prototype.configureExpress = function (connection) {
  const self = this;
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  const router = express.Router();
  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    next();
  });
  app.use('/api', router);
  const RestRouter = new Rest(router, connection, md5);
  self.startServer();
};

REST.prototype.startServer = function () {
  app.listen(3000, () => {
    console.log('All right ! I am alive at Port 3000.');
  });
};

REST.prototype.stop = function (err) {
  console.log(`ISSUE WITH MYSQL ${err}`);
  process.exit(1);
};

const nRest = new REST();
