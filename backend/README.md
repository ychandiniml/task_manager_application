
### Generate Prisma Client
After updating your schema, generate the Prisma Client to reflect the changes.
```
npx prisma generate
```

### Create and Apply Migrations

#### Create a New Migration:
Run the following command to create a new migration based on your schema changes:

```
npx prisma migrate dev --name <your_migration_name>
```

#### Apply Migrations:
The migrate dev command automatically applies the migration to your database. If you need to apply migrations manually, you can use:
```
npx prisma migrate deploy
```

### Verify Migration
To check the status of your migrations and ensure everything is applied correctly, you can run:
```
npx prisma migrate status
```