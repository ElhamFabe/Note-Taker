// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.


const express = require('express');
const path = require ('path');
const fs = require ('fs');
const notesTaker = require ('../db/db.json')


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function(req, res) {
    console.log("Note success")
    res.json(notesTaker);
  });

  app.get ("/api/notes/:id", function (req, res) {
  //  JSON.parse to read db.json
  let saveNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  res.json(saveNotes);

  })
 
  // API POST Requests
  // ---------------------------------------------------------------------------
  app.post("/api/notes", function(req, res) {
    console.log()
  notesTaker.push(req, body);
    res.json(notesTaker);
  
    // Note the code here. Our "server" will respond to requests and let users know if they have a note or not.

   
  });

  // API DELETE Requests
  app.delete("/api/notes/:id", function (req, res) {
    // converting id to string
    // ============================

    let id = req.params.id.toString();
    console.log(id);

    
  });
};
