const { select } = require('../data/config')
const db = require('../data/config')

function find() {
   return db("schemes").select("*")
}


function findById(schemeId) {
    return db("schemes").where("id",schemeId)
}

function findSteps(schemeId) {
    return db("schemes as sc")
            .join("steps as st", "sc.id", "st.scheme_id")
            .where("sc.id",schemeId)
            .select("st.*")

}

function add(info){
    return db("schemes").insert(info)
}
 
function addStep(data, id) {
    const steps = findSteps(id)
    console.log(steps)
    const nextstep = steps.length + 1
     const newdata = {...data, "scheme_id": id, "step_number":  nextstep}
     return db("steps").insert(newdata)

}

module.exports = {
    find, findById, findSteps, add, addStep
}