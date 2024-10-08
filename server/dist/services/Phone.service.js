"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../models/index"));
const Phones_model_1 = __importDefault(require("../models/Phones.model"));
const PhoneImages_model_1 = __importDefault(require("../models/PhoneImages.model"));
const Logs_model_1 = __importDefault(require("../models/Logs.model"));
const sequelize_1 = require("sequelize");
const PhoneMockup_1 = __importDefault(require("../data/PhoneMockup"));
const Phone = (0, Phones_model_1.default)(index_1.default.sequelize, sequelize_1.DataTypes);
const PhoneImages = (0, PhoneImages_model_1.default)(index_1.default.sequelize, sequelize_1.DataTypes);
const Log = (0, Logs_model_1.default)(index_1.default.sequelize, sequelize_1.DataTypes);
class PhoneService {
    createPhone(body, files) {
        console.log(body);
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            console.log("-------");
            if (!body.payload.userId || !body.brandId || !body.phoneName || !body.phoneDescription || !body.phoneState) {
                reject({ message: "The fields brand, phone name, phone description and phone state not must go empty.", error: true });
                return;
            }
            if (!files || files.length == 0) {
                reject({ message: "You must add at least one photo.", error: true });
            }
            const phone = yield Phone.findOne({
                where: {
                    userId: body.payload.userId,
                    phoneName: body.phoneName
                }
            });
            if (phone) {
                reject({ message: "The name of the proporcionated phone is already registered.", error: true });
                return;
            }
            try {
                Phone.create({
                    userId: body.payload.userId,
                    brandId: body.brandId,
                    phoneName: body.phoneName,
                    phoneDescription: body.phoneDescription,
                    phoneState: body.phoneState,
                    active: true
                })
                    .then((response) => {
                    console.log(response);
                    files.forEach((url) => {
                        console.log(url);
                        PhoneImages.create({
                            imageId: null,
                            phoneId: response.phoneId,
                            imageUrl: url.destination.replace('.', '') + "/" + url.filename,
                            createdAt: new Date(),
                            updatedAt: new Date()
                        });
                    });
                    resolve({ message: `The phone ${body.phoneName} was successfully added.`, error: false });
                })
                    .catch((err) => {
                    reject(err);
                });
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    loadPhones(userId, socket = null) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const totalPhones = PhoneMockup_1.default.length;
                let completedPhones = 0;
                const promises = PhoneMockup_1.default.map(phone => {
                    return Phone.create({
                        userId,
                        brandId: 1,
                        phoneName: phone.phoneName,
                        phoneDescription: phone.phoneDescription.substring(0, 40),
                        phoneState: phone.phoneState,
                        active: true
                    })
                        .then((response) => __awaiter(this, void 0, void 0, function* () {
                        yield Log.create({
                            action: `NEW - The phone '${phone.phoneName} was added.'`,
                            userId,
                            createdAt: new Date(),
                            updatedAt: new Date()
                        });
                        completedPhones++;
                        if (socket) {
                            socket.broadcast.emit("loadPhoneResponse", (completedPhones / totalPhones) * 100);
                        }
                        console.log(`Progress: ${((completedPhones / totalPhones) * 100).toFixed(2)}%`);
                        return response;
                    }))
                        .catch(err => {
                        console.log(err);
                    });
                });
                Promise.all(promises)
                    .then(responses => {
                    resolve({ responses, error: false });
                })
                    .catch(err => {
                    reject({ err, error: true });
                });
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    getPhones(id, page) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const phoneCount = yield Phone.count();
            const LIMIT_PER_PAGE = 10;
            const OFFSET = (page - 1) * 10;
            const TOTAL_PAGES = Math.floor(phoneCount / LIMIT_PER_PAGE) + 1;
            if (TOTAL_PAGES < page) {
                reject({ message: `There's no a ${page} page.`, totalPages: TOTAL_PAGES });
                return;
            }
            (_a = Phone.sequelize) === null || _a === void 0 ? void 0 : _a.query(`
                SELECT DISTINCT ON ("Phones"."phoneId") "Phones".*, "PhoneImages"."imageId", "PhoneImages"."imageUrl"
                FROM "Phones"
                LEFT JOIN "PhoneImages" ON "Phones"."phoneId" = "PhoneImages"."phoneId"
                WHERE "Phones"."userId" = ${id}
                ORDER BY "Phones"."phoneId", "PhoneImages"."imageId" ASC
                LIMIT ${LIMIT_PER_PAGE} OFFSET ${OFFSET};
              `).then((data) => {
                resolve({ data: !data[0] ? [] : data[0], currentPage: page, totalPages: TOTAL_PAGES, error: false });
            }).catch((err) => {
                reject(Object.assign(Object.assign({}, err), { error: true }));
            });
        }));
    }
    getPhone(id, userId) {
        return new Promise((resolve, reject) => {
            Phone.findOne({
                where: {
                    phoneId: id,
                    userId
                }
            })
                .then((response) => {
                if (response) {
                    resolve({ data: response.dataValues, error: false });
                    return;
                }
                reject({ message: "Something wrong has happened.", error: true });
            })
                .catch((err) => {
                reject(Object.assign(Object.assign({}, err), { error: true }));
            });
        });
    }
    updatePhone() {
    }
    deletePhones(userId, socket = null) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const phones = yield Phone.findAll({ where: { userId } });
                const totalPhones = phones.length;
                let completedPhones = 0;
                const promises = phones.map(phone => {
                    return Phone.destroy({
                        where: {
                            phoneId: phone.phoneId,
                            userId: phone.userId
                        }
                    })
                        .then(() => {
                        Log.create({
                            action: `DELETE - The phone '${phone.phoneName} was deleted.'`,
                            userId,
                            createdAt: new Date(),
                            updatedAt: new Date()
                        });
                        completedPhones++;
                        if (socket) {
                            socket.broadcast.emit("deletePhoneResponse", (completedPhones / totalPhones) * 100);
                        }
                        console.log(`Progress: ${((completedPhones / totalPhones) * 100).toFixed(2)}%`);
                    })
                        .catch(err => {
                        throw err;
                    });
                });
                Promise.all(promises)
                    .then(() => {
                    resolve({ message: `${completedPhones} phones were successfully deleted.`, error: false });
                })
                    .catch(err => {
                    reject({ err, error: true });
                });
            }
            catch (err) {
                reject({ err, error: true });
            }
        }));
    }
    deletePhone(phoneId, userId) {
        return new Promise((resolve, reject) => {
            Phone.destroy({
                where: {
                    phoneId,
                    userId
                }
            })
                .then((response) => __awaiter(this, void 0, void 0, function* () {
                if (response) {
                    yield Log.create({
                        action: `DELETE - A phone was deleted.'`,
                        userId,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    });
                    resolve({ message: "The phone was deleted successfully!", error: false });
                }
                reject({ message: "Something wrong has happen.", error: true });
            }))
                .catch((err) => {
                reject(Object.assign(Object.assign({}, err), { error: true }));
            });
        });
    }
}
exports.default = new PhoneService();
