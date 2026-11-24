import { faker } from "@faker-js/faker";
import prisma from "../libs/prismaClient.js";

async function main() {
  console.log("Seeder started");
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

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
      skinType: "Normale",
    },
    {
      name: "Capelli",
      brand: "Essenza",
      productVariant: "Maschera",
      ingredient: "Cheratina",
      skinType: "Normale",
    },
  ];

  const categorieSalvate = [];
  for (const cat of categoriesData) {
    const nuovaCategoria = await prisma.category.create({ data: cat });
    categorieSalvate.push(nuovaCategoria);
  }

  console.log("Categorie create:", categorieSalvate);

  for (let i = 0; i < 20; i++) {
    const categoriaCasuale = faker.helpers.arrayElement(categorieSalvate);

    await prisma.product.create({
      data: {
        name: `${
          categoriaCasuale.productVariant
        } ${faker.commerce.productAdjective()}`,
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        images: faker.image.urlPicsumPhotos(),
        isActive: true,
        categoryId: categoriaCasuale.id,
      },
    });
  }

  console.log("Prodotti db");
}
main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
