# Migration `20191219015646`

This migration has been generated by Skyelar Carroll at 12/19/2019, 1:56:46 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."User" DROP COLUMN "firstName",
ADD COLUMN "firstName" text NOT NULL DEFAULT '' ,
DROP COLUMN "lastName",
ADD COLUMN "lastName" text NOT NULL DEFAULT '' ;

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20191218114642..20191219015646
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
-datasource db {
+datasource postgresql {
     provider = "postgresql"
-    url = "***"
+    url      = env("DB_URL")
 }
 generator photon {
     provider = "photonjs"
@@ -10,13 +10,13 @@
 model User {
     id             String   @default(cuid()) @id
     createdAt      DateTime @default(now())
     updatedAt      DateTime @updatedAt
-    email          String
+    email          String   @unique
     password       String
     username       String
-    firstName      String?
-    lastName       String?
+    firstName      String
+    lastName       String
     state          String?
     city           String?
     zip            Int?
     address        String?
```

