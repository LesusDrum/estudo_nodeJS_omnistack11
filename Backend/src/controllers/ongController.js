const crypto = require('crypto');
const conect = require('../database/conect');

module.exports = {
    async index (req, res) {

        const ongs = await conect('ongs').select('*');
    
        return res.json(ongs);
    
    },

    async create(req, res) {
        const {nome, email, whatsapp, city, uf} = req.body;
    
    const id = crypto.randomBytes(4).toString('HEX');

    await conect('ongs').insert({
        id,
        nome,
        email,
        whatsapp,
        city,
        uf,
    })
    
        return res.json({ id })
    
    }
}