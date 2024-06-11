-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dob" TEXT,
ADD COLUMN     "onboarded" BOOLEAN DEFAULT false,
ADD COLUMN     "username" TEXT;

-- CreateTable
CREATE TABLE "ContactForm" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "ContactForm_pkey" PRIMARY KEY ("id")
);
