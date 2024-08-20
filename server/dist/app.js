"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_route_1 = __importDefault(require("./routes/User.route"));
const Phone_route_1 = __importDefault(require("./routes/Phone.route"));
const Token_route_1 = __importDefault(require("./routes/Token.route"));
// import connection from "./models/index";
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const swagger_1 = require("./swagger");
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const jwtencoder_1 = require("./utilities/jwtencoder");
const tokenHandler_1 = require("./utilities/tokenHandler");
const Phone_service_1 = __importDefault(require("./services/Phone.service"));
const cors_1 = __importDefault(require("cors"));
// import upload from "./utilities/multerConfig";
const app = (0, express_1.default)();
const server = http_1.default.createServer(app); // Crea un servidor HTTP
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*", // Permitir solicitudes de cualquier origen. Cambia esto según sea necesario.
        methods: ["GET", "POST"],
        allowedHeaders: ["Authorization"],
        credentials: true
    }
}); // Inicializa Socket.IO con el servidor HTTP y configura CORS
app.use((0, cors_1.default)({
    origin: "*" // Permitir solicitudes de cualquier origen. Cambia esto según sea necesario.
}));
app.use(express_1.default.json());
app.use("/api/user", User_route_1.default);
app.use("/api/phone", Phone_route_1.default);
app.use("/api/token", Token_route_1.default);
app.use('/api-docs', swagger_1.swaggerUi.serve, swagger_1.swaggerUi.setup(swagger_1.swaggerSpec));
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
io.use((socket, next) => {
    var _a, _b, _c;
    try {
        const authHeader = (_a = socket.handshake.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ');
        if (authHeader[0] !== 'Bearer') {
            return next(new Error('You don\'t have the required access.'));
        }
        const payload = ((_b = (0, jwtencoder_1.JWTdecoder)(authHeader[1])) === null || _b === void 0 ? void 0 : _b.payload) || ((_c = (0, tokenHandler_1.tokenDecoder)(authHeader[1])) === null || _c === void 0 ? void 0 : _c.payload);
        socket.payload = payload;
        next();
    }
    catch (error) {
        next(new Error('Authentication error.'));
    }
});
// Conexión a Socket.IO
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('loadPhones', (loading) => {
        console.log(loading);
        if (loading) {
            const userId = socket.payload.userId;
            Phone_service_1.default.loadPhones(userId, socket)
                .then((response) => {
                console.log(response);
                // Emitir solo al socket que hizo la solicitud
                // socket.broadcast.emit('loadPhoneResponse', response);
            })
                .catch((err) => {
                console.log(err);
                // Emitir el error al socket que hizo la solicitud
                // socket.emit('loadPhoneResponse', { error: err.message });
            });
        }
    });
    socket.on('deletePhones', (loading) => {
        console.log(loading);
        if (loading) {
            const userId = socket.payload.userId;
            Phone_service_1.default.deletePhones(userId, socket)
                .then((response) => {
                console.log(response);
            })
                .catch((err) => {
                console.log(err);
            });
        }
    });
    // Manejar desconexión
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
// connection.sequelize.sync({ force: true })
// .then(()=> {
//     server.listen(3000, ()=>{
//         console.log("Server running on port 3000!")
//     })
// });
server.listen(3000, () => {
    console.log("Server running on port 3000!");
});
