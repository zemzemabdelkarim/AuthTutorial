import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username:{
    type: String,
    required: true,
    unique: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true,
  },
  profilePicture:{
    type: String,
    default: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.TpqSE-tsrMBbQurUw2Su-AHaHk%26pid%3DApi&f=1&ipt=d7ff89b5838cfc90ea78629a2b8269627a73be75f6ee9906027af40f9acec54d&ipo=images"
  }
  
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;