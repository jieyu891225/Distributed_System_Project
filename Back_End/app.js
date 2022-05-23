import db from './DB.js';
import express from 'express';
const app = express();

app.use(express.json());


app.get('/line_info', function (req, res) {
    db.getLineInfos(req.query.user_id).then(function(result){
        res.json(result)
    });
})

app.put('/line_info', function(req, res) {
    db.updateLineInfo(req.query).then(function(result){
        if(result==true){
            res.status(200);
            res.end();
        }else{
            res.status(400);
            res.end();
        }
    })
})

 var server = app.listen(8001, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("listening at http://%s:%s", host, port)
 })
