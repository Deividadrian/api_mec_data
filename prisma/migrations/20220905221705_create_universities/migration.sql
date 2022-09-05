-- CreateTable
CREATE TABLE "universities" (
    "id" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "universities_pkey" PRIMARY KEY ("id")
);
