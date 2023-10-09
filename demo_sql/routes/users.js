const express = require('express');
const getDb = require('../db/db');
const router = express.Router();


// 5 routes d'une API REST


// - GET `/users`: Retourne la liste de tous les utilisateurs 
router.get('/', async (req, res) => {
    const conn = await getDb();
    const rows = await conn.query("SELECT * FROM users");

    res.json(rows);
});

// - GET `/users/:id`: Retourne un utilisateur spécifique basé sur l'ID.
router.get('/:id', async (req, res) => {

    const { id } = req.params;

    if(isNaN(id)) {
        return res.status(400).json('ID MUST BE A NUMBER');
    }

    const conn = await getDb();
    // const rows = await conn.query("SELECT * FROM users WHERE id = " + Number(req.params.id));
    const rows = await conn.query("SELECT * FROM users WHERE id = ?", [Number(req.params.id)]);

    res.json(rows);
});

// - POST `/users`: Préparez cette route pour la création d'un utilisateur (ne l'implémentez pas complètement).
router.post('/', async (req, res) => {
    const body = req.body;

    console.log(body);

    // Faire les verfications d'integrité des données

    const conn = await getDb();
    // INSERT INTO users(first_name, last_name, email) VALUES ("John", "Doe", "john.doe@oclock.io");
    const result = await conn.query("INSERT INTO users(first_name, last_name, email) VALUES (?, ?, ?)",[body.first_name, body.last_name, body.email]);

    console.log(result);
    res.json({ 
        message: 'created',
        item: {
            id: Number(result.insertId),
            ...body
        }
    });
});

// - PUT `/users/:id`: Préparez cette route pour la mise à jour d'un utilisateur (ne l'implémentez pas complètement).
router.put('/:id', async (req, res) => {

    const { id } = req.params;

    if(isNaN(id)) {
        return res.status(400).json('ID MUST BE A NUMBER');
    }

    const body = req.body
    // UPDATE users SET email = "j.doe@oclock.io" WHERE first_Name = 'John';
    let query = `UPDATE users SET `;

    // récupérer les clefs et valeurs depuis mon objet bod

    let parts = [];
    for(let key of Object.keys(body)) {
        console.log(key, body[key]);
        parts.push(`${key} = '${body[key]}'`);
    }

    query += parts.join(', ');
    query += "WHERE id = " + Number(req.params.id);
    console.log(query);


    // Je récupère chaque clef de mon objet body sous l

    const conn = await getDb();
    const result = await conn.query(query);
    console.log(result);

    res.json({
        message: "ok"
    });
});

// - DELETE `/users/:id`: Préparez cette route pour la suppression d'un utilisateur (ne l'implémentez pas complètement).
router.delete('/:id', async (req, res) => {

    const { id } = req.params;

    if(isNaN(id)) {
        return res.status(400).json('ID MUST BE A NUMBER');
    }

    const conn = await getDb();
    const result = await conn.query("DELETE FROM users WHERE id = ?", [Number(req.params.id)]);

    res.json({
        message: "deleted"
    });
});

module.exports = router;