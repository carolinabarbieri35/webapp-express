import { faker } from "@faker-js/faker";
import prisma from "../libs/prismaClient.js";

// Creazione di dati fake sul model category
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

async function main() {
  console.log("Seeder started");

  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // // Prima modalità per popolare la tabella category tramite un ciclo for of e un push dentro l'array
  // const categorieSalvate = [];
  // for (const cat of categoriesData) {
  //   const nuovaCategoria = await prisma.category.create({ data: cat });
  //   categorieSalvate.push(nuovaCategoria);
  // }

  // console.log("Categorie create:", categorieSalvate);

  // //popolamento con dati fake del modello product tramite un ciclo for
  // for (let i = 0; i < 20; i++) {
  //   const categoriaCasuale = faker.helpers.arrayElement(categorieSalvate);

  //   await prisma.product.create({
  //     data: {
  //       name: `${
  //         categoriaCasuale.productVariant
  //       } ${faker.commerce.productAdjective()}`,
  //       description: faker.commerce.productDescription(),
  //       price: faker.commerce.price(),
  //       images: faker.image.urlPicsumPhotos(),
  //       isActive: true,
  //       categoryId: categoriaCasuale.id,
  //     },
  //   });
  // }

  // Seconda modalità per popolamento tabella category tramite Promise.all e map

  const categorieSalvate = await Promise.all(
    categoriesData.map((cat) => prisma.category.create({ data: cat }))
  );

  // Popolamento della tabella product tramite Array.from
  const ProductsData = Array.from({ length: 20 }, () => {
    const cat = faker.helpers.arrayElement(categorieSalvate);
    return {
      name: `${cat.productVariant} ${faker.commerce.productAdjective()}`,
      description: faker.commerce.productDescription,
      price: faker.commerce.price(),
      images: faker.image.urlPicsumPhotos(),
      isActive: true,
      categoryId: cat.id,
    };
  });
  await prisma.product.createMany({ data: productsData });

  console.log("Prodotti db");
}
main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
