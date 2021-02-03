var express = require("express");
var path = require("path");
var fs = require('fs');
// var fs = require ('fs');

var app = express();
var PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));



// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "notes.html"));
});

// Displays all characters
app.get("/api/characters", function(req, res) {
  return res.json(characters);
});

// returns list of notes
app.get("/api/notes", function(req, res) {
      console.log('get request received');
      res.sendFile(path.join(__dirname, "/db/db.json"));
});

// posts new note to json db
app.post("/api/notes", function(req, res) {
      var newNote = req.body;
      newNote.id = new Date();
      console.log('note with id ' +newNote);
      let data = fs.readFileSync(__dirname+"/db/db.json")
      console.log(data);
      let noteList = JSON.parse(data);
      console.log(noteList);
      noteList.push(newNote);
      fs.writeFile(__dirname+"/db/db.json", JSON.stringify(noteList), (noteData)=>{
            console.log('showing data'+noteData);
      })
      res.json(newNote);
   });
app.delete("/api/notes/:id", function(req, res) {
      console.log('working');
      console.log(req.params);
      // newNote.id = new Date();
      // console.log('note with id ' +newNote);
      // let data = fs.readFileSync(__dirname+"/db/db.json")
      // console.log(data);
      // let noteList = JSON.parse(data);
      // console.log(noteList);
      // noteList.push(newNote);
      // fs.writeFile(__dirname+"/db/db.json", JSON.stringify(noteList), (noteData)=>{
      //       console.log('showing data'+noteData);
      // })
      // res.json(newNote);
   });

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
