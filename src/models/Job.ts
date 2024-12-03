import mongoose,{ Document, Schema } from "mongoose";

export interface JobDocument extends Document {
  company: string;
  position: string;
  salary: string;
  status: string;
  note: string;
}


const JobSchema = new Schema<JobDocument>({
  company: { type: String, default: "" },
  position: { type: String, default: "" },
  salary: { type: String, default: "" },
  status: { type: String, default: "" },
  note: { type: String, default: "" }
}, { timestamps: true });


export default mongoose.model<JobDocument>("Job", JobSchema);
