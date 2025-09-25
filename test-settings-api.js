const Database = require('better-sqlite3');
const path = require('path');

// Initialize database
const dbPath = path.join(process.cwd(), 'database.db');
const db = new Database(dbPath);

try {
  // Query settings
  const rows = db.prepare('SELECT key, value FROM settings').all();
  
  console.log('Raw database rows:');
  console.log(rows.slice(0, 3)); // Show first 3 rows
  
  // Convert to settings object
  const dbSettings = {};
  rows.forEach(row => {
    try {
      // Try to parse as JSON, fallback to string
      dbSettings[row.key] = JSON.parse(row.value);
    } catch {
      dbSettings[row.key] = row.value;
    }
  });
  
  // Convert to array format
  const settingsArray = Object.entries(dbSettings).map(([key, value]) => ({ key, value }));
  
  // Create response object
  const response = {
    success: true,
    settings: settingsArray.slice(0, 3), // Show first 3 settings
    message: 'Settings retrieved successfully'
  };
  
  console.log('\nResponse object:');
  console.log(response);
  
  console.log('\nJSON stringified:');
  console.log(JSON.stringify(response, null, 2));
  
} catch (error) {
  console.error('Error:', error);
} finally {
  db.close();
}
