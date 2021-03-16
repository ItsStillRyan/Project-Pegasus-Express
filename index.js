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
    let userData = await MongoUtil.connect(mongoUrl, "Pegasus")
    let webCategories = await MongoUtil.connect(mongoUrl, "Pegasus")
    let userComments = await MongoUtil.connect(mongoUrl, "Pegasus")
    console.log("Database Active, Main Function Running");

    //CREATE

    //USER DETAILS
    app.post("/upload", async (req, res) => {
        let user_uploads = req.body.user_uploads;
        try {
            let result = await userData.collection("user_details").insertOne({
                user_uploads: user_uploads
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
    //CATEGORIES
    app.post("/uploadCat", async (req, res) => {
        let web_cats = req.body.web_cats
        try {
            let result = await webCategories.collection("web_cats").insertOne({
                web_cats: web_cats
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
    //COMMENTS  
    app.post("/uploadCom", async (req, res) => {
        let userComs = req.body.userComs;
        try{
            let results = await userComments.collection("user_comments").insertOne({
                userComs : userComs
            })
            res.status(200)
            res.send(results.ops[0])
        } catch (e){
            res.status(500)
            res.send({
                message: "Unable to upload. Please contact us if the problem persists!"
            })
            console.log(e)
        }
    })

    //END OF CREATE

    //START OF DISPLAY

    //fetch info for all posts
    app.get("/show", async (req, res) => {
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
    //fetch info for categories
    app.get("/showCate", async (req, res) => {
        try {
            let temp = await webCategories.collection("web_cats").find().toArray()
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
    //fetch individual posts
    app.get("/show/:_id", async (req, res) => {
        try {
            let temp = await userData.collection("user_details").findOne({
                _id: ObjectId(req.params._id)
            })
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
    //fetch comments
    app.get("/commentsList", async (req, res)=> {
        try {
            let temp = await userComments.collection("user_comments").find().toArray()
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
    //galaxies
    app.get("/galaxies", async (req, res) => {
        try {
            let temp = await userData.collection("user_details").find({
                'user_uploads.details.category': 'Galaxies'
            }).toArray()
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
    //Star Clusters
    app.get("/starcluster", async (req, res) => {
        try {
            let temp = await userData.collection("user_details").find({
                'user_uploads.details.category': 'Star Cluster'
            }).toArray()
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
    //Planetary
    app.get("/planetary", async (req, res) => {
        try {
            let temp = await userData.collection("user_details").find({
                'user_uploads.details.category': 'Planetary'
            }).toArray()
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
    //Nebulae
    app.get("/nebulae", async (req, res) => {
        try {
            let temp = await userData.collection("user_details").find({
                'user_uploads.details.category': 'Nebulae'
            }).toArray()
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
    //Space Craft
    app.get("/spacecraft", async (req, res) => {
        try {
            let temp = await userData.collection("user_details").find({
                'user_uploads.details.category': 'Space Craft'
            }).toArray()
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
    //Others
    app.get("/others", async (req, res) => {
        try {
            let temp = await userData.collection("user_details").find({
                'user_uploads.details.category': 'Others'
            }).toArray()
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

    //END OF DISPLAY


    //deleting
    app.delete("/delete/:_id", async (req, res) => {

        try {
            await userData.collection("user_details").deleteOne({
                _id: ObjectId(req.params._id)
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
    app.put("/update/:id", async (req, res) => {
        try {
            await userData.collection("user_details").updateOne({
                _id: ObjectId(req.params.id)
            }, {
                '$set': {
                    "user_uploads": {
                        "details": {
                            "name": req.body.user_uploads.details.name,
                            "location": req.body.user_uploads.details.location,
                            "pIndex":req.body.user_uploads.details.pIndex,
                            "category":req.body.user_uploads.details.category
                        },
                        "content": {
                            "img": req.body.user_uploads.content.img,
                            "title": req.body.user_uploads.content.title,
                            "equipment": req.body.user_uploads.content.equipment,
                            "processing": req.body.user_uploads.content.processing
                        }
                    },
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