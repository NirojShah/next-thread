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

