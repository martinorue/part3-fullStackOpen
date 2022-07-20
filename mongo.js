const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://martinorue:${password}@cluster0.5qybt.mongodb.net/agendaApp?retryWrites=true&w=majority`

// const personSchema = new mongoose.Schema({
//     name: String,
//     number: Number,
// })

// const Person = mongoose.model('Person', personSchema)
// console.log(Person)

mongoose
    .connect(url)
    .then((result) => {
        console.log('connected')

        // const person = new Person({
        //     id: 3212132,
        //     name: 'Negrita',
        //     number: 123456,
        // })

        // return person.save()
    })
    // .then(() => {
    //     console.log('person saved!')
    //     return mongoose.connection.close()
    // })
    .catch((err) => console.log('error'))