import admin from 'firebase-admin';
import serviceAccount from '../task-manager-firebase-key.json' assert { type: 'json' };

// Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Export the admin object
export { admin };