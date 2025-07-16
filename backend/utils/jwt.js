import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateToken = (res, user) => {
    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
  
    res.cookie(
        'token',
        token,
        {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        }
    ); // 7 days
    return token;
}
