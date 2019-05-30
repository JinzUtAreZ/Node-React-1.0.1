const sql = require('mssql');
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const app = express();
let fs = require('fs'); 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

// db connection
var config = {
    server: 'hc-sysdev\\qa',
    database: 'EQM',
    user: 'qat',
    password: 'qapass1',
    //port: 8080
};
// db connection

app.get('/api/dataload', function(req, res) { 
    var dbConn = new sql.ConnectionPool(config);
    dbConn.connect().then(function () {
        var request = new sql.Request(dbConn);
            request.input('AssetID', sql.VarChar, 'A02609')
            .execute("spLoad_AssetAvailable").then(function (recordset) {
                
                res.json(recordset)
                var data = JSON.stringify(recordset, null, 2);
                fs.writeFileSync('./server/store.json', data, callback);
                
                function callback(){
                    console.log('Finished writing temporary storage');
                }
// sync is used to finish writing before proceeding to next block of code 
                dbConn.close();
        }).catch(function (err) {
            console.log(err);
            dbConn.close();
        });
    }).catch(function (err) {
        console.log(err);
    });

});

app.get('/api/assetdata', function(req, res) { 
    var dbConn = new sql.ConnectionPool(config);
    dbConn.connect().then(function () {
        var request = new sql.Request(dbConn);
            request.execute("spLoad_JOlist").then(function (recordset) {
                
                res.json(recordset)
                //var data = JSON.stringify(recordset, null, 2);
                //fs.writeFileSync('./server/store.json', data, callback);
                
                //function callback(){
                //    console.log('Finished writing temporary storage');
                //}
// sync is used to finish writing before proceeding to next block of code 
                dbConn.close();
        }).catch(function (err) {
            console.log(err);
            dbConn.close();
        });
    }).catch(function (err) {
        console.log(err);
    });

});



app.listen(3001, () =>
  console.log('Node Express server is running on localhost:3001')
);

