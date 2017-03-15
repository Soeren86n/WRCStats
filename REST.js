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
    router.post("/Cars_Insert",function(req,res){
        
        console.log(req);
        console.log(req.body.y);
        res.json({"Error" : false, "x" : req.body.x, "y" : req.body.y});
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
        console.log(req.params.year);
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
    router.get("/Rallys_Get",function(req,res){
        var query = "SELECT rallyid, Rallys.name, startdate, enddate, Länder.Name as Country from Rallys LEFT JOIN Länder ON Rallys.landid = Länder.landid";
        query = mysql.format(query);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query", throw: err});
            } else {
                res.json(rows);
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

/*
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