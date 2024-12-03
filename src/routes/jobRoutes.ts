import Router from "koa-router";
import Job from "../models/Job";

const router = new Router();

interface JobUpdateRequest {
    id?:number
    company?: string;
    position?: string;
    salary?: string;
    status?: string;
    note?: string;
  }
  

router.get("/jobs", async (ctx) => {
  try {
    const jobs = await Job.find();
    ctx.status = 200;
    ctx.body = jobs;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Error fetching jobs" };
  }
});


router.post("/jobs", async (ctx) => {
    const body = ctx.request.body as { company: string; position: string; salary: string; status: string; note: string };
    
    const { company, position, salary, status, note } = body;
  
    const newJob = new Job({ company, position, salary, status, note });
    try {
      const savedJob = await newJob.save();
      ctx.status = 201;
      ctx.body = savedJob;
    } catch (error) {
      console.error("Error adding job:", error);
      ctx.status = 500;
      ctx.body = { message: "Error adding job" };
    }
  });
  


  router.put("/jobs/:id", async (ctx) => {
    const updateData = ctx.request.body as JobUpdateRequest
  
    if (!updateData) {
      ctx.status = 400;
      ctx.body = { message: "Invalid request body" };
      return;
    }
  
    try {
      console.log(updateData);
      
      const updatedJob = await Job.findByIdAndUpdate(ctx.params.id, updateData, { new: true });
      if (!updatedJob) {
        ctx.status = 404;
        ctx.body = { message: "Job not found" };
        return;
      }
      ctx.status = 200;
      ctx.body = updatedJob;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { message: "Error updating job" };
    }
  });


router.delete("/jobs/:id", async (ctx) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(ctx.params.id);
    if (!deletedJob) {
      ctx.status = 404;
      ctx.body = { message: "Job not found" };
      return;
    }
    ctx.status = 204;
    ctx.body = null;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Error deleting job" };
  }
});

export default router;
