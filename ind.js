const express = require('express'),
         app = express(),
         request = require('request');
    
    const host = '127.0.0.1';
    const port = 3000;
    
    app.get('/', (req, res) => {
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
    
     app.get('/local', (req, res) => {
      request('127.0.0.1:7000/', (err, response, body) => {
        if(err)
          return res.status(500).send({message: err});
       
        return res.send(body);
      });
     });

    app.listen(port, host, () => console.log(`Server listens http://${host}:${port}`));