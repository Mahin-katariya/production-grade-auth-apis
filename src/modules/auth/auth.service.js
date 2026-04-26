
import APIError from "../../common/utils/apiError.js"
import { generateAccessToken, generateRefreshToken, generateResetToken, verifyRefreshToken } from "../../common/utils/jwt.utils.js";
import User from "./auth.model.js"

const register = async ({name, email, password, role}) => {
    // do user registration
    const existingUser = await User.findOne({email})
    if(existingUser) throw APIError.conflict("user with this email already exist");
    const {rawToken, hashedToken} = generateResetToken();

    const user = await User.create({
        name,
        email,
        password,
        role,
        verificationToken: hashedToken
    })

    //(TODO): send an email to user withh token: rawToken

    const userObj = user.toObject();
    delete userObj.password
    delete userObj.verificationToken

    return userObj
}

 const hashToken = (token) => {
     return crypto.createHash("sha256").update(token).digest("hex")
 } 

const login = async ({email, password}) => {
    // take email and find user in DB
    // then check if password is correct
    // check if verified or not
    const user = await User.findOne({email}).select("+password");

    if(!user) throw APIError.unauthorized("Invalid email or password");

    if(!user.isVerified){
        throw APIError.forbidden("Verify your email")
    }

    const accessToken = generateAccessToken({id: user._id, role: user.role});

    const refreshToken = generateRefreshToken({id: user._id});

    user.refreshToken = hashToken(refreshToken)
    await user.save({validateBeforeSave: false})


    const userObj = user.toObject()
    delete userObj.password
    delete userObj.refreshToken

    // also try sending it in cookies (web-based specific)
    return {user: userObj, accessToken, refreshToken}
}

const refresh = async (token) => {
    if(!token) throw APIError.unauthorized("Refresh token missing");
    const decoded = verifyRefreshToken(token)

    const user = await User.findById(decoded.id).select("+refreshToken");

    if(!user) throw APIError.unauthorized("User not found");

    if(user.refreshToken !== hashToken(token)){
        throw APIError.unauthorized("Invalid refresh token");
    }
    
    const accessToken = generateAccessToken({id: user._id, role: user.role});
    const refreshToken = generateRefreshToken({ id: user._id });

    return {accessToken, refreshToken}
}

const logout = async (userId) => {
    // const user = await User.findById(userId);
    // if(!user) throw APIError.unauthorized("User not found");

    // user.refreshToken = null;
    // await user.save({validateBeforeSave: false});

    await User.findByIdAndUpdate(userId, {refreshToken: null});
}

const forgotPassword = async (email) => {
    // check if user even exist or not, if it does -
    const user = await User.findOne({email});
    if(!user) throw APIError.notfound("User not found!");

    // create resetPasswordToken send it to user and store it in DB aswell
    const { rawToken, hashedToken } = generateResetToken();

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 15*60*1000

    await user.save();

    // TODO: mail bhejna nahi aata
}

export {register, login, refresh, forgotPassword, logout}