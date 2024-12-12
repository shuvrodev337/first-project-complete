import { IUpdateStudentData, TStudent } from './student.interface';
import { StudentModel } from './student.model';

const createStudentIntoDB = async (student: TStudent) => {
  if (await StudentModel.doesUserExist(student.id)) {
    throw new Error('Student already exists');
  }

  const result = await StudentModel.create(student); // built in static method

  // // applying custom instance method
  // const studentInstance = new StudentModel(student);

  // if (await studentInstance.doesUserExist(student.id)) {
  //   throw new Error('Student already exists');
  // }
  // const result = await studentInstance.save();

  return result;
};
const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};
const getSingleStudentFromDB = async (studentID: string) => {
  const result = await StudentModel.find({ id: studentID });
  return result;
};
const updateSingleStudentFromDB = async (
  studentID: string,
  updateData: IUpdateStudentData,
) => {
  const result = await StudentModel.findOneAndUpdate(
    { id: studentID, isDeleted: { $ne: true } },
    { $set: updateData },
    { new: true }, //returns new modified document
  );

  return result;
};
const deleteSingleStudentFromDB = async (studentID: string) => {
  const result = await StudentModel.updateOne(
    { id: studentID },
    { isDeleted: true },
  );
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateSingleStudentFromDB,
  deleteSingleStudentFromDB,
};
