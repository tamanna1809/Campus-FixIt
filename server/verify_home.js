import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:8000/api';
const email = `home_test_${Date.now()}@test.com`;
const password = 'password123';
let token = '';

async function run() {
  try {
    // 1. Register/Login
    await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Home Test', email, password })
    });

    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const loginData = await loginRes.json();
    token = loginData.token;

    // 2. Create Old Issue
    console.log('Creating Issue 1...');
    await fetch(`${BASE_URL}/issues/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': token },
      body: JSON.stringify({ title: 'Issue 1', description: 'Old', category: 'General', location: 'A' })
    });

    // Wait a bit to ensure timestamp diff (though DB is usually fast enough, just in case)
    await new Promise(r => setTimeout(r, 1000));

    // 3. Create New Issue
    console.log('Creating Issue 2...');
    await fetch(`${BASE_URL}/issues/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': token },
      body: JSON.stringify({ title: 'Issue 2', description: 'New', category: 'General', location: 'B' })
    });

    // 4. Fetch Mine
    console.log('Fetching My Issues...');
    const mineRes = await fetch(`${BASE_URL}/issues/mine`, {
      headers: { 'Authorization': token }
    });
    const issues = await mineRes.json();

    console.log('Issues received:', issues.map(i => `${i.title} (${i.date})`));

    if (issues.length < 2) throw new Error('Not enough issues returned');
    
    // Check sorting
    if (issues[0].title === 'Issue 2') {
      console.log('SUCCESS: Issues are sorted newest first.');
    } else {
      console.error('FAILURE: Issues are NOT sorted correctly.');
      process.exit(1);
    }

  } catch (err) {
    console.error('ERROR:', err);
    process.exit(1);
  }
}

run();
