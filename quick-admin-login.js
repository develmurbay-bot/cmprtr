#!/usr/bin/env node

// Quick Admin Login Script
// Usage: node quick-admin-login.js

const https = require('http');

async function quickLogin() {
  console.log('🚀 Quick Admin Login Script');
  console.log('================================');
  
  // Login credentials
  const loginData = {
    username: 'admin',
    password: 'admin123'
  };

  console.log('📝 Attempting login with credentials:');
  console.log(`   Username: ${loginData.username}`);
  console.log(`   Password: ${loginData.password}`);
  console.log('');

  try {
    // Step 1: Login via API
    console.log('🔐 Step 1: Logging in via API...');
    
    const loginResponse = await fetch('http://localhost:8000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData)
    });

    const loginResult = await loginResponse.json();
    
    if (loginResult.success) {
      console.log('✅ Login successful!');
      console.log(`   Token: ${loginResult.token}`);
      console.log(`   User: ${loginResult.user.username} (${loginResult.user.role})`);
      console.log('');
      
      // Step 2: Verify token
      console.log('🔍 Step 2: Verifying token...');
      
      const verifyResponse = await fetch('http://localhost:8000/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${loginResult.token}`
        }
      });

      const verifyResult = await verifyResponse.json();
      
      if (verifyResult.success) {
        console.log('✅ Token verification successful!');
        console.log(`   Valid user: ${verifyResult.user.username}`);
        console.log('');
        
        // Step 3: Access admin dashboard
        console.log('🎯 Step 3: Ready to access admin dashboard!');
        console.log('');
        console.log('🌐 Admin Dashboard URLs:');
        console.log('   Main Dashboard: http://localhost:8000/admin');
        console.log('   Services:       http://localhost:8000/admin/services');
        console.log('   Gallery:        http://localhost:8000/admin/gallery');
        console.log('   News:           http://localhost:8000/admin/news');
        console.log('   Testimonials:   http://localhost:8000/admin/testimonials');
        console.log('   FAQ:            http://localhost:8000/admin/faq');
        console.log('   Contact:        http://localhost:8000/admin/contact');
        console.log('   Settings:       http://localhost:8000/admin/settings');
        console.log('');
        console.log('💡 Token for manual testing:');
        console.log(`   ${loginResult.token}`);
        console.log('');
        console.log('🎉 Ready for testing! You can now access admin dashboard directly.');
        
      } else {
        console.log('❌ Token verification failed:', verifyResult.error);
      }
      
    } else {
      console.log('❌ Login failed:', loginResult.error);
      console.log('');
      console.log('📋 Available test accounts:');
      console.log('   Admin: admin / admin123');
      console.log('   Staff: petugas / petugas123');
    }
    
  } catch (error) {
    console.log('❌ Error during login process:', error.message);
    console.log('');
    console.log('🔧 Troubleshooting:');
    console.log('   1. Make sure the server is running on port 8000');
    console.log('   2. Check if the API endpoints are working');
    console.log('   3. Verify the database is initialized');
  }
}

// Run the script
quickLogin();
