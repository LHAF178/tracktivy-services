import { NextFunction, Request, Response } from "express"

import security from '../services/Security'

export default async (req: Request, res: Response, next: NextFunction) => {

    const { authorization } = req.headers

    if (!authorization)
        return res.status(401).json({ message: 'No authorization header provided.'})

    const parts = authorization.split(' ')

    if (parts.length != 2)
        return res.status(401).json({ message: 'Malformed authorization header.'})

    const [ scheme, token ] = parts

    if (!/^Bearer$/i.test(scheme))
        return res.status(401).json({ message: 'Malformed bearer token.'})

    try {
        const parsedToken = await security.validateJwt(token)

        if (parsedToken) {
            req.headers = {
                ...req.headers,
                accountId: parsedToken.accountId
            }
            return next()
        }
    } catch (exception) {
        return res.status(401).json({ message: 'The provided token is invalid or it already expired.'})
    }
}