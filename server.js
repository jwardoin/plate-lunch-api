const express = require('express')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
const ejs = require('ejs')
const PORT = process.env.PORT || 8000
const dotenv = require('dotenv').config()


const app = express()



let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'plate-lunch-api'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
  
// developing a schema here
// let plateLunchSpots = {
//     "champagnes grocery": {
//         "restaurantName": "Champagne's Grocery and Deli",
//         "address": {
//             "streetName": "716 Souvenir Gate",
//             "city": "Lafayette",
//             "state": "LA",
//             "zipcode": "70506"
//         },
//         "phoneNumber": "(337) 235-6733",
//         "website": null,
//         "staticDailyMenu": true,
//         "menu": {
//             "monday": {
//                 "entrees": [],
//                 "sides": []
//             },
//             "tuesday": {
//                 "entrees": [],
//                 "sides": []
//             },
//             "wednesday": {
//                 "entrees": [],
//                 "sides": []
//             },
//             "thursday": {
//                 "entrees": [],
//                 "sides": []
//             },
//             "friday": {
//                 "entrees": ["Beef Roast", "Shrimp Stew"],
//                 "sides": ["Corn", "Potato Salad", "???"]
//             }
//         }
//     }
// }



app.get('/', (req, res) => {
    db.collection('plateLunchSpots').find().sort({recommendedBy: -1}).toArray() 
    .then(data => {
        res.render('index.ejs', { info: data })
    })
    .catch(err => console.error(err))

}) 

app.post('/addPlateLunchSpot', (req, res)=> {
    db.collection('plateLunchSpots').insertOne({restaurantName: req.body.restaurantName, recommendedBy: 0})
    .then(result => {
        console.log('Plate Lunch Spot added')
        res.redirect('/')
    })
    .catch(err => console.error(err))
})

app.put('/addRecommendation', (req, res)=> {
    db.collection('plateLunchSpots').updateOne({restaurantName: req.body.restaurantName, 
        recommendedBy: req.body.recommendedBy},{
        $set: {
            recommendedBy: req.body.recommendedBy + 1
        }
    },{
        sort: {_id: -1}, 
        upsert: false
    })
    .then(result => {
        console.log('Added a recommendation')
        res.json("Recommended")
    })
})


app.delete('/deletePLS', (req, res)=> {
    db.collection('plateLunchSpots').deleteOne({restaurantName: req.body.restaurantName})
    .then (result => {
        console.log("Deleted")
        res.json("Deleted")
    })
    .catch(err => console.error(err)) 
})

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})