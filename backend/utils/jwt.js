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
    // Configure cookie options for production vs development.
    // In production we set secure and SameSite=None so cookies can be sent across origins (frontend on Netlify)
    const isProd = process.env.NODE_ENV === 'production';

    const cookieOptions = {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    if (isProd) {
        cookieOptions.secure = true; // HTTPS only
        cookieOptions.sameSite = 'none';
        // Optionally set domain if provided (useful for custom domains)
        if (process.env.COOKIE_DOMAIN) cookieOptions.domain = process.env.COOKIE_DOMAIN;
    } else {
        // For local development keep Lax so cookies work with dev server
        cookieOptions.sameSite = 'lax';
    }

    res.cookie('token', token, cookieOptions); // 7 days
    return token;
}
