const express = require('express')
const { Schema, model, connect } = require('mongoose')
const { checkSchema, validationResult } = require('express-validator')
const app = express()
const port = 3066

connect('mongodb://127.0.0.1:27017/task-management-app')
    .then(() => {
        console.log('task app connected to db')
    })
    .catch((err) => {
        console.log('error to connect', err)
    })

const taskSchema = new Schema({
    title: String,
    description: String,
    status: String,
}, { timestamps: true })

const Task = model('Task', taskSchema)




app.listen(port, () => {
    console.log(`server is running on ${port}`)
})