const express = require('express')
const cors = require('cors')
const app = express()

const PORT = process.env.PORT || 8000

// developing a schema here
let plateLunchSpots = {
    "champagnes grocery": {
        "restaurantName": "Champagne's Grocery and Deli",
        "address": {
            "streetName": "716 Souvenir Gate",
            "city": "Lafayette",
            "state": "LA",
            "zipcode": "70506"
        },
        "phoneNumber": "(337) 235-6733",
        "website": null,
        "staticDailyMenu": true,
        "menu": {
            "monday": {
                "entrees": [],
                "sides": []
            },
            "tuesday": {
                "entrees": [],
                "sides": []
            },
            "wednesday": {
                "entrees": [],
                "sides": []
            },
            "thursday": {
                "entrees": [],
                "sides": []
            },
            "friday": {
                "entrees": ["Beef Roast", "Shrimp Stew"],
                "sides": ["Corn", "Potato Salad", "???"]
            }
        }
    }
}

app.use(cors())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/api/plateLunchSpots/:restaurantName', (req, res) => {
    const spotName = req.params.restaurantName.toLowerCase()
    console.log(spotName)
    res.json(plateLunchSpots[spotName])

}) 

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})