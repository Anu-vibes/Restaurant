const express = require("express")
const cors = require("cors")
const http = require("http")
const { Server } = require("socket.io")

const connectDB = require("./config/db")

const orderRoutes = require("./routes/orderRoutes")
const tableRoutes = require("./routes/tableRoutes")
const menuRoutes = require("./routes/menuRoutes")
const analyticsRoutes = require("./routes/analyticsRoutes")
const chefRoutes = require("./routes/chefRoutes")
const app = express()

connectDB()

app.use(cors())
app.use(express.json())

app.use("/orders", orderRoutes)
app.use("/tables", tableRoutes)
app.use("/menu", menuRoutes)
app.use("/analytics", analyticsRoutes)
app.use("/chefs", chefRoutes)
const server = http.createServer(app)

const io = new Server(server, {
    cors: { origin: "*" }
})

io.on("connection", (socket) => {
    console.log("Client connected to kitchen board")
})

app.set("io", io)

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
 console.log("Server running on", PORT)
})