const conect = require('../database/conect');

module.exports = {
    async index (req, res) {
        const ong_id = req.headers.auth;
        const incidents = await conect('incidents')
            .where('ong_id', ong_id)
            .select('id','title', 'description', 'value');

        return res.json(incidents);
    },
}