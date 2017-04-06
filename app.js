var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';

app.use(express.static('public'));

var students= [];
var action;
var insertDocument;

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})

app.get('/action', function (req, res) {
   // Prepare output in JSON format
   var actions = req.query.fact;
   if(actions == 'add'){
     //loads form into page
    // app.get('/add', function (req, res) {
    JSON.stringify(students);
        res.sendFile( __dirname + "/" + "user_form.htm" );
  //   })
   }
    else if(actions == 'delete'){
      res.sendFile( __dirname + "/" + "delete.htm" );
    }
    else if(actions == 'edit'){
      res.sendFile( __dirname + "/" + "edit.htm" );
    }
    else {
      function(db, callback) {
       db.collection('students').find();
        callback();
        db.close();
      };
      res.send(JSON.stringify(students));
    }
})


//loads form into page
app.get('/add', function (req, res) {
   res.sendFile( __dirname + "/" + "user_form.htm" );
})

//accesses page to add user to response
app.get('/process_add', function (req, res) {
   // Prepare output in JSON format
//   out.print("Student Submitted");
 var response = [{"first_name": req.query.first_name,
      "last_name": req.query.last_name,
      "program": req.query.program }];
//adds the response to the students array
students.push(response);
   console.log(students);
  function(db, callback) {
   db.collection('students').insertOne( {
      "address" : {
         "FirstName" : "first_name",
         "LastName" : "last_name",
         "Program" : "program",
      }
   }, function(err, result) {
    assert.equal(err, null);
    callback();
    db.close();
  });
};

   res.sendFile( __dirname + "/" + "index.htm" );
})

//lists the users currently enrolled
app.get('/list', function (req, res) {
  res.end(JSON.stringify(students));
})

//calls the delete form
app.get('/delete', function (req, res) {
	res.sendFile( __dirname + "/" + "delete.htm" );
})

//deletes the student
app.get('/process_delete', function (req, res) {
var response = req.query.first_name;
//finds the removed student and delete them from the students array
for (var a = 0; a < students.length; a++) {
    if(students[a][0].first_name == response)
  		students.splice(a,1);
}
function(db, callback) {
 db.collection('students').remove(FirstName : "response");
  callback();
  db.close();
};
 res.sendFile( __dirname + "/" + "index.htm" );

})

//updates the student
app.get('/process_edit',function(req, res){
  var response = req.query.first_name;
  var progChange = req.query.prog_change;
  function(db, callback) {
   db.collection('students').updateOne(FirstName : "response"),
   {
     $set: { "Program" : "progChange"}
   }
    callback();
    db.close();
  };

})

//creates the server on the port
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
