const express = require('express');
const app = express();
const expressip = require('express-ip');
const PORT = process.env.PORT || 7000;
const path = require('path');
request = require('request');
const bodyParser = require('body-parser')

var cors = require('cors')
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false })
)
app.use(expressip().getIpInfoMiddleware);


app.set("PORT", PORT);

app.get('/', function (req, res) {
    console.log(req.ipInfo);
    
    res.json(req.ipInfo);
});

app.get('/location', (req, res) => {
    request('http://ec2-18-156-172-95.eu-central-1.compute.amazonaws.com:7000/', (err, response, body) => {
      if(err)
        return res.status(500).send({message: err});
     
      return res.send(body);
    });
   });

   app.get('/loc', (req, res) => {
     request('localhost:7000/', (err, response, body) => {
       if(err)
         return res.status(500).send({message: err});
      
       return res.send(body);
     });
    });
   
   app.get('/serv', (req, res) => {
    console.log('req.socket', req.socket._peername);
    let ipUser = req.ipInfo.ip
    let position = ipUser.slice(2).indexOf(":") + 1
    ipUser = ipUser.slice(position + 2)
    console.log('req.ipInfo.ip', ipUser);
      
      request(`http://free.ipwhois.io/json/`, (err, response, body) => {
        console.log("1111111111111");
        let data = JSON.parse(body);
        console.log(data);
        
        if(err)
          return res.status(500).send({message: err});
       
        return res.json(data.country_code);
      });
     });

app.listen(app.get('PORT'), function () {
    console.log('Express started on http://localhost:' +
        app.get('PORT') + '; press Ctrl-C to terminate. CORS enabled');
});