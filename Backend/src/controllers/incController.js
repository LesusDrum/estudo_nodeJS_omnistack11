const conect = require('../database/conect');

module.exports = {
    async index (req, res) {
        const {page = 1} = req.query;

        const [count] = await conect('incidents').count();

        const incidents = await conect('incidents')
            .join('ongs', 'ongs.id', "=", "incidents.ong_id")
            .limit(5)
            .offset((page - 1) * 5)
            .select(['incidents.*', 
                    'ongs.nome', 
                    'ongs.email', 
                    'ongs.whatsapp', 
                    'ongs.city', 
                    'ongs.uf']);

        res.header('X-Total-Count', count['count(*)'])

        return res.json(incidents);
    },

    async delete (req, res) {
        const {id} = req.params;
        const ong_id = req.headers.auth;

        const incident = await conect('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

        if (incident.ong_id !== ong_id) {
            return res.status(401).json({error: "Operation Not Permited."})
        }

        await conect('incidents').where('id', id).delete();

        return res.status(204).send();
    },

    async create (req, res) {
            const {title, description, value} = req.body;
            const ong_id = req.headers.auth;

            const [id] = await conect('incidents').insert({
                title, 
                description, 
                value,
                ong_id,
            });

            return res.json({id});
    }
};