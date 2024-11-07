import firestore from '@react-native-firebase/firestore';

const deleteAllData = async (collection: string) => {
  const collectionRef = firestore().collection(collection);

  // get all docs
  const snapshot = await collectionRef.get();

  // delete  each doc
  if (!snapshot.empty) {
    snapshot.docs.map(doc => {
      collectionRef.doc(doc.id).delete();
    });
    console.log('Delete ' + collection + ' success');
  } else {
    console.log('Delete fail. No data in ' + collection);
  }
};

export default deleteAllData;
