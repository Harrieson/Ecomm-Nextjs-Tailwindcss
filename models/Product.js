import mongoose from "mongoose";

const { Schema } = mongoose
mongoose.Promise = global.Promise


const productSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    rating: { type: Number, required: true, defualt: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, defualt: 0 },
    description: { type: String, required: true }
}, {
    timestamps: true
})


// const User = mongoose.model.User || mongoose.model('User', userSchema)
// export default User


module.exports = mongoose.models.Product || mongoose.model('Product', productSchema)