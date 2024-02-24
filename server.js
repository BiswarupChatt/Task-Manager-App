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

const taskSchemaValidation = {
    title: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Title cannot be empty'
        },
        exists: {
            errorMessage: 'Title is required'
        },
        isLength: {
            options: { min: 5 },
            errorMessage: 'title should be at least 5 character'
        },
        custom: {
            options: function (value) {
                Task.findOne({ title: value })
                    .then((task) => {
                        if (task) {
                            throw new Error('title already exists')
                        } else {
                            return true
                        }
                    })
                    .catch()
            }
        }
    },

    description: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Description cannot be empty'
        },
        exists: {
            errorMessage: 'Description is required'
        },
        isLength: {
            options: { min: 5 },
            errorMessage: 'Description should be at least 5 character'
        }
    },

    status: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Status cannot be empty'
        },
        exists: {
            errorMessage: 'Status is required'
        },
        isIn: {
            options: [['pending', 'in progress', 'completed']],
            errorMessage: 'status should be one of (pending, in progress, completed)'
        }
    }
}


app.listen(port, () => {
    console.log(`server is running on ${port}`)
})