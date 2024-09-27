import { searchList } from "./data.js";

export const getSearchResults = (keyword) => {
    console.log('kkk----',keyword)
    const result = searchList.filter(i => i.substring(0,keyword.length).toLowerCase() === keyword.toLowerCase())
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(result)
        },1000)
    })
}