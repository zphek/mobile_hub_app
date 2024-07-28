"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import connection from "./models/index";
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
// import upload from "./utilities/multerConfig";
const app = (0, express_1.default)();
const User_route_1 = __importDefault(require("./routes/User.route"));
const Phone_route_1 = __importDefault(require("./routes/Phone.route"));
const Token_route_1 = __importDefault(require("./routes/Token.route"));
app.use(express_1.default.json());
app.use("/api/user", User_route_1.default);
app.use("/api/phone", Phone_route_1.default);
app.use("/api/token", Token_route_1.default);
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
// connection.sequelize.sync({ force: true })
// .then(()=> {
//     app.listen(3000, ()=>{
//         console.log("Server running in port 3000!")
//     })
// })
app.listen(3000, () => {
    console.log("Server running in port 3000!");
});
