/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
 

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions=require("firebase-functions")
const admin=require("firebase-admin")

admin.initializeApp()

exports.linkCreated = functions.firestore
  .document("users/{userUid}/links/{linkID}")
  .onCreate((snapshot, context) => {
    const { userUid, linkID } = context.params;
    const { longURL, shortCode } = snapshot.data();
    admin.firestore().doc(`links/${shortCode}`).set({
userUid,linkID,longURL
    });


    // Add your custom logic here
    console.log(`New link created for user ${userUid}, link ID: ${linkID}`);
    console.log(`Long URL: ${longURL}, Short Code: ${shortCode}`);

    // You can return a Promise if you have asynchronous operations
    // to perform. If not, you can remove the return statement. 
  });
