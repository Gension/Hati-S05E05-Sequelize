const express = require('express')
const User = require('../models/user');
const router = express.Router();


// 5 routes d'une API REST


// - GET `/users`: Retourne la liste de tous les utilisateurs 
router.get('/', async (req, res) => {
    
    res.json(await User.findAll());
});

// - GET `/users/:id`: Retourne un utilisateur spécifique basé sur l'ID.
router.get('/:id', async (req, res) => {

    const { id } = req.params;

    if(isNaN(id)) {
        return res.status(400).json('ID MUST BE A NUMBER');
    }

    const user = await User.findByPk(id);

    res.json(user);
});

// - POST `/users`: Préparez cette route pour la création d'un utilisateur (ne l'implémentez pas complètement).
router.post('/', async (req, res) => {
    const body = req.body;

    console.log(body);

    // Faire les verfications d'integrité des donnée

    const createdUser = await User.create(body);
    res.json({ 
        message: 'created',
        item: createdUser
    });
});

// - PUT `/users/:id`: Préparez cette route pour la mise à jour d'un utilisateur (ne l'implémentez pas complètement).
router.put('/:id', async (req, res) => {

    const { id } = req.params;
    const body = req.body;

    if(isNaN(id)) {
        return res.status(400).json('ID MUST BE A NUMBER');
    }

    const user = await User.findByPk(id);

    if(!user) {
        return res.status(404).json('NOT FOUND');
    }
   
    for(let key of Object.keys(body)) {
        user[key] = body[key];
    }


    await user.save();
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

    await User.destroy({
        where: {
            id: id
        }
    });

    res.json({
        message: "deleted"
    });
});

module.exports = router;