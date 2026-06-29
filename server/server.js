import app from "./src/app.js"
import config from "./src/config/config.js"
import connectDB from "./src/config/db.js"

const startServer = async () => {
    try {
        await connectDB()
        app.listen(config.port, () => console.log("Server is Running..."))
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

startServer()