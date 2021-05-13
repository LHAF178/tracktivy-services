import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export interface IToken {
    exp: number,
    iat: number,
    accountId: string
}

let randomInteger = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export default {

    generateJwt: (identifier: string, expiration: number) => {
        return jwt.sign({ accountId: identifier }, process.env.SECRET, {
            expiresIn: expiration
        })
    },

    validateJwt: async (token: string) : Promise<IToken> => {

        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.SECRET, (err, decoded) => {
                if (err)
                    reject(err)
                else
                    resolve(decoded as IToken)
            })
        })
    },

    compareHash: (hash: string, hashToCompare: string) => {
        return bcrypt.compare(hash, hashToCompare)
    },

    randomString: (length: number) => {
        let generated = '';
        while (generated.length != length) {
            generated += alphabet.charAt(randomInteger(0, alphabet.length))
        }
        return generated
    },
}