import { connectDB } from "@/lib/mongodb";
import { User, Address } from "../models/user.model";
import { ApiError } from "next/dist/server/api-utils";

export async function CreateUser({
  userName,
  firstName,
  lastName,
  password,
  email,
  phone,
  address,
}) {
  try {
    const isPresent = await User.findOne({
      $or: [{ userName }, { phone }, { email }],
    });
    if (isPresent) {
      throw new ApiError(500, "User already present.");
    }
    const newAddress = await new Address({
      houseNo: address.houseNo,
      street: address.street,
      addressLine: address.addressLine,
      city: address.city,
      state: address.state,
      country: address.country,
      ZipCode: address.ZipCode,
    });
    let newUser;
    if (newAddress) {
      newUser = await new User({
        userName,
        firstName,
        lastName,
        password,
        email,
        phone,
        address: newAddress._id,
      });
      await newUser.save();
    }

    if (newUser) {
      await newAddress.save();
    }

    return newUser;
  } catch (error) {
    throw error;
  }
}

export async function AllUsers() {
  try {
    const allUsers = await User.find().select("-password -address -phone -_id");
    return allUsers;
  } catch (err) {
    throw new Error(err.message);
  }
}


export async function UserInfo(email) {
  try {
    const userInfo = await User.findOne({ email })
      .select("-id -password")
      .populate("address")
      .select("-_id");
    return userInfo;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function UpdateUser(email, data) {
  try {
    const updateUser = await User.findOneAndUpdate(
      { email },
      { $set: data },
      {
        new: true
      }
    ).exec();
    return updateUser;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function DeactivateUser(email){
  try{
    await User.findOneAndDelete({
      email
    })
    return true;
  }catch(err){
    throw new Error(err)
  }
}