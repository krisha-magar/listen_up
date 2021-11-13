const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const SongSchema = new Schema ({
   name: {
       type: String,
   },
   singer:{
       type: String,
   },
   composer:{
       type: String,
   },
   uploadedAt:{
       type: Date,
       default: Date.now,
   }, 
});

SongSchema.pre("save", async function (next) {
    if (this.isMomdified("password")) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

module.exports = mongoose.model("Song", SongSchema);

