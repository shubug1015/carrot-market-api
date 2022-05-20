// @ts-check
/* eslint-disable */

const jwt = require('jsonwebtoken')

const { SERVER_SECRET } = process.env

// token-create
async function signJWT(value) {
    return new Promise((resolve, reject) => {
        jwt.sign(value, SERVER_SECRET, (err, encoded) => {
            if(err) {
                reject(err)
            }
            else {
                resolve(encoded)
            }
        })
    })
}

// token-verify
async function verifyJWT(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, SERVER_SECRET, (err, decoded) => {
            if(err) {
                reject(err)
            }
            else {
                resolve(decoded)
            }
        })
    })
}

module.exports = {
    signJWT,
    verifyJWT,
}