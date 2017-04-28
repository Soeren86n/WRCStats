var Cars = { FahrerID : 0, CodriverID : 0, HerstellerID : 0, Startnumber : 0,  year : 0};
var Driver = {  ID: 0, Firstname: '', Name: '', Country: 0};
var Rally = {    Rallyid: 0, Name: '', Startdate: '', Enddate: '', Country: 0};
var Manufacturer = { ID: 0, Name: ''};

var mysql = require("mysql");
function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {
    router.get("/",function(req,res){
        console.log('/');
    });
    router.post("/login",function(req,res){
       var query = "SET @p1 =  '"+req.body.email+"'; SET @p2 = '"+md5(req.body.password)+"'; CALL `Login` (@p0 , @p1 , @p2, @p3);SELECT @p0 AS  `sessionid`, @p3 AS `errorcode` ;";
        query = mysql.format(query);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query", throw: err});
            } else {
                res.json(rows[3]);
            }
        });
    });
    router.post("/Cars_Insert",function(req,res){
        Cars = req.body.request;
        var query = "SET @p0 =  '"+req.body.sessionid+"'; " +
            "SET @p1 = '"+Cars.FahrerID+"'; " +
            "SET @p2 = '"+Cars.CodriverID+"'; " +
            "SET @p3 = '"+Cars.HerstellerID+"'; " +
            "SET @p4 = '"+Cars.Startnumber+"'; " +
            "SET @p5 = '"+Cars.year+"'; " +
            "CALL `Cars_Ins` (@p0 , @p1 , @p2, @p3, @p4, @p5);";
        query = mysql.format(query);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query", throw: err});
            } else {
                res.json(rows[6]);
            }
        });
    });
    router.post("/Driver_Insert",function(req,res){
        Driver = req.body.request;
        var query = "SET @p0 =  '"+req.body.sessionid+"'; " +
            "SET @p1 = '"+Driver.Firstname+"'; " +
            "SET @p2 = '"+Driver.Name+"'; " +
            "SET @p3 = '"+Driver.Country+"'; " +
            "CALL `Driver_Ins` (@p0 , @p1 , @p2, @p3);";
        query = mysql.format(query);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query", throw: err});
                console.log(err);
            } else {
                console.log(rows[4]);
                res.json(rows[4]);
            }
        });
    });
    router.post("/CoDriver_Insert",function(req,res){
        Driver = req.body.request;
        var query = "SET @p0 =  '"+req.body.sessionid+"'; " +
            "SET @p1 = '"+Driver.Firstname+"'; " +
            "SET @p2 = '"+Driver.Name+"'; " +
            "SET @p3 = '"+Driver.Country+"'; " +
            "CALL `CoDriver_Ins` (@p0 , @p1 , @p2, @p3);";
        query = mysql.format(query);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query", throw: err});
                console.log(err);
            } else {
                console.log(rows[4]);
                res.json(rows[4]);
            }
        });
    });
    router.post("/Car_Del",function(req,res){
        console.log(req.body.sessionid);
        console.log(req.body.caryear);
        console.log(req.body.startnr);
        var query = "SET @p0 =  '"+req.body.sessionid+"'; " +
            "SET @p1 = '"+req.body.caryear+"'; " +
            "SET @p2 = '"+req.body.startnr+"'; " +
            "CALL `Car_Del` (@p0 , @p1 , @p2);";
        query = mysql.format(query);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query", throw: err});
            } else {
                res.json(rows[3]);
            }
        });
    });
    router.post("/Manufacturer_Insert",function(req,res){
        Manufacturer = req.body.request;
        var query = "SET @p0 =  '"+req.body.sessionid+"'; " +
            "SET @p1 = '"+Manufacturer.Name+"'; " +
            "CALL `Manufacturer_Ins` (@p0 , @p1);";
        query = mysql.format(query);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query", throw: err});
                console.log(err);
            } else {
                console.log(rows[2]);
                res.json(rows[2]);
            }
        });
    });
    router.post("/Rally_Insert",function(req,res){
        Rally = req.body.request;
        var query = "SET @p0 =  '"+req.body.sessionid+"'; " +
            "SET @p1 = '"+Rally.Name+"'; " +
            "SET @p2 = '"+Rally.Startdate+"'; " +
            "SET @p3 = '"+Rally.Enddate+"'; " +
            "SET @p4 = '"+Rally.Country+"'; " +
            "CALL `Rally_Ins` (@p0 , @p1, @p2, @p3, @p4);";
        query = mysql.format(query);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query", throw: err});
                console.log(err);
            } else {
                console.log(rows[5]);
                res.json(rows[5]);
            }
        });
    });
    router.get("/Drivers_Get",function(req,res){
        var query = "CALL `Drivers_get` ();";
        query = mysql.format(query);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json(rows[0]);
            }
        });
    });
    router.get("/CoDrivers_Get",function(req,res){
        var query = "CALL `CoDrivers_get` ();";
        query = mysql.format(query);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json(rows[0]);
            }
        });
    });
    router.get("/Cars_Get/:year",function(req,res){
        var query = "SET @p0 = '"+req.params.year+"'; CALL `Cars_get` (@p0);";
        query = mysql.format(query);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json(rows[1]);
            }
        });
    });
    router.get("/Manufacturer_Get",function(req,res){
        var query = "CALL `Manufacturer_get` ();";
        query = mysql.format(query);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json(rows[0]);
            }
        });
    });
    router.get("/Countrys_Get",function(req,res){
        var query = "CALL `Country_get` ();";
        query = mysql.format(query);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query", throw: err});
            } else {
                res.json(rows[0]);
            }
        });
    });

    router.get("/Rallys_Get",function(req,res){
        var query = "SELECT Rallyid, Rallys.Name, startdate as Startdate, enddate as Enddate, landid as Country from Rallys";
        query = mysql.format(query);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query", throw: err});
            } else {
                res.json(rows);
            }
        });
    });

    /*
    router.post("/Rally_Insert",function(req,res){
        var query = "SET @p0 =  '"+req.body.sessionid+"'; " +
            "SET @p1 = '"+req.body.name+"'; " +
            "SET @p2 = '"+req.body.startdate+"'; " +
            "SET @p3 = '"+req.body.enddate+"'; " +
            "SET @p4 = '"+req.body.landid+"'; " +
            "CALL `Rally_Insert` (@p0 , @p1 , @p2, @p3, @p4);";
        query = mysql.format(query);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query", throw: err});
            } else {
                res.json({"Error" : false, "Message" : rows[5]});
            }
        });
    });
    router.post("/Stages_Insert",function(req,res){
        var query = "SET @p0 =  '"+req.body.sessionid+"'; " +
            "SET @p1 = '"+req.body.cancelled+"'; " +
            "SET @p2 = '"+req.body.datetime+"'; " +
            "SET @p3 = '"+req.body.day+"'; " +
            "SET @p4 = '"+req.body.länge+"'; " +
            "SET @p5 = '"+req.body.name+"'; " +
            "SET @p6 = '"+req.body.rallyid+"'; " +
            "SET @p7 = '"+req.body.stagenumber+"'; " +
            "CALL `Stages_Insert` (@p0 , @p1 , @p2, @p3, @p4, @p5, @p6, @p7);";
        query = mysql.format(query);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query", throw: err});
            } else {
                res.json({"Error" : false, "Message" : rows[8]});
            }
        });
    });
    router.post("/StageTimes_Insert",function(req,res){
        var query = "SET @p0 =  '"+req.body.sessionid+"'; " +
            "SET @p1 = '"+req.body.fahrerid+"'; " +
            "SET @p2 = '"+req.body.herstellerid+"'; " +
            "SET @p3 = '"+req.body.stageid+"'; " +
            "SET @p4 = '"+req.body.zeit+"'; " +
            "SET @p5 = '"+req.body.rallyid+"'; " +
            "CALL `StageTimes_Insert` (@p0 , @p1 , @p2, @p3, @p4, @p5);";
        query = mysql.format(query);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query", throw: err});
            } else {
                res.json({"Error" : false, "Message" : rows[6]});
            }
        });
    });
    router.get("/Laender_Get",function(req,res){
        var query = "SELECT landid, Name FROM ??";
        var table = ["Länder"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Laender" : rows});
            }
        });
    });
    router.get("/Stages_Get",function(req,res){
        var query = "SELECT Stages.rallyid, Rallys.name as Rallyname,  stageid, Stages.Name as Stagename, stagenumber, day, datetime, cancelled, länge from Stages LEFT JOIN Rallys ON Stages.rallyid = Rallys.rallyid";
        query = mysql.format(query);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Stages" : rows});
            }
        });
    });


    router.get("/users/:user_id",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["user_login","user_id",req.params.user_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
            }
        });
    });
    router.put("/users",function(req,res){
        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        var table = ["user_login","user_password",md5(req.body.password),"user_email",req.body.email];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Updated the password for email "+req.body.email});
            }
        });
    });
    router.delete("/users/:email",function(req,res){
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["user_login","user_email",req.params.email];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Deleted the user with email "+req.params.email});
            }
        });
    });
    */
}

module.exports = REST_ROUTER;