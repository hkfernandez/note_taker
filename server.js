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
      // var chosen = req.params.character;
      // console.log(__dirname+"/db/db.json");
      res.sendFile(path.join(__dirname, "/db/db.json"));
      // fs.writeFile(__dirname, "/db/db.json", function() {
            
      // })


      // fs.readFile(__dirname+"/db/db.json", JSON.stringify(data), (err) => {
      //       if (err) {
      //             throw err;
      //       }
      //       console.log('file sent');
      // })
      // return res.json();


//   for (var i = 0; i < characters.length; i++) {
//     if (chosen === characters[i].routeName) {
//       return res.json(characters[i]);
//     }
//   }

//   return res.json(false);
});

// posts new note to json db
app.post("/api/notes", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
      var newNote = req.body;
      console.log(newNote);

  // Using a RegEx Pattern to remove spaces from newCharacter
//   newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();

//   console.log(newCharacter);

//   characters.push(newCharacter);

//   res.json(newCharacter);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
