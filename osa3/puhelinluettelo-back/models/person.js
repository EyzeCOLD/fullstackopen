import mongoose from 'mongoose'

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

try {
  await mongoose.connect(url, { family: 4 })
  console.log('Connected to MongoDB!')
} catch (error) {
  console.error('Error connecting to MongoDB:', error)
}

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, 'Name must be atleast 3 characters long'],
    required: [true, 'Name is required'],
  },
  phoneNumber: {
    type: String,
    minlength: [8, 'Phone number must be atleast 8 characters long'],
    match: [/^[0-9]{2,3}-[0-9]+$/, 'Not a valid phone number'],
    required: [true, 'Phone number is required'],
  },
})

personSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Person = mongoose.model('Person', personSchema)

export { Person }
