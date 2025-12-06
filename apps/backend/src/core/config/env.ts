export const env = {
  port: Number(process.env.PORT || 3000),
  DATABASE_URL: process.env.DATABASE_URL || "",
  PRISMA_ACCELERATE_URL: process.env.PRISMA_ACCELERATE_URL || "",
};
