// Import all env vars from .env file
require('dotenv').config()

export const VUE_APP_APIKEY = process.env.VUE_APP_APIKEY
export const VUE_APP_AUTHDOMAIN = process.env.VUE_APP_AUTHDOMAIN
export const VUE_APP_DATABASEURL = process.env.VUE_APP_DATABASEURL
export const VUE_APP_PROJECTID = process.env.VUE_APP_PROJECTID
export const VUE_APP_STORAGEBUCKET = process.env.VUE_APP_STORAGEBUCKET
export const VUE_APP_MESSAGINGSENDERID = process.env.VUE_APP_MESSAGINGSENDERID
export const VUE_APP_APPID = process.env.VUE_APP_APPID
export const VUE_APP_MEASUREMENTID = process.env.VUE_APP_MEASUREMENTID
