var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var md5 = require('MD5');
var Rest = require('./REST.js');
var app = express();

function REST() {
  var self = this;
  self.connectMysql();
}

REST.prototype.connectMysql = function () {
  var self = this;
  var pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'simplsys',
    password: 'metceivadFebKac',
    database: 'simplsys_WRCStats',
    multipleStatements: true,
    debug: false,
  });
  pool.getConnection(function (err, connection) {
    if (err) {
      self.stop(err);
    } else {
      self.configureExpress(connection);
    }
  });
};

REST.prototype.configureExpress = function (connection) {
  var self = this;
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  var router = express.Router();
  router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    next();
  });
  app.use('/api', router);
  var Rest_Router = new Rest(router, connection, md5);
  self.startServer();
};

REST.prototype.startServer = function () {
  app.listen(3000, function () {
    console.log('All right ! I am alive at Port 3000.');
  });
};

REST.prototype.stop = function (err) {
  console.log('ISSUE WITH MYSQL' + err);
  process.exit(1);
};

new REST();
