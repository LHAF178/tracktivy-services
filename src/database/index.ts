  
import mongoose from 'mongoose'

const string = process.env.DATABASE_URI

mongoose.connect(string, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

export default mongoose