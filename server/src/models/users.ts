import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const COLLECTION = 'users';

const productInBasketSchema: mongoose.Schema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
    quantity: { type: Number, required: true, default: 1 }
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }],
    basket: [productInBasketSchema],
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String }
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enterPassword: string) {
  return await bcryptjs.compare(enterPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

export const userModel = mongoose.model(COLLECTION, userSchema);
