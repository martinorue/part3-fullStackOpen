const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://martinorue:${password}@cluster0.5qybt.mongodb.net/agendaApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
})

const Person = mongoose.model('Person', personSchema)


mongoose
    .connect(url)
    .then(() => {
        if(process.argv.length === 3){
            Person.find({}).then(result => {
                console.log('phonebook');
                result.forEach(person => {
                    console.log(`${person.name} ${person.number}` );
                })
                mongoose.connection.close()
            }).then(() => mongoose.connection.close())
        }else{
            const person = new Person({
                name: name,
                number: number
            })
            return person.save().then(() => {
                console.log(`added ${person.name} number ${person.number} to phonebook`)
                return mongoose.connection.close()
            })
        }
        }).catch((err) => console.log(err))