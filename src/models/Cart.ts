import mongoose from '../database'
import { IAccount } from './Account'
import { IProduct } from './Product'

export interface ICart extends mongoose.Document {
    account: IAccount['_id'],
    product: IProduct['_id'],
    createdAt?: Date,
    quantity: number
}

const CartSchema = new mongoose.Schema({
    account: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Account'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        require: true,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model<ICart>('Cart', CartSchema, 'Cart')