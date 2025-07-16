import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    links: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Link' // Reference to the Link model cuz i want 
        // this is my project its my choice hehehehe
    }]
    
}, 
{
    timestamps: true
}
);

const User = mongoose.model("User", UserSchema);
export default User;