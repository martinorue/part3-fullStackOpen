const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })


const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [3, '{VALUE} is shorter than the minimum allowed length (3)'],
        required: [true, "User name required"],
        unique: [true, 'Person with name {VALUE} is already added to phonebook']
    },
    number: {
        type: String,
        minLength: 8,
        required: true,
        // validate: {
        //     validator: function (v) {
        //         return /(^[0-9]{2,3}-{1}[0-9]\d)\w/.test(v);
        //     }
        // }
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)