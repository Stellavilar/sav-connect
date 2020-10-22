const express = require('express');

const router = express.Router();

// page d'accueil
router.get('/', (req, res) => {
    res.send('Hello world !');
});

/**User routes */
const userController = require('../controllers/userController');
router.get('/users', userController.findAll);
router.get('/user/profil', userController.getProfil);
router.get('/user/:id', userController.findOne);
router.get('/archive/user/:id', userController.archive);
router.post('/user/add', userController.add);
router.patch('/user/edit/:id', userController.edit);
router.patch('/user/profil', userController.editProfil);

/**Login/Logout */
const loginController = require ('../controllers/loginController');
router.post('/login', loginController.login);
router.get('/logout', loginController.logout);


module.exports = router;