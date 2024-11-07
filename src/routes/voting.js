const routing = require('express').Router();


// get all candidates list
routing.get('/',getAll);
routing.post('/add',addCandidate)
routing.delete('/remove',removeCandidate)
routing.post('/:id',getById)
routing.get('/search/:query',search);

module.exports = routing;