const mongoose = require('mongoose')

const PLSSchema = new mongoose.Schema({
    restaurantName: {
        type: String,
        required: true
    },
    address: {
        streetName: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },             
        state: {
            type: String,
            required: true
        },
        zipcode: {
            type: String,
            required: true
        }
    },
    hoursOfOperation: {
        sunday: {
            type: String,
            required: true
        },
        monday: {
            type: String,
            required: true
        },
        tuesday: {
            type: String,
            required: true
        },
        wednesday: {
            type: String,
            required: true
        },
        thursday: {
            type: String,
            required: true
        },
        friday: {
            type: String,
            required: true
        },
        saturday: {
            type: String,
            required: true
        },
       
    },
    phoneNumber: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    staticDailyMenu: {
        sunday: [{ String }],
        monday: [{ String }],
        tuesday: [{ String }],
        wednesday: [{ String }],
        thursday: [{ String }],
        friday: [{ String }],
        saturday: [{ String }],
    },
    regularMenu: [{ String }]
    
})

module.exports = mongoose.model('PLS', PLSSchema)