

var helperFunction = {
    verifyToken: async (jwt, token) => {
        try {
            if (token == null) return false
            let verifyResult = await jwt.verify(token, process.env.JWT_SECRET)
            if (verifyResult) return true
            else return false
        } catch (error) {
            return false
        }
    },
    decodeToken: async (jwt, token) => {
        try {
            if (token == null) return null
            let decodeResult = await jwt.decode(token, process.env.JWT_SECRET)
            return decodeResult
        } catch (error) {
            throw 'Token couldn\'t get decoded'
        }
    }
}

module.exports = helperFunction
