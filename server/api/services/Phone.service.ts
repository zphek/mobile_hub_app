import models from "../models/index";
import model from "../models/Phones.model";
import model2 from "../models/PhoneImages.model"
import { DataTypes } from "sequelize";
import { response } from "express";

const Phone = model(models.sequelize, DataTypes);
const PhoneImages = model2(models.sequelize, DataTypes)

interface createParams{
    payload: any;
    brandId: number;
    phoneName: string;
    phoneDescription: string;
    phoneState: number;
}

class PhoneService{
    createPhone(body: createParams, files: any){
        return new Promise(async (resolve, reject)=>{
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
                    phoneState: body.phoneState
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

    loadPhones(){

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
                INNER JOIN "PhoneImages" ON "Phones"."phoneId" = "PhoneImages"."phoneId"
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
            .then((response)=>{
                if(response){
                    resolve({...response, error: false})
                    return;
                }
                reject({ message: "Something wrong has happen.", error: true })
            })
            .catch((err)=>{
                reject({...err, error: true})
            })
        })
    }

    updatePhone(){

    }

    deletePhones(){
        return new Promise((resolve, reject)=>{

        })
    }

    deletePhone(phoneId:number, userId:number){
        return new Promise((resolve, reject)=>{
            Phone.destroy({
                where: {
                    phoneId,
                    userId
                }
            })
            .then((response)=>{
                if(response){
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