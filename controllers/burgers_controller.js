// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the todos
  app.get("/", function(req, res) {
      res.render("index");
  });

  // POST route for saving a new todo. We can create a todo using the data on req.body
  app.post("/api/burgers", function(req, res) {
    

      res.end();
    
  });

};

