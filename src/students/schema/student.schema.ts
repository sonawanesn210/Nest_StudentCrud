import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type StudentDocument = Student & Document;

@Schema()
export class Student {
  @Prop()
  name: string;
  @Prop()
  rollNumber: number;
  @Prop()
  standerd: number;
  @Prop()
  gender: string;
  @Prop()
  marks: number;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
