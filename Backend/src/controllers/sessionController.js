const conect = require('../database/conect');

module.exports = {
    async create (req, res) {
        const {id} = req.body;

        const ong = await conect('ongs')
        .where('id', id)
        .select('nome')
        .first();

        if (!ong) {
            return res.status(400).json({error: "Não há ong cadastrada com esse id"});
        }

        return res.json({ong})
    }
}