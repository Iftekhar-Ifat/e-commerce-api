import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { ProductStatus } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  // Seed Users
  for (let i = 0; i < 10; i++) {
    await prisma.user.create({
      data: {
        id: faker.string.uuid(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    });
  }

  // Seed Categories
  for (let i = 0; i < 10; i++) {
    await prisma.category.create({
      data: {
        id: faker.string.uuid(),
        category: faker.commerce.department(),
      },
    });
  }

  // Seed Brands
  for (let i = 0; i < 10; i++) {
    await prisma.brand.create({
      data: {
        id: faker.string.uuid(),
        brand: faker.company.name(),
      },
    });
  }

  // get Product uuid
  const categoryUUID = await prisma.category.findMany({
    select: {
      id: true,
    },
  });

  // get Brand uuid
  const brandUUID = await prisma.brand.findMany({
    select: {
      id: true,
    },
  });

  // Seed Products
  for (let i = 0; i < 10; i++) {
    await prisma.product.create({
      data: {
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        image_url: faker.image.url(),
        category_id: categoryUUID[i].id,
        brand_id: brandUUID[i].id,
        status: i % 2 ? ProductStatus.ACTIVE : ProductStatus.INACTIVE,
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
