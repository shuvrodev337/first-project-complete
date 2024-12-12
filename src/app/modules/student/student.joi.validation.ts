import Joi from 'joi';

// joi validations. can use custom messages for custom errors too, use chat gpt or doc to know.
const userNameJoiValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .regex(/^[A-Z][a-z]*$/)
    .required(),
  middleName: Joi.string().trim().max(20).optional(),
  lastName: Joi.string()
    .trim()
    .regex(/^[A-Za-z]+$/)
    .required(),
});

const guardianJoiValidationSchema = Joi.object({
  fatherName: Joi.string().trim().max(30).required(),
  fatherOccupation: Joi.string().trim().max(30).required(),
  fatherContactNo: Joi.string()
    .trim()
    .pattern(/^\d{10,15}$/)
    .required(),
  motherName: Joi.string().trim().max(30).required(),
  motherOccupation: Joi.string().trim().max(30).required(),
  motherContactNo: Joi.string()
    .trim()
    .pattern(/^\d{10,15}$/)
    .required(),
});

const localGuardianJoiValidationSchema = Joi.object({
  name: Joi.string().trim().max(30).required(),
  occupation: Joi.string().trim().max(30).required(),
  contactNo: Joi.string()
    .trim()
    .pattern(/^\d{10,15}$/)
    .required(),
  address: Joi.string().trim().max(100).required(),
});

const studentJoiValidationSchema = Joi.object({
  id: Joi.string().trim().max(10).required(),
  password: Joi.string().min(8).required(),
  name: userNameJoiValidationSchema.required(),
  email: Joi.string().trim().email().required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  age: Joi.number().min(1).max(150).required(),
  dateOfBirth: Joi.string().trim().required(),
  avatar: Joi.string().trim().optional(),
  contactNo: Joi.string()
    .trim()
    .pattern(/^\d{10,15}$/)
    .required(),
  bloodGroup: Joi.string().valid(
    'A+',
    'B+',
    'O+',
    'AB+',
    'A-',
    'B-',
    'O-',
    'AB-',
  ),
  emmergencyContactNo: Joi.string()
    .trim()
    .pattern(/^\d{10,15}$/)
    .required(),
  presentAddress: Joi.string().trim().max(100).required(),
  guardian: guardianJoiValidationSchema.required(),
  localGuardian: localGuardianJoiValidationSchema.required(),
  profileImg: Joi.string().trim().optional(),
  isActive: Joi.string().valid('active', 'blocked').required(),
  isDeleted: Joi.boolean().optional().default(false),
});

export default studentJoiValidationSchema;
