import axios from "axios"

const BASE_URL  = 'http://localhost:3000/api/'
export default async function sendRequest(endpoint: string, method: string, body: any = null, token: string = "", contentType: string = "application/json"){
    return await axios({
        method,
        baseURL: BASE_URL,
        url: endpoint,
        data: body,
        headers: {
            Accept: 'application/json',
            "Content-Type": contentType,
            Authorization: "Bearer " + token
        }
    })
}