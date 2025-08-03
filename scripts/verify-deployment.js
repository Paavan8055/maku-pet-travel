#!/usr/bin/env node

/**
 * MAKU Travel Platform - Deployment Verification Script
 * Tests all pages and API endpoints after Netlify deployment
 */

const https = require('https');
const http = require('http');

// Get site URL from command line argument
const SITE_URL = process.argv[2] || 'https://your-site.netlify.app';

console.log('🚀 MAKU Travel Platform - Deployment Verification');
console.log(`Testing site: ${SITE_URL}`);
console.log('='.repeat(60));

// Test endpoints configuration
const PAGES_TO_TEST = [
  '/',
  '/stays',
  '/inventory',
  '/hotel-apis',
  '/flights',
  '/cars',
  '/packages',
  '/auth/login',
  '/auth/register',
  '/booking',
  '/dashboard'
];

const API_ENDPOINTS = [
  '/api/hotelbeds/hotels',
  '/api/hotelbeds/activities',
  '/api/hotelbeds/transfers',
  '/api/hotelbeds/booking',
  '/api/hotels/list',
  '/api/hotels/search',
  '/api/hotels/ratings',
  '/api/hotels/booking',
  '/api/inventory/live',
  '/api/inventory/enhanced',
  '/api/search/unified',
  '/api/payment',
  '/api/webhooks/stripe'
];

// Test results storage
const results = {
  pages: { passed: 0, failed: 0, errors: [] },
  apis: { passed: 0, failed: 0, errors: [] }
};

/**
 * Make HTTP request and check response
 */
function testEndpoint(url, type = 'page') {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;

    const req = protocol.get(url, (res) => {
      const success = res.statusCode >= 200 && res.statusCode < 400;

      if (success) {
        console.log(`✅ ${type.toUpperCase()} [${res.statusCode}] ${url}`);
        results[type === 'page' ? 'pages' : 'apis'].passed++;
      } else {
        console.log(`❌ ${type.toUpperCase()} [${res.statusCode}] ${url}`);
        results[type === 'page' ? 'pages' : 'apis'].failed++;
        results[type === 'page' ? 'pages' : 'apis'].errors.push({
          url,
          status: res.statusCode,
          error: `HTTP ${res.statusCode}`
        });
      }
      resolve();
    });

    req.on('error', (err) => {
      console.log(`💥 ${type.toUpperCase()} [ERROR] ${url} - ${err.message}`);
      results[type === 'page' ? 'pages' : 'apis'].failed++;
      results[type === 'page' ? 'pages' : 'apis'].errors.push({
        url,
        status: 'ERROR',
        error: err.message
      });
      resolve();
    });

    req.setTimeout(10000, () => {
      console.log(`⏰ ${type.toUpperCase()} [TIMEOUT] ${url}`);
      results[type === 'page' ? 'pages' : 'apis'].failed++;
      results[type === 'page' ? 'pages' : 'apis'].errors.push({
        url,
        status: 'TIMEOUT',
        error: 'Request timeout'
      });
      req.destroy();
      resolve();
    });
  });
}

/**
 * Test all pages
 */
async function testPages() {
  console.log('\n📄 Testing Frontend Pages...');
  console.log('-'.repeat(40));

  for (const page of PAGES_TO_TEST) {
    await testEndpoint(`${SITE_URL}${page}`, 'page');
  }
}

/**
 * Test all API endpoints
 */
async function testAPIs() {
  console.log('\n🔌 Testing API Endpoints...');
  console.log('-'.repeat(40));

  for (const endpoint of API_ENDPOINTS) {
    await testEndpoint(`${SITE_URL}${endpoint}`, 'api');
  }
}

/**
 * Generate test report
 */
function generateReport() {
  console.log('\n📊 Deployment Verification Report');
  console.log('='.repeat(60));

  console.log(`\n📄 Frontend Pages:`);
  console.log(`   ✅ Passed: ${results.pages.passed}`);
  console.log(`   ❌ Failed: ${results.pages.failed}`);
  console.log(`   📈 Success Rate: ${((results.pages.passed / PAGES_TO_TEST.length) * 100).toFixed(1)}%`);

  console.log(`\n🔌 API Endpoints:`);
  console.log(`   ✅ Passed: ${results.apis.passed}`);
  console.log(`   ❌ Failed: ${results.apis.failed}`);
  console.log(`   📈 Success Rate: ${((results.apis.passed / API_ENDPOINTS.length) * 100).toFixed(1)}%`);

  const totalPassed = results.pages.passed + results.apis.passed;
  const totalTests = PAGES_TO_TEST.length + API_ENDPOINTS.length;
  const overallSuccess = ((totalPassed / totalTests) * 100).toFixed(1);

  console.log(`\n🎯 Overall Results:`);
  console.log(`   Total Tests: ${totalTests}`);
  console.log(`   Total Passed: ${totalPassed}`);
  console.log(`   Overall Success Rate: ${overallSuccess}%`);

  // Show errors if any
  if (results.pages.errors.length > 0 || results.apis.errors.length > 0) {
    console.log(`\n❌ Errors Found:`);
    [...results.pages.errors, ...results.apis.errors].forEach(error => {
      console.log(`   ${error.url} - ${error.error}`);
    });
  }

  // Final status
  console.log('\n' + '='.repeat(60));
  if (overallSuccess >= 90) {
    console.log('🎉 DEPLOYMENT VERIFICATION: PASSED');
    console.log('✅ Site is ready for production use!');
  } else if (overallSuccess >= 70) {
    console.log('⚠️  DEPLOYMENT VERIFICATION: PARTIAL');
    console.log('🔧 Some issues found, please review errors above');
  } else {
    console.log('🚨 DEPLOYMENT VERIFICATION: FAILED');
    console.log('❌ Multiple issues found, deployment needs attention');
  }

  process.exit(overallSuccess >= 70 ? 0 : 1);
}

/**
 * Main execution
 */
async function main() {
  try {
    await testPages();
    await testAPIs();
    generateReport();
  } catch (error) {
    console.error('💥 Verification script failed:', error);
    process.exit(1);
  }
}

// Validate site URL
if (!SITE_URL.startsWith('http')) {
  console.error('❌ Please provide a valid site URL');
  console.log('Usage: node verify-deployment.js https://your-site.netlify.app');
  process.exit(1);
}

main();
