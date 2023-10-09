const express = require('express');
const router = express.Router();
const { users } = require('../db/users.json');
const Fuse = require('fuse.js');


let fuse = new Fuse(users, {
    keys : ['firstName','lastName']
});

// 5 routes d'une API REST


// - GET `/users`: Retourne la liste de tous les utilisateurs 
router.get('/', (req, res) => {

    let filteredUsers = users;

    if(req.query.search) {
        filteredUsers = fuse.search(req.query.search).map(searchResult => searchResult.item);
    }

    if(req.query.bloodGroup) {
        filteredUsers = filteredUsers.filter(user => {
            return user.bloodGroup === req.query.bloodGroup
        });
    }

    if(req.query.city) {
        filteredUsers = filteredUsers.filter(user => user.address.city.toLowerCase() === req.query.city.toLowerCase())
    }

    res.json(filteredUsers);
});

// - GET `/users/:id`: Retourne un utilisateur spécifique basé sur l'ID.
router.get('/:id', (req, res) => {
    let { id } = req.params;

    if(isNaN(id)) {
        return res.status(400).json({
            message: 'ID must be a number'
        });
    }

    id = Number(id); // je le convertis en nombre après avoir verifié que c'était bien un nombre

   

    let user = users.find(u => u.id === id);

    if(!user) {
        return res.status(404).json({
            message: 'ID not found'
        });
    }

    res.json(user);
});

// - POST `/users`: Préparez cette route pour la création d'un utilisateur (ne l'implémentez pas complètement).
router.post('/', (req, res) => {
    res.json({
        message: "Route not implemented // TODO"
    });
});

// - PUT `/users/:id`: Préparez cette route pour la mise à jour d'un utilisateur (ne l'implémentez pas complètement).
router.put('/:id', (req, res) => {
    res.json({
        message: "Route not implemented // TODO"
    });
});

// - DELETE `/users/:id`: Préparez cette route pour la suppression d'un utilisateur (ne l'implémentez pas complètement).
router.delete('/:id', (req, res) => {
    res.json({
        message: "Route not implemented // TODO"
    });
});

module.exports = router;