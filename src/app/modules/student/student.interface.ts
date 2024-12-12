import { Model } from 'mongoose';

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

// Main type
export type TStudent = {
  id: string;
  password: string;
  name: TUserName;
  email: string;
  gender: 'male' | 'female' | 'other';
  age: number;
  dateOfBirth: string;
  avatar?: string;
  contactNo: string;
  bloodGroup?: 'A+' | 'B+' | 'O+' | 'AB+' | 'A-' | 'B-' | 'O-' | 'AB-';
  emmergencyContactNo: string;
  presentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  isActive: 'active' | 'blocked';
  isDeleted: boolean;
};
export interface IUpdateStudentData {
  password?: string;
  name?: Partial<TUserName>; // Allows partial updates for name
  email?: string;
  gender?: 'male' | 'female' | 'other';
  age?: number;
  dateOfBirth?: string;
  avatar?: string;
  contactNo?: string;
  bloodGroup?: 'A+' | 'B+' | 'O+' | 'AB+' | 'A-' | 'B-' | 'O-' | 'AB-';
  emmergencyContactNo?: string;
  presentAddress?: string;
  guardian?: Partial<TGuardian>; // Allows partial updates for guardian
  localGuardian?: Partial<TLocalGuardian>; // Allows partial updates for local guardian
  profileImg?: string;
  isActive?: 'active' | 'blocked';
  isDeleted?: boolean;
}

// custom static method
export interface StudentModelForMethods extends Model<TStudent> {
  doesUserExist(id: string): Promise<TStudent | null>;
}

// // custom instance method
// export type TStudentMethods = {
//   doesUserExist(id: string): Promise<TStudent | null>;
// };

// // Create a new Model type that knows about IUserMethods...
// export type StudentModelForMethods = Model<
//   TStudent,
//   Record<string, never>,
//   TStudentMethods
// >;
