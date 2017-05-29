/* eslint-disable no-unused-vars */

let Cars = { FahrerID: 0, CodriverID: 0, HerstellerID: 0, Startnumber: 0, year: 0 };
let Driver = { ID: 0, Firstname: '', Name: '', Country: 0 };
let Rally = { Rallyid: 0, Name: '', Startdate: '', Enddate: '', Country: 0 };
let Manufacturer = { ID: 0, Name: '' };

const mysql = require('mysql');

function REST_ROUTER(router, connection, md5) {
  const self = this;
  self.handleRoutes(router, connection, md5);
}

REST_ROUTER.prototype.handleRoutes = function (router, connection, md5) {
  router.get('/', (req, res) => {
    console.log('/');
    console.log(res);
    console.log(req);
  });
  router.post('/login', (req, res) => {
    const md5pw = md5(req.body.password);
    let query = `SET @p1 =  '${req.body.email}'; SET @p2 = '${md5pw}'; CALL \`Login\` (@p0 , @p1 , @p2, @p3); SELECT @p0 AS \`sessionid\`, @p3 AS \`errorcode\` ;`;
    query = mysql.format(query);
    connection.query(query, (err, rows) => {
      if (err) {
        res.json({ Error: true, Message: 'Error executing MySQL query', throw: err });
      } else {
        res.json(rows[3]);
      }
    });
  });
  router.post('/Cars_Insert', (req, res) => {
    Cars = req.body.request;
    let query = `SET @p0 =  '${req.body.sessionid}'; 
         SET @p1 =  '${Cars.FahrerID}' ; 
        SET @p2 = '${Cars.CodriverID}' ; 
        SET @p3 =  '${Cars.HerstellerID}' ; 
        SET @p4 =  '${Cars.Startnumber}' ;
        SET @p5 =  '${Cars.year}' ; 
        CALL \`Cars_Ins\` (@p0 , @p1 , @p2, @p3, @p4, @p5);`;
    query = mysql.format(query);
    connection.query(query, (err, rows) => {
      if (err) {
        res.json({ Error: true, Message: 'Error executing MySQL query', throw: err });
      } else {
        res.json(rows[6]);
      }
    });
  });
  router.post('/Driver_Insert', (req, res) => {
    Driver = req.body.request;
    let query = `SET @p0 =  '${req.body.sessionid}'; 
        SET @p1 = '${Driver.Firstname}'; 
        SET @p2 = '${Driver.Name} '; 
        SET @p3 = '${Driver.Country}'; 
        CALL \`Driver_Ins\` (@p0 , @p1 , @p2, @p3);`;
    query = mysql.format(query);
    connection.query(query, (err, rows) => {
      if (err) {
        res.json({ Error: true, Message: 'Error executing MySQL query', throw: err });
        console.log(err);
      } else {
        console.log(rows[4]);
        res.json(rows[4]);
      }
    });
  });
  router.post('/CoDriver_Insert', (req, res) => {
    Driver = req.body.request;
    let query = `SET @p0 =  '${req.body.sessionid}'; 
        SET @p1 = '${Driver.Firstname}'; 
        SET @p2 = '${Driver.Name}'; 
        SET @p3 = '${Driver.Country}'; 
        CALL \`CoDriver_Ins\` (@p0 , @p1 , @p2, @p3);`;
    query = mysql.format(query);
    connection.query(query, (err, rows) => {
      if (err) {
        res.json({ Error: true, Message: 'Error executing MySQL query', throw: err });
        console.log(err);
      } else {
        console.log(rows[4]);
        res.json(rows[4]);
      }
    });
  });
  router.post('/Car_Del', (req, res) => {
    let query = `SET @p0 = '${req.body.sessionid}'; 
        SET @p1 = '${req.body.caryear}'; 
        SET @p2 = '${req.body.startnr}';
        CALL \`Car_Del\` (@p0 , @p1 , @p2);`;
    query = mysql.format(query);
    connection.query(query, (err, rows) => {
      if (err) {
        res.json({ Error: true, Message: 'Error executing MySQL query', throw: err });
      } else {
        res.json(rows[3]);
      }
    });
  });
  router.post('/Manufacturer_Insert', (req, res) => {
    Manufacturer = req.body.request;
    let query = `SET @p0 =  '${req.body.sessionid}'; 
        SET @p1 = '${Manufacturer.Name}'; 
        CALL \`Manufacturer_Ins\` (@p0 , @p1);`;
    query = mysql.format(query);
    connection.query(query, (err, rows) => {
      if (err) {
        res.json({ Error: true, Message: 'Error executing MySQL query', throw: err });
        console.log(err);
      } else {
        console.log(rows[2]);
        res.json(rows[2]);
      }
    });
  });
  router.post('/Rally_Insert', (req, res) => {
    Rally = req.body.request;
    let query = `SET @p0 =  'req.body.sessionid'; 
        SET @p1 = '${Rally.Name}';
        SET @p2 = '${Rally.Startdate}';
        SET @p3 = '${Rally.Enddate}';
        SET @p4 = '${Rally.Country}';
        CALL \`Rally_Ins\` (@p0 , @p1, @p2, @p3, @p4);`;
    query = mysql.format(query);
    connection.query(query, (err, rows) => {
      if (err) {
        res.json({ Error: true, Message: 'Error executing MySQL query', throw: err });
        console.log(err);
      } else {
        console.log(rows[5]);
        res.json(rows[5]);
      }
    });
  });
  router.get('/Drivers_Get', (req, res) => {
    let query = 'CALL `Drivers_get` ();';
    query = mysql.format(query);
    connection.query(query, (err, rows) => {
      if (err) {
        res.json({ Error: true, Message: 'Error executing MySQL query' });
      } else {
        res.json(rows[0]);
      }
    });
  });
  router.get('/CoDrivers_Get', (req, res) => {
    let query = 'CALL `CoDrivers_get` ();';
    query = mysql.format(query);
    connection.query(query, (err, rows) => {
      if (err) {
        res.json({ Error: true, Message: 'Error executing MySQL query' });
      } else {
        res.json(rows[0]);
      }
    });
  });
  router.get('/Cars_Get/:year', (req, res) => {
    let query = `SET @p0 = '${req.params.year}'; CALL \`Cars_get\` (@p0);`;
    query = mysql.format(query);
    connection.query(query, (err, rows) => {
      if (err) {
        res.json({ Error: true, Message: 'Error executing MySQL query' });
      } else {
        res.json(rows[1]);
      }
    });
  });
  router.get('/Manufacturer_Get', (req, res) => {
    let query = 'CALL `Manufacturer_get` ();';
    query = mysql.format(query);
    connection.query(query, (err, rows) => {
      if (err) {
        res.json({ Error: true, Message: 'Error executing MySQL query' });
      } else {
        res.json(rows[0]);
      }
    });
  });
  router.get('/Countrys_Get', (req, res) => {
    let query = 'CALL `Country_get` ();';
    query = mysql.format(query);
    connection.query(query, (err, rows) => {
      if (err) {
        res.json({ Error: true, Message: 'Error executing MySQL query' });
      } else {
        res.json(rows[0]);
      }
    });
  });

  router.get('/Rallys_Get', (req, res) => {
    let query = 'SELECT Rallyid, Rallys.Name, startdate as Startdate, enddate as Enddate, landid as Country from Rallys';
    query = mysql.format(query);
    connection.query(query, (err, rows) => {
      if (err) {
        res.json({ Error: true, Message: 'Error executing MySQL query', throw: err });
      } else {
        res.json(rows);
      }
    });
  });
};

module.exports = REST_ROUTER;
