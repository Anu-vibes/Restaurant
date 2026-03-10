const Chef = require("../models/Chef")

async function assignChef() {

    const chef = await Chef.findOne().sort({ ordersTaken: 1 })

    chef.ordersTaken += 1
    await chef.save()

    return chef
}

module.exports = assignChef