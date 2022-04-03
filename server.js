const express = require('express')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
const ejs = require('ejs')

const pw = 'not today satan' //This is not the password - waiting to learn to hide, so this is just a placeholder

const app = express()

const PORT = process.env.PORT || 8000

let db,
    dbConnectionStr = `mongodb+srv://jwardoin:${pw}@cluster0.ynivp.mongodb.net/plateLunchAPI?retryWrites=true&w=majority`,
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
    db.collection('plateLunchSpots').find().toArray()
    .then(data =>{
        res.render('index.ejs', { info: data })
    })
    .catch(err => console.error(err))

}) 

app.post('/addPlateLunchSpot', (req, res)=>{
    db.collection('plateLunchSpots').insertOne(req.body)
    .then(result => {
        console.log('Plate Lunch Spot added')
        res.redirect('/')
    })
    .catch(err => console.error(err))
})

// app.put('/info', (req, res)=>{
//     //update info
// })

app.delete('/deletePLS', (req, res)=>{
    db.collection('plateLunchSpots').deleteOne({restaurantName: req.body.restaurantName})
    .then (result =>{
        console.log("Deleted")
        res.json("Deleted")
    })
    .catch(err => console.error(err)) 
})

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})