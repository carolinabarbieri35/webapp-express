import prisma from "../libs/prismaClient.js";

async function main() {
  console.log("Seeder started");

  const categoriesData = [
    {
      name: "Skincare Viso",
      brand: "Lumina Beauty",
      productVariant: "Siero",
      ingredient: "Acido Ialuronico, Vitamina C, Niacinamide",
      skinType: "Secca",
    },
    {
      name: "Make-up",
      brand: "Velvet Cosmetics",
      productVariant: "Rossetto",
      ingredient: "Olio Jojoba, Burro di Karitè, Pigmenti naturali",
      skinType: "Tutte",
    },
    {
      name: "Detersione",
      brand: "PureSkin",
      productVariant: "Gel Detergente",
      ingredient: "Acido Salicidico, Estratto di Camomilla, Aloe vera",
      skinType: "Mista e Grassa",
    },
    {
      name: "Corpo e Benessere",
      brand: "SilkHair",
      productVariant: "Maschera",
      ingredient: "Cheratina Vegetale, Olio di Argan, Biotina",
      skintype: "Normale",
    },
  ];
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
