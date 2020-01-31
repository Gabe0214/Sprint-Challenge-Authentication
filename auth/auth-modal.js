const db = require('../database/dbConfig')

module.exports = {
    findById,
    insert,
    findByUsername
}


function insert(user){
    return db('users').insert(user)
    .then(([id]) => findById(id).first())
}

function findById(id){
    return db('users').where({id})
}

function findByUsername(username){
    return db('users').where({username}).first()
}


