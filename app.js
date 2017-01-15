var express = require('express');
var app = express();
app.use(express.static('public'));
//var students = [{"first_name": "Edward", "last_name": "Woods", "program": "Sociology" }];
var students= [];
//loads form into page
app.get('/add', function (req, res) {
   res.sendFile( __dirname + "/" + "user_form.htm" );
})

//accesses page to add user to response
app.get('/process_add', function (req, res) {
   // Prepare output in JSON format
 var response = [{"first_name": req.query.first_name,
      "last_name": req.query.last_name,
      "program": req.query.program }];
//adds the response to the students array
students.push(response);
   console.log(students);
   res.end("Student submitted");
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

res.end(JSON.stringify(students));
})

//creates the server on the port
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)

})