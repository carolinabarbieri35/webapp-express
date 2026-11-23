import prisma from "../libs/prismaClient.js";

async function main() {
  console.log("Seeder started");
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
