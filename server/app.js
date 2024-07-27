// const connection = require("./api/models");
const express = require("express");
const app = express();

const userRoute = require("./api/routes/User.route")
const phoneRoute = require("./api/routes/Phone.route")
const tokenRoute = require("./api/routes/Token.route")

app.use(express.json());
app.use("/api/user", userRoute)
app.use("/api/phone", phoneRoute)
app.use("/api/token", tokenRoute)

app.listen(3000, ()=>{
    console.log("Server running in port 3000!")
})

// connection.sequelize.sync()
// .then(()=> {
//     app.listen(3000, ()=>{
//         console.log("Server running in port 3000!")
//     })
// })