import mongoose from '../database'

export interface IBrand extends mongoose.Document {
    name: string,
    image: string,
    createdAt?: Date
}

const BrandSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model<IBrand>('Brand', BrandSchema, 'Brands')