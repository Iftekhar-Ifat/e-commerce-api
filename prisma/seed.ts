import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const main = async () => {
  // Seed Users
  for (let i = 0; i < 10; i++) {
    const userRole = i % 2 ? 'admin' : 'user';
    await prisma.users.create({
      data: {
        id: faker.string.uuid(),
        name: faker.person.firstName() + faker.person.lastName(),
        role: userRole,
      },
    });
  }

  // Seed Categories
  for (let i = 0; i < 10; i++) {
    await prisma.categories.create({
      data: {
        id: faker.string.uuid(),
        category: faker.commerce.department(),
      },
    });
  }

  // Seed Brands
  for (let i = 0; i < 10; i++) {
    await prisma.brands.create({
      data: {
        id: faker.string.uuid(),
        brand: faker.company.name(),
      },
    });
  }

  // get Product uuid
  const categoryUUID = await prisma.categories.findMany({
    select: {
      id: true,
    },
  });

  // get Brand uuid
  const brandUUID = await prisma.brands.findMany({
    select: {
      id: true,
    },
  });

  // Seed Products
  for (let i = 0; i < 10; i++) {
    await prisma.products.create({
      data: {
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        image_url: faker.image.url(),
        category_id: categoryUUID[i].id,
        brand_id: brandUUID[i].id,
        price: faker.number.int({ min: 10, max: 100 }),
        discounted_price: faker.number.int({ min: 5, max: 50 }),
        availability: faker.datatype.boolean(),
        quantity: faker.number.int({ min: 1, max: 100 }),
      },
    });
  }

  await prisma.$disconnect();
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
