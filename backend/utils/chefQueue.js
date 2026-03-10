const Chef = require("../models/Chef")

let chefs = []
let pointer = 0

async function loadChefs(){

chefs = await Chef.find()

}

async function getNextChef(){

if(chefs.length === 0) await loadChefs()

const chef = chefs[pointer]

pointer = (pointer + 1) % chefs.length

return chef

}

module.exports = {getNextChef,loadChefs}