require("dotenv").config();
require("module-alias/register");

const queueService = require("@/services/queue.service");
const handlers = require("@/jobs");

const processJob = async (job) => {
  const handler = handlers[job.name];
  if (handler) {
    try {
      await queueService.update(job.id, { status: "processing" });
      handler({ ...job, payload: JSON.parse(job.payload) });
      await queueService.update(job.id, { status: "done" });
    } catch (error) {
      console.error(error);
      await queueService.update(job.id, {
        status: job.retry_count < job.max_retries ? "failed" : "done",
      });
    }
  }
};

const processQueue = async () => {
  while (true) {
    const pendingJobs = await queueService.getByStatus("pending");
    for (const job of pendingJobs) {
      await processJob(job);
    }

    const rejectedJobs = await queueService.getByStatus("failed");
    for (const job of rejectedJobs) {
      const toRetry = job.retry_count < job.max_retries && new Date() - job.updated_at >= 4000;
      if (toRetry) {
        await queueService.update(job.id, {
          status: "pending",
          retry_count: job.retry_count + 1,
        });
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
};

processQueue();
