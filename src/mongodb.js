// @ts-check
/* eslint-disable */

const { MongoClient } = require('mongodb');
const url = "mongodb://kjyong702:!k1203702@cluster0-shard-00-00.mtnis.mongodb.net:27017,cluster0-shard-00-01.mtnis.mongodb.net:27017,cluster0-shard-00-02.mtnis.mongodb.net:27017/?ssl=true&replicaSet=atlas-rjcxb0-shard-0&authSource=admin&retryWrites=true&w=majority"

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const DB = "cotato"

let check_connect = false

async function getUsersCollection() {
    if(!check_connect) {
        await client.connect()
        check_connect = true
    }
    return client.db(DB).collection('users')
}

module.exports = {
    getUsersCollection,
}