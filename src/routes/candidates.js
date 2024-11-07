const addCandidate = require('../controllers/candidates/addCandidate');
const editCandidate = require('../controllers/candidates/editCandidate');
const getAll = require('../controllers/candidates/getAll');
const getById = require('../controllers/candidates/getById');
const removeCandidate = require('../controllers/candidates/removeCandidate');
const search = require('../controllers/candidates/search');

const routing = require('express').Router();


// get all candidates list
routing.get('/',getAll);
routing.post('/add',addCandidate)
routing.delete('/remove',removeCandidate)
routing.put('/edit/:id',editCandidate)
routing.get('/:id',getById)
routing.get('/search/:query',search);

module.exports = routing;