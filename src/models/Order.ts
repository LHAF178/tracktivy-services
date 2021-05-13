import { IPricing } from '../services/PriceEngine'
import mongoose from '../database'
import { IAccount } from './Account'

export interface IOrder extends mongoose.Document {
    stripeId: string,
    status: string,
    account: IAccount['_id']
    pricing: IPricing,
    line_items: Array<any>,
    createdAt?: Date
}

const OrderSchema = new mongoose.Schema({
    stripeId: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        require: true,
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Account'
    },
    pricing: {
        type: Object,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model<IOrder>('Order', OrderSchema, 'Orders')