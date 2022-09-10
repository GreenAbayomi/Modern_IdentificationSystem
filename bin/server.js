const app  = require("../app")
const connectDB = require("../src/config/db.config")

const port = process.env.PORT || 5000


const start = async()=>{
    try {
        
        await connectDB()
        app.listen(port, ()=>{
            console.log(`Server is listening on port ${port}...`);
        })
    } catch (error) {
        console.log(error)
    }
}

start()