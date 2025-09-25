const fs = require('fs');
const path = require('path');

// Read the DATABASE_TYPE from environment variables or .env.local
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const databaseType = process.env.DATABASE_TYPE || 'sqlite';
const schemaDir = path.join(__dirname, '../prisma');

console.log(`Setting up Prisma schema for database type: ${databaseType}`);

// Map database type to schema file
const schemaFileMap = {
  'sqlite': 'schema.sqlite.prisma',
  'mysql': 'schema.mysql.prisma',
  'postgresql': 'schema.postgresql.prisma',
  'pg': 'schema.postgresql.prisma', // alias
};

// Determine which schema file to use
const schemaFile = schemaFileMap[databaseType.toLowerCase()];

if (!schemaFile || !fs.existsSync(path.join(schemaDir, schemaFile))) {
  console.error(`Error: No schema file found for database type: ${databaseType}`);
  console.error('Available database types: sqlite, mysql, postgresql');
  process.exit(1);
}

// Copy the appropriate schema file to the default schema.prisma
const sourceFile = path.join(schemaDir, schemaFile);
const targetFile = path.join(schemaDir, 'schema.prisma');

// Read the source schema file content
const schemaContent = fs.readFileSync(sourceFile, 'utf8');

// Write the content to the target schema.prisma file
fs.writeFileSync(targetFile, schemaContent);

console.log(`Successfully set up Prisma schema for ${databaseType}`);
console.log(`Schema file: ${targetFile}`);
console.log('');
console.log('You can now run Prisma commands:');
console.log('  npx prisma generate');
console.log('  npx prisma db push');
console.log('  npx prisma migrate dev');
console.log('  npx prisma studio');