import Product, { IProduct } from "../models/Product"
import mongoose from "../database"
import Correios from "./Correios"

export interface CartProduct {
    product: IProduct,
    quantity: number
}

export interface IPricing {
    subtotal: number,
    discounts: number,
    shipping: number,
    total: number,
    products: CartProduct[]
}

export default {
    async priceOrder(items: CartProduct[]) {
        const idsArray = items.map(entry => {
            return mongoose.Types.ObjectId(entry.product._id)
        })

        const products = await Product.find({
            '_id': { $in: idsArray}
        })

        let result: IPricing = {
            subtotal: 0,
            discounts: 0,
            shipping: 0,
            total: 0,
            products: []
        }

        //const frete = await Correios.getFrete('01451000')
        result.shipping = 22.5

        products.forEach(entry => {
            const quantity = items[items.findIndex(element => element.product._id == entry._id)].quantity
            result.subtotal += entry.unitPrice * quantity
            result.products.push({
                product: entry,
                quantity
            })
        })

        result.total = (result.subtotal + result.shipping) - result.discounts

        return result
    }
}