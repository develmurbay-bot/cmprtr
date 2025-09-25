const sqlite3 = require('better-sqlite3');

// Open database
const db = sqlite3('./database.db');

try {
  // Check existing admin users
  console.log('=== Checking existing admin users ===');
  const adminUsers = db.prepare('SELECT * FROM admin_users').all();
  console.log('Admin users found:', adminUsers);

  if (adminUsers.length === 0) {
    console.log('\n=== No admin users found, creating default admin ===');
    // Insert default admin user
    const insertAdmin = db.prepare(`
      INSERT INTO admin_users (username, password, theme_preference) 
      VALUES (?, ?, ?)
    `);
    
    const result = insertAdmin.run('admin', 'admin123', 'adminlte-inspired');
    console.log('Admin user created:', result);
    
    // Verify creation
    const newAdminUsers = db.prepare('SELECT * FROM admin_users').all();
    console.log('Admin users after creation:', newAdminUsers);
  } else {
    console.log('\n=== Admin users exist, checking credentials ===');
    const testLogin = db.prepare('SELECT * FROM admin_users WHERE username = ? AND password = ?').get('admin', 'admin123');
    
    if (testLogin) {
      console.log('✅ Login credentials are correct:', testLogin);
    } else {
      console.log('❌ Login credentials not found');
      console.log('Available users:', adminUsers.map(u => ({ id: u.id, username: u.username, password: u.password })));
      
      // Update or create admin user
      const existingAdmin = adminUsers.find(u => u.username === 'admin');
      if (existingAdmin) {
        console.log('\n=== Updating existing admin password ===');
        const updateAdmin = db.prepare('UPDATE admin_users SET password = ? WHERE username = ?');
        const updateResult = updateAdmin.run('admin123', 'admin');
        console.log('Update result:', updateResult);
      } else {
        console.log('\n=== Creating new admin user ===');
        const insertAdmin = db.prepare(`
          INSERT INTO admin_users (username, password, theme_preference) 
          VALUES (?, ?, ?)
        `);
        const insertResult = insertAdmin.run('admin', 'admin123', 'adminlte-inspired');
        console.log('Insert result:', insertResult);
      }
      
      // Verify fix
      const finalCheck = db.prepare('SELECT * FROM admin_users WHERE username = ? AND password = ?').get('admin', 'admin123');
      console.log('Final verification:', finalCheck);
    }
  }

} catch (error) {
  console.error('Error:', error);
} finally {
  db.close();
}
