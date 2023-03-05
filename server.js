const app = require("./app")

const cors = require("cors");
const dotenv = require("dotenv") 

app.use(cors());
//app.get("/hello", please)

const connectDatabase = require("./config/database")

dotenv.config({path:"config/config.env"})

connectDatabase()
const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})

//Handle uncaught exception
process.on("uncaughtException", (err)=>{
    console.log(err, "errr")
    console.log(`Error:${err.message}`)
    console.log("Shutting down due to the unhandled uncaught exception")
    server.close(()=>{
        process.exit(1)
})
})

//Unhandled promise rejection
process.on("unhandledRejection", (err)=>{
    console.log(`Error:${err.message}`)
    console.log("Shutting down due to the unhandled promise rejection")
    server.close(()=>{
        process.exit(1)
})

})