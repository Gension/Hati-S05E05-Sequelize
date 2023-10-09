require('dotenv').config();
const User = require('../models/user'); 

const asyncFunction = async () => {
    let users = await User.findAll();

    for(let user of users) {
        console.log(user.first_name);
    }

    let user = await User.findByPk(8);

    console.log(user.first_name, user.last_name);

    user.last_name = "Bob";
    await user.save();
}

asyncFunction();