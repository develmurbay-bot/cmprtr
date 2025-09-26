// Test script untuk password change functionality
const BASE_URL = 'http://localhost:8000';

async function testPasswordChange() {
  console.log('🔧 Testing Password Change Functionality...\n');

  try {
    // 1. Login sebagai admin
    console.log('1. Login sebagai admin...');
    const loginResponse = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'admin123'
      })
    });

    const loginData = await loginResponse.json();
    console.log('   Login response:', loginData);

    if (!loginData.success) {
      throw new Error('Login failed');
    }

    // 2. Test change password
    console.log('\n2. Testing password change...');
    const changePasswordResponse = await fetch(`${BASE_URL}/api/auth/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginData.token}`
      },
      body: JSON.stringify({
        currentPassword: 'admin123',
        newPassword: 'newadmin123',
        confirmPassword: 'newadmin123'
      })
    });

    const changePasswordData = await changePasswordResponse.json();
    console.log('   Change password response:', changePasswordData);

    // 3. Test login dengan password baru
    console.log('\n3. Testing login with new password...');
    const newLoginResponse = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'newadmin123'
      })
    });

    const newLoginData = await newLoginResponse.json();
    console.log('   New login response:', newLoginData);

    // 4. Kembalikan password ke semula
    console.log('\n4. Restoring original password...');
    const restoreResponse = await fetch(`${BASE_URL}/api/auth/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${newLoginData.token}`
      },
      body: JSON.stringify({
        currentPassword: 'newadmin123',
        newPassword: 'admin123',
        confirmPassword: 'admin123'
      })
    });

    const restoreData = await restoreResponse.json();
    console.log('   Restore password response:', restoreData);

    console.log('\n✅ Password change functionality test completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

async function createPetugasUser() {
  console.log('\n🔧 Creating Petugas User...\n');

  try {
    // 1. Login sebagai admin
    console.log('1. Login sebagai admin...');
    const loginResponse = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'admin123'
      })
    });

    const loginData = await loginResponse.json();
    console.log('   Login response:', loginData);

    if (!loginData.success) {
      throw new Error('Login failed');
    }

    // 2. Create petugas user
    console.log('\n2. Creating petugas user...');
    const createUserResponse = await fetch(`${BASE_URL}/api/admin/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginData.token}`
      },
      body: JSON.stringify({
        username: 'petugas',
        password: 'petugas123',
        email: 'petugas@murbaykonveksi.com',
        full_name: 'Staff Petugas',
        role_id: 2 // petugas role
      })
    });

    const createUserData = await createUserResponse.json();
    console.log('   Create user response:', createUserData);

    // 3. Test login petugas
    console.log('\n3. Testing petugas login...');
    const petugasLoginResponse = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'petugas',
        password: 'petugas123'
      })
    });

    const petugasLoginData = await petugasLoginResponse.json();
    console.log('   Petugas login response:', petugasLoginData);

    console.log('\n✅ Petugas user creation test completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run tests
async function runAllTests() {
  console.log('🚀 Starting Admin System Tests...\n');
  
  await testPasswordChange();
  await createPetugasUser();
  
  console.log('\n🎉 All tests completed!');
}

runAllTests();
