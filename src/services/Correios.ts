const Correios = require('node-correios')

const correios = new Correios()

export default {
    async getFrete(cep: string) {
        const response = await correios.calcPreco({
            nCdServico: '04014',
            sCepOrigem: '13202500',
            sCepDestino: cep,
            nCdFormato: '1',
            nVlPeso: '0.5',
            nVlComprimento: 15,
            nVlAltura: 15,
            nVlLargura: 15,
            nVlDiametro: 15
        })

        const valor = response[0].Valor as string
        
        return parseFloat(valor.replace(',', '.'))
    }
}