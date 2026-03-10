const MenuItem = require("../models/MenuItem")

exports.createItem = async (req, res) => {

    const item = new MenuItem(req.body)

    await item.save()

    res.json(item)
}

exports.getItems = async (req, res) => {

    const items = await MenuItem.find()

    res.json(items)
}