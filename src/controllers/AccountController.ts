import express from 'express'
import Security from '../services/Security'
import Account, { IAccount } from '../models/Account'
import AuthenticationMiddleware from '../middleware/AuthenticationMiddleware'
import AdminMiddleware from '../middleware/AdminMiddleware'
import mongoose from '../database'

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const Body = req.body

        const CreatedAccount = await Account.create(Body)

        return res.json(CreatedAccount)
    } catch (exception) {
        return res.status(500)
    }
})

router.post('/authenticate', async (req, res) => {
    try {
        const { email, password } = req.body

        const account = await Account.findOne({ email }).select('+password')

        if (!account)
            return res.status(404).json({ message: `Usuário com o email ${email} não encontrado.` })

        if (!await Security.compareHash(password, account.password))
            return res.status(401).json({ message: 'Email ou senha incorreto(s)...'})


        account.password = undefined

        const token = Security.generateJwt(account.id, 86000)

        await Account.updateOne({
            _id: account._id
        }, {
            $set: {
                lastLogin: new Date()
            }
        })

        return res.json({account, token})
    } catch (exception) {
        return res.status(500)
    }
})

router.use(AuthenticationMiddleware)

router.get('/my-account', async (req, res) => {
    try {
        const accountId = req.headers.accountId
        const MyAccount = await Account.findOne({
            _id: accountId
        })

        return res.json(MyAccount)
    } catch (exception) {
        return res.status(500).json(exception)
    }
})

router.post('/my-account', async (req, res) => {
    try {
        const accountId = req.headers.accountId
        const body = req.body as IAccount

        console.log(body)

        const MyAccount = await Account.findOneAndUpdate({
            _id: accountId
        }, {
            $set: {
                name: body.name,
                email: body.email,
                birth: body.birth,
                phone: body.phone
            }
        }, {new: true})

        return res.json(MyAccount)
    } catch (exception) {
        return res.status(500).json(exception)
    }
})

router.use(AdminMiddleware)

router.get('/', async (req, res) => {
    const Accounts = await Account.find({})

    return res.json(Accounts)
})

router.get('/by-id/:id', async (req, res) => {
    try {
        const account = await Account.findById(req.params.id)

        return res.json(account)
    } catch (exception) {
        return res.status(500).json(exception)
    }
})

export default router