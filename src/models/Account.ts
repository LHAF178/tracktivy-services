import mongoose from '../database'
import bcrypt from 'bcrypt'

export interface IAddress {
    street: string,
    extra: string,
    number: string,
    zipcode: string,
}

export interface IAccount extends mongoose.Document {
    name: string,
    email: string,
    birth: string,
    phone: string,
    password: string,
    lastLogin?: Date,
    address: IAddress,
    createdAt?: Date
}

const AccountSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    birth: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
        select: false
    },
    lastLogin: {
        type: Date
    },
    address: {
        type: Object,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

AccountSchema.pre<IAccount>('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash

    next()
})

export default mongoose.model<IAccount>('Account', AccountSchema, 'Accounts')