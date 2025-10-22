import { models, model, Schema } from "mongoose";

const ThreadSchema = new Schema({
    uploadedBy:{
        type: Schema.ObjectId,
        requied: [true, "Please mention the _id of user."],
        ref: "User"
    },
    plainText:{
        type: String,
    },
    html:{
        type: String
    }
})

const ThreadContent = new Schema({
    data:{
        type : String,
        required: [true, "Proved the file Base64 data"]
    },
    contentType:{
        type: String,
        required: [true, "ContentType is required."]
    },
    fileName:{
        type: String,
        required:[true, "FileName is required."]
    }
})
