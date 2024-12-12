import { Schema, model } from 'mongoose';

import bcrypt from 'bcrypt';
import {
  StudentModelForMethods,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';
import config from '../../config';
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true,
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
  },
  fatherOccupation: {
    type: String,
  },
  fatherContactNo: {
    type: String,
  },
  motherName: {
    type: String,
  },
  motherOccupation: {
    type: String,
  },
  motherContactNo: {
    type: String,
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
  },
  occupation: {
    type: String,
  },
  contactNo: {
    type: String,
  },
  address: {
    type: String,
  },
});

const studentSchema = new Schema<TStudent, StudentModelForMethods>(
  {
    id: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    name: {
      type: userNameSchema,
    },
    email: {
      type: String,
      unique: true,
    },
    gender: {
      type: String,
    },
    age: {
      type: Number,
    },
    dateOfBirth: {
      type: String,
    },
    avatar: {
      type: String,
    },
    contactNo: {
      type: String,
    },
    bloodGroup: {
      type: String,
    },
    emmergencyContactNo: {
      type: String,
    },
    presentAddress: {
      type: String,
    },
    guardian: {
      type: guardianSchema,
    },
    localGuardian: {
      type: localGuardianSchema,
    },
    profileImg: {
      type: String,
    },
    isActive: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
  },
);
// Kept the trim, unique, and default properties where applicable since they are still useful for schema integrity.
export default studentSchema;

//virtuals
studentSchema.virtual('fullNAme').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

//mongodb middlewares
studentSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});
studentSchema.post('save', function (doc, next) {
  doc.password = '';
  console.log(doc);
  next();
});

// Query middlewares
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } }).select('-password'); // Exclude password field
  next();
});

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } }).select('-password'); // Exclude password field
  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift(
    { $match: { isDeleted: { $ne: true } } }, // Filter deleted students
    { $unset: 'password' }, // Remove password field from results
  );
  next();
});

// creeating custom static method
studentSchema.statics.doesUserExist = async function (id: string) {
  const result = await StudentModel.findOne({ id });
  return result;
};

// // creeating custom instance method
// studentSchema.methods.doesUserExist = async function (id: string) {
//   const result = await StudentModel.findOne({ id });
//   return result;
// };
// model
export const StudentModel = model<TStudent, StudentModelForMethods>(
  'Student',
  studentSchema,
);
