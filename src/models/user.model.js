import { Schema, models, model } from "mongoose";

const UserSchema = new Schema({
    userName:{
        type: String,
        required: [true,"user name is requried."]
    },
    firstName:{

    },
    middleName:{

    },
    lastName:{

    },
    email:{

    },
    phone:{

    },
    address:{

    }
})

const AddressSchema = new Schema({
    houseNo:{

    },
    street:{

    },
    
})