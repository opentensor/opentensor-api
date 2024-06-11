-- CreateTable
CREATE TABLE "ComputeJobs" (
    "email" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ComputeJobs_jobId_key" ON "ComputeJobs"("jobId");
