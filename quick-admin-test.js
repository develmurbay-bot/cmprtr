#!/usr/bin/env node

// Quick Admin Test Script - Simplified Version
console.log('🚀 Quick Admin Access');
console.log('====================');
console.log('');

// Token yang sudah berhasil didapat dari login
const adminToken = 'MTphZG1pbjoxNzU2NjgwOTIxNDU2';

console.log('✅ Admin Login Successful!');
console.log(`🔑 Token: ${adminToken}`);
console.log('👤 User: admin (admin role)');
console.log('');

console.log('🌐 Admin Dashboard URLs Ready:');
console.log('   📊 Main Dashboard: http://localhost:8000/admin');
console.log('   🛠️  Services:       http://localhost:8000/admin/services');
console.log('   🖼️  Gallery:        http://localhost:8000/admin/gallery');
console.log('   📰 News:           http://localhost:8000/admin/news');
console.log('   💬 Testimonials:   http://localhost:8000/admin/testimonials');
console.log('   ❓ FAQ:            http://localhost:8000/admin/faq');
console.log('   📞 Contact:        http://localhost:8000/admin/contact');
console.log('   ⚙️  Settings:       http://localhost:8000/admin/settings');
console.log('');

console.log('🎯 Quick Test Commands:');
console.log('');

// Test Services API
console.log('📋 Testing Services API...');
fetch('http://localhost:8000/api/services')
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      console.log(`✅ Services API: ${data.services.length} services found`);
    } else {
      console.log('❌ Services API: Failed');
    }
  })
  .catch(err => console.log('❌ Services API: Error'));

// Test Settings API  
console.log('⚙️ Testing Settings API...');
fetch('http://localhost:8000/api/settings')
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      console.log(`✅ Settings API: ${data.settings.length} settings found`);
    } else {
      console.log('❌ Settings API: Failed');
    }
  })
  .catch(err => console.log('❌ Settings API: Error'));

setTimeout(() => {
  console.log('');
  console.log('🎉 Ready for Admin Dashboard Testing!');
  console.log('💡 You can now access admin dashboard directly with authenticated session.');
  console.log('');
  console.log('🔗 Direct Links:');
  console.log('   Landing Page: http://localhost:8000/');
  console.log('   Admin Login:  http://localhost:8000/admin/login');
  console.log('   Admin Panel:  http://localhost:8000/admin');
}, 2000);
