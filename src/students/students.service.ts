import { Injectable } from '@nestjs/common/decorators';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStudentDto } from './dto/create_studentDto';
import { UpdateStudentDto } from './dto/update._studentDto';
import { Student, StudentDocument } from './schema/student.schema';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
  ) {}

  //creating new student

  async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    const newStudent = await new this.studentModel(createStudentDto);

    return newStudent.save(); // save new student
  }

  //getting all students

  async getAllStudents(): Promise<Student[]> {
    const studentData = await this.studentModel.find();
    if (!studentData || studentData.length === 0) {
      throw new NotFoundException('Student Data not found');
    }
    return studentData;
  }
  //getting by id
  /* async getStudent(studentId: string): Promise<Student> {
    const exintingStudent = await this.studentModel.findById(studentId);
    if (!existingStudent) {
      throw new NotFoundException(`Student ${studentId} not found`);
    }
    return exintingStudent;
  }
 */
  //updating student

  async updateStudent(
    studentId: string,
    updateStudentDto: UpdateStudentDto,
  ) :Promise<Student>{
    const updatedStudent = await this.studentModel.findByIdAndUpdate(
      {_id:studentId},
    {name: updateStudentDto.name,
        rollNumber: updateStudentDto.rollNumber,
        standerd: updateStudentDto.standerd,
        gender: updateStudentDto.gender,
        marks: updateStudentDto.marks,},
      { new: true },
    );
    if (!updatedStudent) {
      throw new NotFoundException(`Student ${studentId} no found`);
    }
    return updatedStudent;
  }

  //deleting student by Id

  async deleteStudent(studentId: string): Promise<Student> {
    const deletedStudent = await this.studentModel.findByIdAndDelete(studentId);
    if (!deletedStudent) {
      throw new NotFoundException(
        `Student ${studentId} not found may be deleted already`,
      );
    }
    return deletedStudent;
  }
}
