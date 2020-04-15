# Nextjs Kick Starter

## How to use

Download the example [or clone the repo](https://github.com/jermsam/album-nexus.git):

```
https://github.com/jermsam/album-nexus.git your-project-name
```

Move into directory and install dependencies using yarn:

```
cd your-project-name && yarn
```
in your console initialize prisma:

```
prisma init
```


in your prisma/schema.prisma customise your database provider:

```
// e.g
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```


in your prisma/.env customise your database path to point to your desired database:

```
// e.g
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/yourdbname?schema=public"
```


create a new database and then run migrations:

```
yarn migrate
```
update nexus and prisma queries:

```
yarn generate
```

Then check it out:

```
yarn dev
```
And build your awesome App upon it

## The stack for the starter kit

[Next.js](hhttps://nextjs.org/).
[Prisma](https://www.prisma.io/).
[Nexus](https://www.nexusjs.org/).
[chakra-ui](https://chakra-ui.com/).
[Semantic -ui - react](https://react.semantic-ui.com/).

