const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

console.log('Testing MongoDB connection...');
console.log('Connection URI (masked):', MONGODB_URI.replace(/:[^:@]+@/, ':****@'));

async function testConnection() {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // 5 second timeout
    });
    console.log('✅ Successfully connected to MongoDB!');

    // Test creating a simple document
    const TestModel = mongoose.model('Test', new mongoose.Schema({ name: String }));
    await TestModel.create({ name: 'connection test' });
    console.log('✅ Successfully created test document!');

    // Clean up
    await TestModel.deleteMany({});
    console.log('✅ Test completed successfully!');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('\nTroubleshooting:');
    console.error('1. Check your IP is whitelisted in MongoDB Atlas');
    console.error('2. Verify network/firewall settings');
    console.error('3. Test connection in MongoDB Compass first');
    process.exit(1);
  }
}

testConnection();
