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

app.get('/api/dataload', function(req, res) { 
    var dbConn = new sql.ConnectionPool(config);
    dbConn.connect().then(function () {
        var request = new sql.Request(dbConn);
            request.input('AssetID', sql.VarChar, 'A02603')
            .execute("spLoad_AssetAvailable").then(function (recordset) {
                console.log(recordset);
                
                // res.setHeader('Content-Type', 'application/json');
                // res.send("data", { model: recordSet });
                //res.setHeader('Content-Type', 'application/json');
                //res.send(JSON.stringify({recordset}));
                res.json(recordset)
                dbConn.close();
        }).catch(function (err) {
            console.log(err);
            dbConn.close();
        });
    }).catch(function (err) {
        console.log(err);
    });

    // var dbConn = new sql.ConnectionPool(config);
    // dbConn.connect()
    // var request = new sql.Request(dbConn);
    // request.input('AssetID', sql.VarChar, 'A02603')
    // //request.output('output_parameter', sql.Int)
    // request.execute('spLoad_AssetAvailable', (err, result) => {
    //     // ... error checks

    //     console.log(result.recordsets.length) // count of recordsets returned by the procedure
    //     console.log(result.recordsets[0].length) // count of rows contained in first recordset
    //     console.log(result.recordset) // first recordset from result.recordsets
    //     console.log(result.returnValue) // procedure return value
    //     console.log(result.output) // key/value collection of output values
    //     console.log(result.rowsAffected) // array of numbers, each number represents the number of rows affected by executed statemens

    //     // ...
    // })

});

app.listen(3001, () =>
  console.log('Node Express server is running on localhost:3001')
);

