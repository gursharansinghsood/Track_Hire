import dotenv from 'dotenv'

dotenv.config()

const requiredEnvVar = ["PORT", "MONGO_URI", "CLIENT_URL", "EMAIL_USER", "EMAIL_PASS", "ACCESSTOKEN", "REFRESHTOKEN"]


for (const EnvVar of requiredEnvVar) {
    if (!process.env[EnvVar]) {
        console.log(`Missing ENV variable ${EnvVar}`)
        process.exit(1)
    }
}

const config = {
    port: process.env.PORT,
    resendKey: process.env.RESEND_API_KEY,
    mongoUri: process.env.MONGO_URI,
    clientUrl: process.env.CLIENT_URL,
    emailUser: process.env.EMAIL_USER,
    emailPass: process.env.EMAIL_PASS,
    accessToken: process.env.ACCESSTOKEN,
    refreshToken: process.env.REFRESHTOKEN,
};

export default config;

