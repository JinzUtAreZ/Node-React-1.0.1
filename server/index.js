const sql = require('mssql');
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

// db connection
var config = {
    server: 'hc-sysdev\\devel',
    database: 'EQM',
    user: 'dev',
    password: 'dev1P@ss',
    port: 8081
};
// db connection

app.get('/api/greeting', function(req, res) { 
    var dbConn = new sql.ConnectionPool(config);
    dbConn.connect().then(function () {
        var request = new sql.Request(dbConn);
            request.input('AssetID', sql.VarChar, 'A02603')
            .execute("spLoad_AssetAvailable").then(function (recordSet) {
                console.log(recordSet);
                //res.render("data", { model: recordSet });
                
                res.setHeader('Content-Type', 'application/json');
                res.send("data", { model: recordSet });
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

