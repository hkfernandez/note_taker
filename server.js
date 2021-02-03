var express = require("express");
var path = require("path");
var fs = require('fs');

var app = express();
var PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// ROUTES
// nav to homepage
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});
// nav to notes page
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "notes.html"));
});
// returns list of notes to frontend
app.get("/api/notes", function(req, res) {
      res.sendFile(path.join(__dirname, "/db/db.json"));
});
// posts new note to json db and returns note to homepage
app.post("/api/notes", function(req, res) {
      var newNote = req.body;
      newNote.id = new Date();
      let data = fs.readFileSync(__dirname+"/db/db.json")
      let noteList = JSON.parse(data);
      noteList.push(newNote);
      fs.writeFile(__dirname+"/db/db.json", JSON.stringify(noteList), (noteData)=>{
            console.log('showing data'+noteData);
      })
      res.json(newNote);
   });
// removes deleted note from db and returns note to frontend
app.delete("/api/notes/:id", function(req, res) {
      let idToDelete = req.params
      let data = fs.readFileSync(__dirname+"/db/db.json")
      let noteList = JSON.parse(data);
      for (let i = 0; i < noteList.length; i++) {
            if (noteList[i].id === idToDelete.id){
                  noteList.splice([i],1);
            }
      }
      fs.writeFile(__dirname+"/db/db.json", JSON.stringify(noteList), (noteData)=>{
            // console.log('showing data'+noteData);
      })
      res.json(idToDelete);
   });

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
