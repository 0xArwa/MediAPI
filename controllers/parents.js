const update = async (req, res, next) => {
    try{
        const {
            firstname,
            lastname,
            username,
            email,
            address,
            city,
            country,
            postalCode
        } = req.body
        const {user_name:loggedUsername} = req.dbUser
        await User_Account.update({
            user_name:username,
            email
        },{
            where:{
                user_name:loggedUsername
            }
        })
        await Parents.update({
            user_name:username,
            first_name:firstname,
            last_name:lastname,
            address,
            city,
            country,
            postalCode
        },{
            where:{
                user_name:loggedUsername
            }
        })
        res.sendStatus(200)
    }
    catch(error){
        next(new Error(error))
    }
}


const getOne = async (req, res, next) => {
    try {
        const dbTreatmentRecords = await Child.findOne({
            include: ['parents'],
            where:{
                patient_id: req.dbUser.parents[0].patient_id
            }
        })
        res.status(200).json(dbTreatmentRecords)
    } catch (error) {
        console.log(error)
        next(new Error('Server error'))
    }
}

module.exports = {
    update,
    getOne
}
