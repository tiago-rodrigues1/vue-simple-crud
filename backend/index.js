
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { ObjectId } from 'bson'

import { database } from './utils/db.js'

const app = express()
const port = 3000

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) 

app.get('/ping', (req, res) => {
    res.status(200).json("Pong!")
})

app.get('/stations', async (req, res) => {
    try {
        const db = await database()
        const stations = await db.collection("stations").find().toArray()
        return res.status(200).json(stations)
    } catch (error) {
        return res.status(500).json({ success: false, error: error })
    }
})

app.post('/stations/create', async (req, res) => {
    try {
        const db = await database()
        const stationsCollection = db.collection("stations")

        const doc = await req.body

        const result = await stationsCollection.insertOne(doc)

        if (result.insertedId) {
            return res.status(200).json({ success: true, message: "Station saved" })
        } else {
            throw new Error("Saving operation got error")
        }

    } catch (error) {
        return res.status(500).json({ success: false, error: error })
    }
})

app.delete('/stations/:id/destroy', async (req, res) => {
    try {
        const db = await database()
        const stationsCollection = db.collection("stations")

        const stationId = req.params.id
        const query = { _id: new ObjectId(stationId) }
        
        
        const result = await stationsCollection.deleteOne(query)

        console.log(result);

        if (result.deletedCount) {
            return res.status(200).json({ success: true, message: "Station rdeleted" })
        } else {
            throw new Error("Delete operation got error")
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: error })
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
