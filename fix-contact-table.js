const sqlite3 = require('better-sqlite3');

// Open the database
const db = sqlite3('./database.db');

try {
  console.log('Starting database migration...');
  
  // Check if phone column exists
  const tableInfo = db.prepare("PRAGMA table_info(contact)").all();
  const columns = tableInfo.map(col => col.name);
  
  console.log('Current columns:', columns);
  
  // Add phone column if it doesn't exist
  if (!columns.includes('phone')) {
    console.log('Adding phone column...');
    db.exec('ALTER TABLE contact ADD COLUMN phone TEXT');
  }
  
  // Add subject column if it doesn't exist
  if (!columns.includes('subject')) {
    console.log('Adding subject column...');
    db.exec('ALTER TABLE contact ADD COLUMN subject TEXT');
  }
  
  // Add response_message column if it doesn't exist
  if (!columns.includes('response_message')) {
    console.log('Adding response_message column...');
    db.exec('ALTER TABLE contact ADD COLUMN response_message TEXT');
  }
  
  // Verify the changes
  const updatedTableInfo = db.prepare("PRAGMA table_info(contact)").all();
  console.log('Updated table structure:');
  updatedTableInfo.forEach(col => {
    console.log(`- ${col.name}: ${col.type} ${col.notnull ? 'NOT NULL' : ''} ${col.dflt_value ? `DEFAULT ${col.dflt_value}` : ''}`);
  });
  
  console.log('Database migration completed successfully!');
  
} catch (error) {
  console.error('Migration failed:', error);
} finally {
  db.close();
}
