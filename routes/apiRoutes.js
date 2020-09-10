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
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function(req, res) {
    console.log("Note success")
    res.json(notesTaker);
  });

  app.get ("/api/notes/:id", function (req, res) {
  //  JSON.parse to read db.json
  let saveNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  res.json(tableData);

  })
 
  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------
  app.post("/api/notes", function(req, res) {
    console.log()
    let newNoteTaker = req.body;
    newNoteTaker.id
    res.json(notesTaker);
  
    // Note the code here. Our "server" will respond to requests and let users know if they have a note or not.

   
  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post("/api/clear", function(req, res) {
    // Empty out the arrays of data
    tableData.length = 0;
    waitListData.length = 0;

    res.json({ ok: true });
  });


  app.delete("/api/notes/:id", function (req, res) {
    // converting id to string
    // ============================

    let id = req.params.id.toString();
    console.log(id);

    
  }
};
