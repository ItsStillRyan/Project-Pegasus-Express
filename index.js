const express = require("express")
const cors = require("cors")
require("dotenv".config())
const MongoUtil = require("./MongoUtil")
const ObjectId = require("mongodb").ObjectId
const mongoUrl = process.env.MONGO_URL

let app = express()
app.use(express.json())
app.use(cors())

async function main(){
    let userData = await MongoUtil.connect(mongoUrl, "Pegasus_User")
    let webCategories = await MongoUtil.connect(mongoUrl, "Pegasus_Cat")
    let webQuestions  = await MongoUtil.connect(mongoUrl, "Pegasus_Ques")
    
    //create
    app.post("/upload", async (req,res) => {
        try {
            let resules = await db.collection("user_details").insertMany({

            })
            res.status(200)
            res.send(result.ops[0])
        } catch (e) {
            res.status(500)
            res.send({
                message: "Unable to upload. Please contact us if the problem persists!"
            })
        }
    })

    //fetch info
    app.get("/temp", async (req, res)=>{
        try {

            res.status(200)
            res.send(result.ops[0])
        } catch (e) {
            res.status(500)
            res.send({
                message: "Unable to display content. Please contact us if the problem persists!"
            })
        }
    })

    

}
main()
app.listen(3000, () => {
    Console.log("Server Active. Port 3000")
})