const mongoose = require('mongoose');
const User = require('./models/User'); // path might be './models/User'
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

async function checkAndDeleteLargeDocuments() {
  try {
    await mongoose.connect(process.env.MONGO_URI); // put your MongoDB URI here

    const cursor = User.find().cursor();
    for await (const doc of cursor) {
      const size = Buffer.byteLength(JSON.stringify(doc));

      if (size > 2 * 1024 * 1024) { // if document size is greater than 2MB
        console.log(`🚨 Large document detected: ${doc._id} - Size: ${(size / (1024 * 1024)).toFixed(2)} MB`);

        // Print out the details of the document if you want to inspect it before deletion
        console.log('📄 Full Document:', JSON.stringify(doc.toObject(), null, 2));

        // Delete the large document
        await User.findByIdAndDelete(doc._id);
        console.log(`✅ Document ${doc._id} deleted successfully.`);
      }
    }

    console.log('✅ Document size scan and deletion complete');
    await mongoose.disconnect();
  } catch (err) {
    console.error('❌ Error checking and deleting documents:', err);
  }
}

checkAndDeleteLargeDocuments();
