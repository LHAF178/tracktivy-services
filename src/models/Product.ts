import mongoose from '../database'
import { IBrand } from './Brand'
import { ITeam } from './Team'

export interface ISize {
    size: string,
    stock: number
}

export interface IProduct extends mongoose.Document {
    name: string,
    image: string,
    unitPrice: number,
    stripeProduct: string,
    stripePrice: string,
    brand: IBrand['_id'],
    team: ITeam['_id'],
    sizes: ISize[],
    createdAt?: Date
}

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    unitPrice: {
        type: Number,
        require: true
    },
    stripePrice: {
        type: String,
        require: true,
    },
    stripeProduct: {
        type: String,
        require: true
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'Brand'
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Team'
    },
    sizes: {
        type: Array,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model<IProduct>('Product', ProductSchema, 'Products')