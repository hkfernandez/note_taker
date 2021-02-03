var express = require("express");
var path = require("path");
var fs = require('fs');

var app = express();
var PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));



// Routes
// =============================================================

// send user to home page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});
// send user to notes page
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "notes.html"));
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
      let idToDelete = req.params
      let data = fs.readFileSync(__dirname+"/db/db.json")
      let noteList = JSON.parse(data);
      console.log('old note list: '+noteList);
      console.log(idToDelete);
      for (let i = 0; i < noteList.length; i++) {
            console.log(noteList[i].id);
            if (noteList[i].id === idToDelete.id){
                  noteList.splice([i],1);
                  console.log('new note list: '+noteList);
            }
      }
      fs.writeFile(__dirname+"/db/db.json", JSON.stringify(noteList), (noteData)=>{
            // console.log('showing data'+noteData);
      })
      res.json(idToDelete);
   });

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
