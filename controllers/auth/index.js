const signup = require("./signup");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateAvatar = require("./updateAvatar");
const verify = require("./verify");
const resendVerifyEmail = require("./resendVerifyEmail");

module.exports = {
    signup,
    login,
    getCurrent,
    logout,
    updateAvatar,
    verify,
    resendVerifyEmail,
}