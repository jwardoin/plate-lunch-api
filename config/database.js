const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        const connect = await mongoose.connect(process.env.DB_STRING)
        console.log(`MongoDB Running: ${connect.connection.host}`)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

module.exports = dbConnection