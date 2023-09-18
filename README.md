# Ecommerce (Next.js)

1. Create a next.js app

```
npx create-next-app@latest
```

2. Install all the dependencies

```
npm i daisyui prisma @prisma/client next-auth @auth/prisma-adapter zod
```

3. Reconfigure `tailwind.config.ts`, and remove all tailwind classes in `globals.css`

```ts
  // ...
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        lightTheme: {
          primary: '#f4aa3a',
          secondary: '#f4f4a1',
          accent: '#1be885',
          neutral: '#272136',
          'base-100': '#ffffff',
          info: '#778ad4',
          success: '#23b893',
          warning: '#f79926',
          error: '#ea535a',
          body: {
            'background-color': '#e3e6e6',
          },
        },
      },
    ],
  },
```

4. Create a database collection in MongoDB Atlas

You may also create some dummy data for now

Database: **ecommerce**

Collection: **products**

_(Insert Document)_

```sh
{
  "_id": ObjectId("6508959129e9f8bc06b4b82d")
  "name": "Product Name"
  "description": "Product Description"
  "imageUrl": "https://product-image.com"
  "price": 999
}
```

5. Back in VS Code, configure Prisma

```
npx prisma init
```

This will create a `.env` file with some placeholder in it.

Go to MongoDB Atlas Database Deployments and Select the `Connect` button to access the _connection string_ in the `Drivers` tab.

_`.env`_

```
DATABASE_URL="mongodb+srv://<username>:<password>@cluster0.mutozqs.mongodb.net/<database_name>?retryWrites=true&w=majority"
```

Don't forget to add this `.env` file to `.gitignore`.

Notice that this command also creates the `prisma` folder in our root directory.

Its default is the database `postgresql`, but since we're using _`MongoDB`_, we change it to `mongodb`.

_`schema.prisma`_

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}
```

6. Back in VS Code, pull the data you inserted

```
npx prisma db pull
```

This updates your `schema.prisma`. All the data was pulled to your local machine.

7. It would be nice if we have timestamps for _createdAt_ and _updatedAt_. Also, modify the model name such that it's capitalized, and singular in form.

_schema.prisma_

```prisma
model Product {
  // ...
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("products")
}
```

Push your changes to the prisma / mongodb

```
npx prisma db push
```

8. Generate the Prisma Client

```
npx prisma generate
```

Inside the `src` folder, create a new file in `lib/db/prisma.ts`

_emmet: pcg_

```ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

9. You may now delete your dummy product in MongoDB (that was just used for introspection)
