const { user } = require('../models/index');

const getUserByUsername = async (userName) => {
    let result = await user.findOne({
        where: {
            username: userName
        }
    });
    return result;
}

const getUserInfoById = async (userId) => {
    let result = await user.findOne({
        where: {
            id: userId
        }
    });
    console.log(result);
    return result;
}

module.exports = {
    getUserByUsername,
    getUserInfoById
}