const Order = require("../models/Order")
const assignChef = require("../services/chefQueue")
const allocateTable = require("../services/tableAllocator")
const scheduleOrder = require("../services/orderScheduler")

exports.createOrder = async (req, res) => {

    const { persons, orderType, items, customerName, phone, address } = req.body

    let table = null

    if (orderType === "dinein") {
        table = await allocateTable(persons)

        if (!table) {
            return res.json({ message: "No table available" })
        }
    }

    const chef = await assignChef()

    const order = new Order({
        tableId: table ? table._id : null,
        persons,
        items,
        orderType,
        chef: chef._id,
        customerName,
        phone,
        address
    })

    await order.save()

    scheduleOrder(order)

    res.json(order)
}