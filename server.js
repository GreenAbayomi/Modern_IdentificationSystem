const app  = require("./app")
const connectDB = require("./config/db.config")

const port = process.env.PORT || 5000


const start = async()=>{
    try {
        
        await connectDB()
        app.listen(port, ()=>{
            console.log(`server is listening on port ${port}...`);
        })
    } catch (error) {
        console.log(error)
    }
}

start()