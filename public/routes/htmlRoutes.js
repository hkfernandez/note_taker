module.exports = function (app, path){

    // nav to homepage
    app.get("/", function(req, res) {
      res.sendFile(path.join(__dirname, "../assets/html/index.html"));
    });
    
    // nav to notes page
    app.get("/notes", function(req, res) {
      res.sendFile(path.join(__dirname, "../assets/html/notes.html"));
    });
}