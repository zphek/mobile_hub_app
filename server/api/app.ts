// import connection from "./models/index";
import express from "express";
import path from 'path';
// import upload from "./utilities/multerConfig";

const app = express();

import userRoute from "./routes/User.route";
import phoneRoute from "./routes/Phone.route";
import tokenRoute from "./routes/Token.route";

app.use(express.json());
app.use("/api/user", userRoute)
app.use("/api/phone", phoneRoute)
app.use("/api/token", tokenRoute)

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// connection.sequelize.sync({ force: true })
// .then(()=> {
//     app.listen(3000, ()=>{
//         console.log("Server running in port 3000!")
//     })
// })

app.listen(3000, ()=>{
    console.log("Server running in port 3000!")
})