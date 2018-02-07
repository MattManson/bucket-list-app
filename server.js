const express = require('express');
const server = express();
const bodyparser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

server.use(bodyparser.json());
server.use(express.static('client/build'));
server.use(bodyparser.urlencoded({extended: true}));

MongoClient.connect('mongodb://localhost:27017', function(err, client){
  if(err){
    console.log(err);
    return;
  }

  const db = client.db('bucketList');
  console.log("connected to database");

  server.post('/api/countries',function(req,res){
    db.collection('countries').save(req.body, function(err, result){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }
      res.status(201);
      res.json(result.ops[0]);
      console.log("saved to database");
    });
  });


  server.get('/api/countries', function(req,res){
    db.collection('countries').find().toArray(function(err,result){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }
      res.json(result);
      console.log("found");
    });
  });

  server.delete('/api/countries', function(req, res){
    db.collection('countries').remove({}, function(err,result){
      if(err){
        res.status(500);
        res.send();
      }
      res.status(204);
      res.send();
      console.log("deleted");
    });
  })

  server.put('/api/countries/:id', function(req,res){
    db.collection('countries').update({_id: ObjectID(req.params.id)}, req.body,function(err,result){
      if (err) {
        res.status(500);
        res.send();
      }
      res.status(205);
      res.send();
    });
  })



  server.listen(3000, function(){
    console.log("listening on port 3000");
  })


})
