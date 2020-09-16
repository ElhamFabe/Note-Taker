// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.


const express = require('express');
const path = require('path');
const fs = require('fs');
const notesTaker = require('../db/db.json')


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function (req, res) {
    console.log("Note success")
    res.json(notesTaker);
  });



  // API POST Requests
  // ---------------------------------------------------------------------------
  app.post("/api/notes", function (req, res) {
    console.log(req.body)
    const newNote = req.body
    const lastIndex = notesTaker.length - 1
    if (lastIndex < 0) {
      newNote.id = 1
    } else {
      const lastId = notesTaker[lastIndex].id
      newNote.id = lastId + 1
    }
    notesTaker.push(newNote);
    fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notesTaker), function (err) {
      if (err) {
        console.log(err)
      }

      console.log('write file')
      fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function (err, data) {
        if (err) {
          console.log(err)
        }
        console.log("read data")
        console.log(data)
        res.json(data);
      })
    })

    // Note the code here. Our "server" will respond to requests and let users know if they have a note or not.


  });

  // API DELETE Requests
  app.delete("/api/notes/:id", function (req, res) {
    // converting id to string
    // ============================

    const id = parseInt(req.params.id)
    console.log(id);
    const findIndex = notesTaker.findIndex(el => el.id === id)

    notesTaker.splice(findIndex, 1)

    fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notesTaker), function (err) {
      if (err) {
        console.log(err)
      }

      console.log('write file')
      fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function (err, data) {
        if (err) {
          console.log(err)
        }
        console.log("read data")
        console.log(data)
        res.json(data);
      })
    });
  });
}
