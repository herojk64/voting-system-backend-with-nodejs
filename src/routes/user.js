const routing = require('express').Router();
const getAll = require('../controllers/users/getAll');
const addUser = require('../controllers/users/addUser');
const login = require('../controllers/users/login');
const editUser = require('../controllers/users/editUser');
const deleteUser = require('../controllers/users/deleteUser');
const getById = require('../controllers/users/getById');
const search = require('../controllers/users/search');

const authMiddleware = require('../middlewares/authMiddleware');
const authRole = require('../middlewares/authRole');
const authOwner = require('../middlewares/authOwner');


// get all candidates list
routing.get('/',[authMiddleware,authRole('admin')],getAll);
routing.post('/add',addUser)
routing.post('/login',login)
routing.delete('/remove',[authMiddleware,authRole('admin')],deleteUser)
routing.put('/edit/:id',[authMiddleware,authOwner],editUser)
routing.post('/:id',[authMiddleware,authOwner],getById)
routing.get('/search/:query',[authMiddleware,authRole('admin')],search);

module.exports = routing;