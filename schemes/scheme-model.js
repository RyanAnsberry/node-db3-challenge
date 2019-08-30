const db = require('../data/db-config.js');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
};

function find() {
    return db('schemes');
}
  
function findById(id) {
    return db('schemes').where({ id }).first();
}

function findSteps(scheme_id) {
    return db('schemes as sc')
    .join('steps as st', 'st.scheme_id', '=', 'sc.id')
    .select('st.id', 'st.step_number', 'st.instructions','sc.id')
    .orderBy('st.step_number')
    .where({ scheme_id })
}

function add(scheme) {
    return db('schemes').insert(scheme)
    .then(ids => {
        return findById(ids[0]);
    });
}

function update(changes, id) {
    return db('schemes')
    .where({ id })
    .update(changes)
    .then(count => {
        if (count > 0) {
            return findById(id)
            .then(scheme => {
                return scheme;
            });
          } else {
            return null;
          }
    }) 
}

function remove(id) {
 return findById(id)
    .then(scheme => {
      return db('schemes').where({ id }).del()
        .then(count => {
          if (count > 0) {
            return scheme;
          } else {
            return null;
          }
        })
    })
}
  
