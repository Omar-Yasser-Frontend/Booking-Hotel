const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: [3, "username is too short"],
      maxLength: [75, "username is too long"],
    },
    email: {
      type: String,
      maxLength: [75, "email is too short"],
      required: true,
      unique: true,
    },
    role: { type: String, default: "user", required: true },
    image: {
      type: String,
      maxLength: [200, "email is too short"],
    },
    password: { type: String, required: [true, "Password is required"] },
    passwordUpdatedAt: Date,
    isActive: { type: Boolean, default: false },
    confirmationToken: {
      token: { type: String },
      expiresAt: { type: Date },
    },
    deactiveate: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
  }
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
