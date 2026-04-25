import "dotenv/config"
import app from "./src/app.js"
import connectDB from "./src/common/config/db.js"
const PORT = process.env.PORT || 5000

// start a listener

const start = async () => {
    // connect to database
    await connectDB()
    app.listen(PORT, () => {
        console.log(`Server is running at ${PORT} in ${process.env.NODE_ENV} mode`);
    })
}

start().catch((err) => {
    console.error("Failed to start server", err);
    process.exit(1) //? understand exit codes ?
    // to terminate the code gracefully we use exit.
})




