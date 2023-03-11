const express = require('express');
const router = express.Router();
const pg = require("pg"); //import pg into our routes

//PG Pool
const pool = new pg.Pool({
    database: "weekend-to-do-app",
    host: "localhost",
    port: 5432
});

//GET
router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "tasks"`
    console.log('in router get function', queryText);

    pool.query(queryText)
        .then((result) => {
            console.log('in poo.query', result.rows);
            res.send(result.rows);
        })
        .catch((error) =>{
            res.sendStatus(500)
            console.log('error in router.get');
        })
});

//POST
router.post('/', (req, res) =>{
    const newTask = req.body;
    console.log('adding a new tasks', newTask)
    let queryText = `INSERT INTO "tasks" ("task", "complete")
    VALUES($1, $2)`;

    pool.query(queryText, [newTask.task, newTask.complete])
        .then((results) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('error in router.post', queryText, error)
            res.sendStatus(500);
        })
})

module.exports = router;