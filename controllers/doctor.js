const update = async (req, res, next) => {
    try{
        const {
            firstname,
            lastname,
            username,
     

        } = req.body
        const {user_name:loggedUsername} = req.dbUser
        await User_Account.update({
            user_name:username,
      
        },{
            where:{
                user_name:loggedUsername
            }
        })
        await Physician.update({
            username_:username,
            first_name:firstname,
            last_name:lastname
        },{
            where:{
                username_:loggedUsername
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
        const user = await User_Account.findOne({
            include: ['physician'],
            where:{
                user_name:username
            }
        })
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        next(new Error('Server error'))
    }
}

module.exports = {
    update,
    getOne
}
