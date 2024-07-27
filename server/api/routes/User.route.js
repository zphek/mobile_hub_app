const router = require("express").Router();
const { userLogin, userRegister } = require("../controllers/User.controller")

const SECRET = "bernardo1234"

router
    .post("/login", userLogin)
    .post("/register", userRegister)

module.exports = router;