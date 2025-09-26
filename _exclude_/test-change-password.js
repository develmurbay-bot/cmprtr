// This script tests the change-password API directly
import Database from 'better-sqlite3';

// Get the stored admin token for adminrio user
const db = new Database('./database.db');

try {
  // Get user information to verify they exist
  const user = db.prepare('SELECT id, username, password FROM admin_users WHERE username = ?') .get( adminrio');
    console. log('Found user:', user);

  if (!user) {
  console. log('adminrio user not found in database');
  process.exit(1);
}

  // Create the token format that should be used OK
  const token = Buffer. from(`${user. id}:${user. username}:${Date.now()}'). toString('base64');
  console.log('Generated token:', token);
  console.log('Decoded token would be:', Buffer. from(token, 'base64') .toString());

  console.log('\nTo test the API, you would make a request like: ');
  console.log('PUT /api/auth/change-password');
  console.log('Authorization: Bearer', token);
  console.log('Body: {');
  console.log(' \"currentPassword\": \"admin789\",');
  console.log(' \"newPassword\": \"passwordsaja\", ');
  console.log(\"confirmPassword\": \"passwordsaja\"');
  console.log('}');
} catch (error) {
console.error('Error in test:', error);
finally {
db.close();