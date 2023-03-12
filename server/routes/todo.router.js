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
            console.log('in pool.query', result.rows);
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

//PUT to complete
router.put('/comeplete/:id', (req, res) => { 
    const taskId = req.params.id;
    console.log('id of task to complete', taskId)
    let queryText =`UPDATE "tasks" SET "complete" = 'TRUE' WHERE "id" =$1`;

    pool.query(queryText, [taskId])
        .then((results) => {
            console.log('in route put');
            res.sendStatus(200);
        }).catch((error) => {
            console.log('error in route put', queryText, error);
            res.sendStatus(500);
        })
})
//PUT to uncomplete
// router.put('/uncomeplete/:id', (req, res) => { 
//     const taskId = req.params.id;
//     console.log('id of task to complete', taskId)
//     let queryText =`UPDATE "tasks" SET "complete" = 'FALSE' WHERE "id" =$1`;

//     pool.query(queryText, [taskId])
//         .then((results) => {
//             console.log('in route put');
//             res.sendStatus(200);
//         }).catch((error) => {
//             console.log('error in route put', queryText, error);
//             res.sendStatus(500);
//         })
// })

//DELETE
router.delete('/delete/:id', (req, res) => {
    let reqId = req.params.id;
    console.log('Delete request for id', reqId);
    let sqlText = 'DELETE FROM "tasks" WHERE id=$1;';
    pool.query(sqlText, [reqId])
        .then((result) => {
            console.log('task deleted');
        } )
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500); //server response
        })
})

module.exports = router;