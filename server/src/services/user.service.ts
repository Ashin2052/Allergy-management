import bcrypt from "bcrypt";
import UserSchema from "../models/user.schema";
import jwt from 'jsonwebtoken';

export const register = async (req) => {
    const {email, password, confPassword} = req.body;
    const user = await UserSchema.findOne({
        email: req.body.email
    });
    if (user?.email === email) {
        throw  new Error("User already exists");
    }
    if (password !== confPassword) {
        throw  new Error("Password and Confirm Password do not match");
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        return await UserSchema.create({
            ...req.body,
            password: hashPassword,
        });

    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {
    try {
        const user = await UserSchema.findOne({
            email: req.body.email
        });

        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) return res.status(400).json({msg: "Wrong Password"});
        const {id, name, email} = user;
        const accessToken = jwt.sign({id, name, email}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '60s'
        });
        const refreshToken = jwt.sign({id, name, email}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });

        await UserSchema.findByIdAndUpdate(id, {refreshToken: refreshToken});
        res.json({accessToken, refreshToken, id, name, email});
    } catch (error) {
        res.status(404).json({msg: error.message ? error.message : "Email not found"});
    }
}

export const generateRefreshToken = async (req, res) => {
    try {
        //get refreshToken
        const oldRefreshToken = req.body.refreshToken;
        //send error if no refreshToken is sent
        if (!oldRefreshToken) {
            return res.status(403).json({error: "Access denied,token missing!"});
        } else {
            //query for the token to check if it is valid:
            const user = await UserSchema.findOne({refreshToken: oldRefreshToken});
            const {id, name, email, refreshToken} = user;

            //send error if no token found:
            if (!user) {
                return res.status(401).json({error: "Token expired!"});
            } else {
                //extract payload from refresh token and generate a new access token and send it
                const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
                console.log('ashi')

                return jwt.sign({id, name, email}, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: '120s'
                });
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Internal Server Error!"});
    }
};

export const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const user = await UserSchema.findOne({
        refreshToken: refreshToken
    });
    if (!user[0]) return res.sendStatus(204);
    const userId = user.id;
    await UserSchema.findByIdAndUpdate(userId, {refreshToken: null}
    );
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}
