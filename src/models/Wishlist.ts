import mongoose from '../database'
import { IAccount } from './Account'
import { IProduct } from './Product'

export interface IWishlist extends mongoose.Document {
    account: IAccount['_id'],
    product: IProduct['_id'],
    createdAt?: Date
}

const WishlistSchema = new mongoose.Schema({
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
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model<IWishlist>('Wishlist', WishlistSchema, 'Wishlist')