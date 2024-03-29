const Collaborateur = require('./Collaborateur.model');



module.exports = {
    findAll: (req, res) => {
        Collaborateur.find({})
            .exec()
            .then(collaborateurs => {
                if (collaborateurs === null){
                    return res.status(500).json({error:1,message:'Aucun collaborateur trouvé'})
                }
                res.json(collaborateurs)
            })
            .catch(err => res.status(500).json({error:1,message:err.message}))
    },
    findOne: (req, res) => {
        Collaborateur.findById(req.params.id)
            .exec()
            .then(collaborateur => {
                if (collaborateur === null){
                    return res.status(500).json({error:1,
                    message:'Collaborateur non trouvé'})
                }
                res.json(collaborateur)
            })
            .catch(err => res.status(500).json({error:1,message:err.message}))
    },
    create: (req, res) => {
        Collaborateur.create( req.body)
            .then(collaborateur => res.json({succes:1,message:'Collaborateur créé', inserted:collaborateur}))
            .catch(err => res.status(500).json({error:1,message:err.message}))
    },
    update : (req, res) => {
        Collaborateur.findByIdAndUpdate( req.params.id, req.body, {new:true} )
            .exec()
            .then(collaborateur => {
                if (collaborateur === null)
                    return res.status(500).json({error:1, message:'Collaborateur non trouvé'})

                res.json({success:1, message:'Collaborateur modifié', updated:collaborateur })
            })
            .catch(err => res.status(500).json({error:1, message:err.message}))
    },
    remove : (req, res) => {
        Collaborateur.findByIdAndRemove( req.params.id )
            .exec()
            .then(collaborateur => {
                if (collaborateur === null)
                    return res.status(500).json({error:1, message:'Collaborateur non trouvé'})

                res.json({success:1, message:'Collaborateur supprimé', removed:collaborateur })
            })
            .catch(err => res.status(500).json({error:1, message:err.message}))
    }
};