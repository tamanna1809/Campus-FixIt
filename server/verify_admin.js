import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:8000/api';
// Using a random email to avoid collision on repeated runs
const email = `admin_test_${Date.now()}@test.com`;
const password = 'password123';
let token = '';
let issueId = '';

async function run() {
  try {
    // 1. Register
    console.log('1. Registering user...');
    const regRes = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Admin Test', email, password })
    });
    // It might fail if user exists, so we try login next anyway
    console.log('Register status:', regRes.status);

    // 2. Login
    console.log('\r\n2. Logging in...');
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!loginRes.ok) throw new Error('Login failed');
    const loginData = await loginRes.json();
    token = loginData.token;
    console.log('Login successful, token obtained.');

    // 3. Create Issue
    console.log('\r\n3. Creating Issue...');
    const createRes = await fetch(`${BASE_URL}/issues/create`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': token 
      },
      body: JSON.stringify({
        title: 'Test Issue',
        description: 'This is a test issue',
        category: 'Infrastructure',
        location: 'Building A'
      })
    });
    const issueData = await createRes.json();
    issueId = issueData._id;
    console.log('Issue created, ID:', issueId);

    // 4. Get All Issues
    console.log('\r\n4. Getting All Issues...');
    const allRes = await fetch(`${BASE_URL}/issues/all`, {
       headers: { 'Authorization': token }
    });
    const allIssues = await allRes.json();
    console.log(`Found ${allIssues.length} issues.`);

    // 5. Update Status and Add Remarks
    console.log('\r\n5. Updating Status to "In Progress" with Remarks...');
    const updateRes = await fetch(`${BASE_URL}/issues/${issueId}/status`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': token 
      },
      body: JSON.stringify({
        status: 'In Progress',
        remarks: 'Admin is looking into it.'
      })
    });
    const updatedIssue = await updateRes.json();
    console.log('Updated Issue:', updatedIssue.status, updatedIssue.remarks);

    if (updatedIssue.status !== 'In Progress' || updatedIssue.remarks !== 'Admin is looking into it.') {
      throw new Error('Update failed validation.');
    }

    // 6. Mark Resolved
    console.log('\r\n6. Marking as Resolved...');
    const resolveRes = await fetch(`${BASE_URL}/issues/${issueId}/status`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': token 
      },
      body: JSON.stringify({
        status: 'Resolved',
        remarks: 'Issue fixed.'
      })
    });
    const resolvedIssue = await resolveRes.json();
    console.log('Resolved Issue:', resolvedIssue.status, resolvedIssue.remarks);

     if (resolvedIssue.status !== 'Resolved') {
      throw new Error('Resolve failed validation.');
    }

    console.log('\r\nSUCCESS: All steps verified.');

  } catch (err) {
    console.error('ERROR:', err);
    process.exit(1);
  }
}

run();
