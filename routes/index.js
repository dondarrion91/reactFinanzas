// express router
const express = require('express');
const router = express.Router();

// Controllers
const userControllers = require("../controllers/userControllers");

module.exports = () => {

    /**
     * Users
     */

     // new user
    router.post('/user/register',userControllers.newUser);

    // login
    router.post('/user/login',userControllers.login);

    // update user data
    router.put('/user/update',userControllers.userUpdate);

    return router;
}


