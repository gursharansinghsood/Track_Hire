import jwt from 'jsonwebtoken'

const {
    JWT_SECRET = 'replace_this_with_strong_secret',
    JWT_EXPIRES_IN = '1h',
    JWT_REFRESH_EXPIRES_IN = '7d'
} = process.env

export function accessTokenGenerator(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export function refreshTokenGenerator(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN })
}

// verify access token
export function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET)
}

// verify refresh token (named export expected by controller)
export function refreshTokenVerify(token) {
    return jwt.verify(token, JWT_SECRET)
}

export default {
    accessTokenGenerator,
    refreshTokenGenerator,
    verifyToken,
    refreshTokenVerify
}

