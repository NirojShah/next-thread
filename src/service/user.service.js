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
}
// ,session
) {
  try {
    const isPresent = await User.findOne({
      $or: [{ userName }, { phone }, { email }],
    })
    // .session(session);
    if (isPresent) {
      throw new ApiError(500, "User already present.");
    }

    const newAddress = await Address.create(
      [
        {
          houseNo: address.houseNo,
          street: address.street,
          addressLine: address.addressLine,
          city: address.city,
          state: address.state,
          country: address.country,
          ZipCode: address.ZipCode,
        },
      ],
      // { session }
    );

    const newUser = await User.create(
      [
        {
          userName,
          firstName,
          lastName,
          password,
          email,
          phone,
          address: newAddress[0]._id,
        },
      ],
      // { session }
    );
    console.log(newUser)
    return newUser[0];


  } catch (error) {
    throw error;
  }
}
