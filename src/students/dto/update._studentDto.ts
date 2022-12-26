import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create_studentDto';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {}
