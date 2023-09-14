 
const functions = require("firebase-functions")
const admin = require("firebase-admin")

admin.initializeApp()

exports.linkCreated = functions.firestore
  .document('users/{userUid}/links/{linkID}')
  .onCreate(async (snapshot, context) => {
    try {
      const { userUid, linkID } = context.params;
      const { longURL, shortCode } = snapshot.data();

      // Reference to the "links" collection
      const linksCollection = admin.firestore().collection('links');

      // Create a document in the "links" collection
      await linksCollection.doc(shortCode).set({
        userUid,
        linkID,
        longURL,
      });

      console.log(`New link created for user ${userUid}, link ID: ${linkID}`);
      console.log(`Long URL: ${longURL}, Short Code: ${shortCode}`);
    } catch (error) {
      console.error('Error creating link:', error);
    }
  });

  exports.linkDeleted = functions.firestore.document("users/{userUid}/links/{linkID}").onDelete((snapshot, context) => {
    const { shortCode } = snapshot.data();
    return admin.firestore().doc(`links/${shortCode}`).delete();
  });
  
