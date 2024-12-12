import { Request, Response } from 'express';
import { StudentServices } from './student.services';
import studentValidationSchema, {
  updateStudentSchema,
} from './student.validation';
// import studentJoiValidationSchema from './student.joi.validation';

// Validation using zod
const createStudent = async (req: Request, res: Response) => {
  try {
    const { student } = req.body;
    const zodParsedData = studentValidationSchema.parse(student);
    const result = await StudentServices.createStudentIntoDB(zodParsedData);

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'An unexpected error occurred',
      error: error,
    });
  }
};
// Validate using Joi
// const createStudent = async (req: Request, res: Response) => {
//   try {
//     const { student } = req.body;
//     const { error, value: validatedStudent } =
//       studentJoiValidationSchema.validate(student);

//     if (error) {
//       // Respond with validation errors // return is important
//       return res.status(400).json({
//         success: false,
//         message: 'Validation failed',
//         errors: error.details,
//       });
//     }

//     // Proceed to create the student only if validation passes
//     const result = await StudentServices.createStudentIntoDB(validatedStudent);

//     res.status(201).json({
//       success: true,
//       message: 'Student created successfully',
//       data: result,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'An unexpected error occurred',
//       error: error,
//     });
//   }
// };
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Students retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'An unexpected error occurred',
      error: error,
    });
  }
};
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentID } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentID);
    res.status(200).json({
      success: true,
      message: 'Student retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'An unexpected error occurred',
      error: error,
    });
  }
};
const updateSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentID } = req.params;
    const { updatedStudent } = req.body;
    const validatedData = updateStudentSchema.parse(updatedStudent);
    const result = await StudentServices.updateSingleStudentFromDB(
      studentID,
      validatedData,
    );
    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'An unexpected error occurred',
      error: error,
    });
  }
};

const deleteSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentID } = req.params;
    const result = await StudentServices.deleteSingleStudentFromDB(studentID);
    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'An unexpected error occurred',
      error: error,
    });
  }
};
export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  updateSingleStudent,
  deleteSingleStudent,
};
