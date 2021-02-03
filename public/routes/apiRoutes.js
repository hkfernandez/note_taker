module.exports = function  (app, path, fs) {
      
      // returns list of notes to frontend
      app.get("/api/notes", function(req, res) {
            res.sendFile(path.join(__dirname, "../../db/db.json"));
      });

      // posts new note to json db and returns note to homepage
      app.post("/api/notes", function(req, res) {
            var newNote = req.body;
            newNote.id = new Date();
            let data = fs.readFileSync(path.join(__dirname, "../../db/db.json"))
            let noteList = JSON.parse(data);
            noteList.push(newNote);
            fs.writeFile(path.join(__dirname, "../../db/db.json"), JSON.stringify(noteList), (noteData)=>{
                  console.log('showing data'+noteData);
            })
            res.json(newNote);
      });

      // removes deleted note from db and returns note to frontend
      app.delete("/api/notes/:id", function(req, res) {
            let idToDelete = req.params
            let data = fs.readFileSync(path.join(__dirname, "../../db/db.json"))
            let noteList = JSON.parse(data);
            for (let i = 0; i < noteList.length; i++) {
                  if (noteList[i].id === idToDelete.id){
                        noteList.splice([i],1);
                  }
            }
            fs.writeFile(path.join(__dirname, "../../db/db.json"), JSON.stringify(noteList), (noteData)=>{
                  // console.log('showing data'+noteData);
            })
            res.json(idToDelete);
      });

}