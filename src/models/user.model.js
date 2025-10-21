import { Schema, models, model } from "mongoose";

const UserSchema = new Schema({
  userName: {
    type: String,
    required: [true, "Username is required."],
  },
  firstName: {
    type: String,
    required: [true, "User's first name is required."],
  },
  lastName: {
    type: String,
    required: [true, "User's last name is required."],
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  phone: {
    type: String,
    required: [true, "Phone number is required."],
    validate: {
      validator: function (v) {
        return /^[6-9]\d{9}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  address: {
    type: Schema.ObjectId,
    ref: "Address",
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    validate: {
      validator: function (v) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])(.{6,})$/.test(
          v
        );
      },
      message: (props) =>
        "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
    },
  },
});

export const User = models.User || model("User", UserSchema);


const AddressSchema = new Schema({
  houseNo: {
    type: String,
    required: [true, "House No is required."],
  },
  street: {
    type: String,
    required: [true, "Street is required."],
  },
  addressLine: {
    type: String,
    required: [true, "Address-Line is required."],
  },
  city: {
    type: String,
    required: [true, "City is required."],
  },
  state: {
    type: String,
    required: [true, "State is required."],
  },
  country: {
    type: String,
    required: [true, "Country is required."],
  },
  ZipCode: {
    type: Number,
    min: [99999, "Should be greter then 99999."],
    max: [10000000, "Should be smaller then 10000000"],
    required: [true, "Zip-Code is required."],
  },
});

export const Address = models.Address || model("Address", AddressSchema);