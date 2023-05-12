import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    username : {
        type: String,
        required: true,
    },
    loginId : {
        type: String,
        required: true,
    },
    loginPw : {
        type: String,
        required: true,
    },
    createdAt : {
        type: String,
        required: true,
    },
});

const User = models.User || model('User' , userSchema);

export default User