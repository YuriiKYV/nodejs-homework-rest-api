const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");



const { User } = require("../../models/users");
const { HttpError, sendEmail } = require("../../helpers");
const verificationToken = nanoid();
const {BASE_URL} = process.env;



const signup = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email in use")
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);


    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationToken });
    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.email,
        }
    });

    const verifyEmail = {
        to: email,
        subject: "Verify you email",
        html: `<a href="${BASE_URL}/api/users/verify/${verificationToken}">Click verify email</a>`
    };

    await sendEmail(verifyEmail);
};

module.exports = signup;