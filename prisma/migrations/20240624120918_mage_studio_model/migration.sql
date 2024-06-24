-- CreateTable
CREATE TABLE "ImageStudio" (
    "id" TEXT NOT NULL,
    "app_tag" TEXT NOT NULL,
    "img_str" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "ImageStudio_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ImageStudio" ADD CONSTRAINT "ImageStudio_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
