
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const functions = require("firebase-functions")
const admin = require("firebase-admin")

admin.initializeApp()

exports.linkCreated = functions.firestore
  .document("users/{userUid}/links/{linkID}")
  .onCreate((snapshot, context) => {
    const { userUid, linkID } = context.params;
    const { longURL, shortCode } = snapshot.data();
    admin.firestore().doc(`links/${shortCode}`).set({
      userUid,
       linkID, 
       longURL
    });


    console.log(`New link created for user ${userUid}, link ID: ${linkID}`);
    console.log(`Long URL: ${longURL}, Short Code: ${shortCode}`);

 return Promise.resolve(); 
  });

  exports.linkDeleted = functions.firestore.document("users/{userUid}/links/{linkID}").onDelete((snapshot, context) => {
    const { shortCode } = snapshot.data();
    return admin.firestore().doc(`links/${shortCode}`).delete();
  });
  
