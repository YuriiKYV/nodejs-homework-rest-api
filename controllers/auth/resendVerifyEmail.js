const { User } = require("../../models/users");

const { HttpError, sendEmail } = require("../../helpers");
const { BASE_URL } = process.env;

const resendVerifyEmail = async(req, res)=> {
    const {email} = req.body;
    const user = await User.findOne({ email });
    if(!user){
        throw HttpError(404, "User not found");
    }

    console.log(user.verify)

    if(user.verify) {
        throw HttpError(400, "Verification has already been passed")
    }

    const verifyEmail = {
        to: email,
        subject: "Verify you email",
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click verify email</a>`
    };

    await sendEmail(verifyEmail);

    res.json({
        message: "Verification email sent"
    })
}

module.exports = resendVerifyEmail;