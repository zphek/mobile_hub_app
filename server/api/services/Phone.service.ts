import models from "../models/index";
import model from "../models/Phones.model";
import model2 from "../models/PhoneImages.model"
import model3 from "../models/Logs.model";
import { DataTypes } from "sequelize";
import mockup from "../data/PhoneMockup"

const Phone = model(models.sequelize, DataTypes);
const PhoneImages = model2(models.sequelize, DataTypes)
const Log = model3(models.sequelize, DataTypes)

interface createParams{
    payload: any;
    brandId: number;
    phoneName: string;
    phoneDescription: string;
    phoneState: number;
}

class PhoneService{
    createPhone(body: createParams, files: any){
        console.log(body)
        return new Promise(async (resolve, reject)=>{
            console.log("-------")
            if(!body.payload.userId || !body.brandId || !body.phoneName || !body.phoneDescription || !body.phoneState){
                reject({ message: "The fields brand, phone name, phone description and phone state not must go empty.", error: true })
                return;
            }

            if(!files || files.length == 0){
                reject({ message: "You must add at least one photo.", error: true })
            }
            const phone = await Phone.findOne({
                where: {
                    userId: body.payload.userId,
                    phoneName: body.phoneName
                }
            })

            if(phone){
                reject({ message: "The name of the proporcionated phone is already registered.", error: true })
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
                .then((response:any)=>{
                    console.log(response)
                    files.forEach((url:any)=>{
                        console.log(url)
                        PhoneImages.create({
                            imageId: null,
                            phoneId: response.phoneId,
                            imageUrl: url.destination.replace('.', '') + "/" + url.filename,
                            createdAt: new Date(),
                            updatedAt: new Date()
                        })
                    })

                    resolve({ message: `The phone ${body.phoneName} was successfully added.`, error: false })
                })
                .catch((err)=>{
                    reject(err)
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    loadPhones(userId: number, socket:any = null) {
        return new Promise(async (resolve, reject) => {
            try {
                const totalPhones = mockup.length;
                let completedPhones = 0;

                const promises = mockup.map(phone => {
                    return Phone.create({
                        userId,
                        brandId: 1,
                        phoneName: phone.phoneName,
                        phoneDescription: phone.phoneDescription.substring(0, 40),
                        phoneState: phone.phoneState,
                        active: true
                    })
                    .then(async (response) => {
                        await Log.create({
                            action: `NEW - The phone '${phone.phoneName} was added.'`,
                            userId,
                            createdAt: new Date(),
                            updatedAt: new Date()
                        })

                        completedPhones++;

                        if(socket){
                            socket.broadcast.emit("loadPhoneResponse", (completedPhones / totalPhones) * 100);   
                        }
                        console.log(`Progress: ${((completedPhones / totalPhones) * 100).toFixed(2)}%`);
                        return response;
                    })
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
            } catch (error) {
                reject(error)
            }
        });
    }

    getPhones(id:number, page: number){
        return new Promise(async (resolve, reject)=>{
            const phoneCount = await Phone.count();
            const LIMIT_PER_PAGE:number = 10;
            const OFFSET = (page - 1) * 10;
            const TOTAL_PAGES:number = Math.floor(phoneCount / LIMIT_PER_PAGE) + 1;

            if(TOTAL_PAGES < page){
                reject({ message: `There's no a ${page} page.`, totalPages: TOTAL_PAGES })
                return;
            }

            Phone.sequelize?.query(`
                SELECT DISTINCT ON ("Phones"."phoneId") "Phones".*, "PhoneImages"."imageId", "PhoneImages"."imageUrl"
                FROM "Phones"
                LEFT JOIN "PhoneImages" ON "Phones"."phoneId" = "PhoneImages"."phoneId"
                WHERE "Phones"."userId" = ${id}
                ORDER BY "Phones"."phoneId", "PhoneImages"."imageId" ASC
                LIMIT ${LIMIT_PER_PAGE} OFFSET ${OFFSET};
              `)
              .then((data:any) => {
                resolve({ data: !data[0] ? [] : data[0], currentPage: page, totalPages: TOTAL_PAGES, error: false });
              })
              .catch((err) => {
                reject({ ...err, error: true });
              });
        })
    }

    getPhone(id:number, userId: number){
        return new Promise((resolve, reject)=>{
            Phone.findOne({
                where: {
                    phoneId: id,
                    userId
                }
            })
            .then((response:any)=>{
                if(response){
                    resolve({ data: response.dataValues, error: false})
                    return;
                }
                reject({ message: "Something wrong has happened.", error: true })
            })
            .catch((err)=>{
                reject({...err, error: true})
            })
        })
    }

    updatePhone(){

    }

    deletePhones(userId: number, socket:any = null) {
        return new Promise(async (resolve, reject) => {
            try {
                const phones = await Phone.findAll({ where: { userId } });
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
                        })
                        completedPhones++;
                        if(socket){
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
            } catch (err) {
                reject({ err, error: true });
            }
        });
    }

    deletePhone(phoneId:number, userId:number){
        return new Promise((resolve, reject)=>{
            Phone.destroy({
                where: {
                    phoneId,
                    userId
                }
            })
            .then(async (response)=>{
                if(response){
                    await Log.create({
                        action: `DELETE - A phone was deleted.'`,
                        userId,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    })

                    resolve({ message: "The phone was deleted successfully!", error: false })
                }

                reject({ message: "Something wrong has happen.", error: true })
            })
            .catch((err)=>{
                reject({ ...err, error: true })
            })
        })
    }
}

export default new PhoneService();