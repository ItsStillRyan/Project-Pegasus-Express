const express = require("express")
const cors = require("cors")
require("dotenv").config()
const MongoUtil = require("./MongoUtil")
const ObjectId = require("mongodb").ObjectId
const mongoUrl = process.env.MONGO_URL

let app = express()
app.use(express.json())
app.use(cors())

async function main() {
    let userData = await MongoUtil.connect(mongoUrl, "Pegasus_User")
    // let webCategories = await MongoUtil.connect(mongoUrl, "Pegasus_Cat")
    // let webQuestions = await MongoUtil.connect(mongoUrl, "Pegasus_Ques")
    console.log("Database Active, Main Function Running");

    //create
    app.post("/upload", async (req, res) => {
        let test = req.body.test;

        try {
            let result = await userData.collection("user_details").insertOne({
                test: test
            })
            res.status(200)
            res.send(result.ops[0])
        } catch (e) {
            res.status(500)
            res.send({
                message: "Unable to upload. Please contact us if the problem persists!"
            })
            console.log(e)
        }
    })

    //fetch info
    app.get("/upload", async (req, res) => {
        try {
            let temp = await userData.collection("user_details").find().toArray()
            res.status(200)
            res.send(temp)
        } catch (e) {
            res.status(500)
            res.send({
                message: "Unable to display content. Please contact us if the problem persists!"
            })
            console.log(e)
        }
    })


    //deleting
    app.delete("/delete/:id", async (req, res) => {

        try {
            await userData.collection("user_details").deleteOne({
                _id: ObjectId(req.params.id)
            })
            res.status(200)
            res.send({
                'message': 'deleted'
            })
        } catch (e) {
            res.status(500)
            res.send({
                'message': "Unable to delete content. Please contact us if the problem persists!"
            })
            console.log(e)
        }
    })

    //updating
    app.put("/upload", async (req,res)=>{
        try {
            await userData.collection("user_details").updateOne({
                _id: ObjectId(req.params.id)
            },{
                '$set':{
                    'test': req.body.test
                }
            })
            res.status(200)
            res.send({
                'message': 'Successfully Updated'
            })
        } catch (e) {
            res.status(500)
            res.send({
                'message': "Unable to update content. Please contact us if the problem persists!"
            })
            console.log(e)
        }
    })
}
main()
app.listen(3000, () => {
    console.log("Server Active. Port 3000")
})