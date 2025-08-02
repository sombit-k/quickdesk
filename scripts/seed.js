#!/usr/bin/env node

/**
 * QuickDesk Database Seeding Script
 * 
 * This script provides an easy way to seed the database with sample data
 * Run with: node scripts/seed.js [options]
 */

const { spawn } = require('child_process');
const path = require('path');

const BASE_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

async function makeRequest(url, options = {}) {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return { success: response.ok, data, status: response.status };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function seedBasicData() {
  logInfo('Seeding basic data (categories, users, initial tickets)...');
  
  const result = await makeRequest(`${BASE_URL}/api/seed?type=all`);
  
  if (result.success) {
    logSuccess('Basic data seeded successfully');
    if (result.data?.data) {
      const data = result.data.data;
      log(`  📁 Categories: ${data.categoriesAvailable || 'N/A'}`, 'cyan');
      log(`  👥 Users: ${data.usersAvailable || 'N/A'}`, 'cyan');
      log(`  🎫 Tickets: ${data.ticketsCreated || 'N/A'}`, 'cyan');
    }
  } else {
    logError(`Failed to seed basic data: ${result.data?.message || result.error}`);
    return false;
  }
  
  return true;
}

async function generateAdditionalTickets(count = 50) {
  logInfo(`Generating ${count} additional diverse tickets...`);
  
  const result = await makeRequest(`${BASE_URL}/api/seed/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      count,
      includeVotes: true,
      includeComments: true
    })
  });
  
  if (result.success) {
    logSuccess(`Generated ${count} additional tickets`);
    if (result.data?.data) {
      const data = result.data.data;
      log(`  🎫 Tickets: ${data.ticketsCreated}`, 'cyan');
      log(`  💬 Comments: ${data.commentsCreated}`, 'cyan');
      log(`  👍 Votes: ${data.votesCreated}`, 'cyan');
      log(`  📊 Avg votes/ticket: ${data.averageVotesPerTicket}`, 'cyan');
      log(`  📊 Avg comments/ticket: ${data.averageCommentsPerTicket}`, 'cyan');
    }
  } else {
    logError(`Failed to generate additional tickets: ${result.data?.message || result.error}`);
    return false;
  }
  
  return true;
}

async function main() {
  const args = process.argv.slice(2);
  const options = {
    quick: args.includes('--quick'),
    full: args.includes('--full'),
    count: parseInt(args.find(arg => arg.startsWith('--count='))?.split('=')[1]) || 50,
    help: args.includes('--help') || args.includes('-h')
  };

  if (options.help) {
    log('QuickDesk Database Seeding Script', 'bright');
    log('');
    log('Usage: node scripts/seed.js [options]', 'cyan');
    log('');
    log('Options:', 'yellow');
    log('  --quick       Seed only basic data (fast)', 'cyan');
    log('  --full        Seed comprehensive dataset (recommended)', 'cyan');
    log('  --count=N     Generate N additional tickets (default: 50)', 'cyan');
    log('  --help, -h    Show this help message', 'cyan');
    log('');
    log('Examples:', 'yellow');
    log('  node scripts/seed.js --quick', 'cyan');
    log('  node scripts/seed.js --full', 'cyan');
    log('  node scripts/seed.js --count=100', 'cyan');
    return;
  }

  log('🌱 QuickDesk Database Seeding', 'bright');
  log('================================', 'bright');
  
  const startTime = Date.now();
  
  try {
    // Always seed basic data first
    const basicSuccess = await seedBasicData();
    if (!basicSuccess) {
      logError('Failed to seed basic data. Aborting.');
      process.exit(1);
    }
    
    // Generate additional tickets unless --quick is specified
    if (!options.quick) {
      const additionalSuccess = await generateAdditionalTickets(options.count);
      if (!additionalSuccess) {
        logWarning('Basic data was seeded, but additional generation failed.');
      }
    }
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    log('', 'reset');
    logSuccess(`Database seeding completed in ${duration}s`);
    
    if (options.quick) {
      logInfo('Quick seeding completed. Use --full for more comprehensive data.');
    } else {
      logInfo('Full seeding completed. Your database now has comprehensive sample data.');
    }
    
    log('', 'reset');
    logInfo('You can now:');
    log('  • Visit http://localhost:3000/home to see the tickets', 'cyan');
    log('  • Test filtering, searching, and sorting features', 'cyan');
    log('  • Create new tickets at http://localhost:3000/ask', 'cyan');
    log('  • View individual tickets to test voting and commenting', 'cyan');
    
  } catch (error) {
    logError(`Seeding failed: ${error.message}`);
    process.exit(1);
  }
}

// Handle uncaught errors
process.on('unhandledRejection', (error) => {
  logError(`Unhandled error: ${error.message}`);
  process.exit(1);
});

// Run the script
main();
