const connection = require("./api/models");
const express = require("express");
const app = express();


app.use(express.json());

app.get("/", (req, res)=>{
    return res.json("BUenas tarde")
})


connection.sync({ force: true })
.then(()=> {
    app.listen(3000, ()=>{
        console.log("Server running in port 3000!")
    })
})