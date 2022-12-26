import { IsString, IsNotEmpty, IsNumber, MaxLength } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly name: string;
  @IsNumber()
  @IsNotEmpty()
  readonly rollNumber: number;
  @IsNumber()
  @IsNotEmpty()
  readonly standerd: number;
  @IsString()
  @IsNotEmpty()
  readonly gender: string;
  @IsNumber()
  @IsNotEmpty()
  readonly marks: number;
}
