import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Res,
  Delete,
} from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { Response } from 'express';
import { CreateStudentDto } from './dto/create_studentDto';
import { UpdateStudentDto } from './dto/update._studentDto';
import { StudentService } from './students.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async createStudent(
    @Res() res:Response,
    @Body() createStudentDto: CreateStudentDto,
  ) {
    try {
      const newStudent = await this.studentService.createStudent(
        createStudentDto,
      );
      return res.status(HttpStatus.CREATED).json({
        message: 'Student has been created successfully',
        Data: newStudent,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error Student not created',
        error: 'Bad Request',
      });
    }
  }

  @Get()
  async getAllStudents(@Res() res:Response) {
    try {
      const studentData = await this.studentService.getAllStudents();
      return res.status(HttpStatus.OK).json({
        message: 'Students Data',
        studentData,
      });
    } catch (err) {
      return res.status(err.status).json(err.response);
    }
  }

  @Put(':id')
  async updateStudent(
    @Res() res:Response,
    @Param('id') studentId: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    try {
      const existing = await this.studentService.updateStudent(studentId,updateStudentDto);
      return res.status(HttpStatus.OK).json({
        message: 'Updated Students Data',
        existing,
      });
    } catch (err) {
      return res.status(err.status).json(err.response);
    }
  }

  @Delete(':id')
  async deleteStudent(@Res() response, @Param('id') studentId: string) {
    try {
      const deleting = await this.studentService.deleteStudent(studentId);
      return response.status(HttpStatus.OK).json({
        message: 'Student deleted successfully',
        deleting,
      });
    } catch (err) {}
  }
}
