// import Vue from 'vue';
import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: process.env.VUE_APP_APIKEY,
  authDomain: process.env.VUE_APP_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_DATABASEURL,
  projectId: process.env.VUE_APP_PROJECTID,
  storageBucket: process.env.VUE_APP_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGINGSENDERID,
  appId: process.env.VUE_APP_APPID,
  measurementId: process.env.VUE_APP_MEASUREMENTID,
};

firebase.initializeApp(firebaseConfig);
const mainCollection = firebase.firestore().collection("Data");

mainCollection
  .get()
  .then(function(querySnapshot) {
    var data = [];
    querySnapshot.forEach(function(doc) {
      data.push(doc.data());
    });

    store.MileageTypes = data
      .map((doc) => doc.type)
      .filter((item, i, ar) => ar.indexOf(item) === i);
    console.log("Running");
  })
  .catch(function(error) {
    console.log("Error getting documents: ", error);
  });

var getDocuments = function(filter) {
  console.log("Getting Docs")
  store.MileageCollection = [];
  store.activeListener = mainCollection
    .where("type", "==", filter)
    .orderBy("date", "desc")
    .limit(50)
    .onSnapshot((docs) => {
      console.log("Noticed Change")
      store.MileageCollection = [];
      docs.forEach((doc) => {
        store.MileageCollection.push(doc);
      });
    });
};

var destroy = () => {
  store.activeListener();
  store.MileageCollection = [];
};

var saveRecord = async function(payload) {
  mainCollection
    .add(payload)
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      return true
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
      return false
    });
};

var updateRecord = async function(id, payload) {
  console.log(id.id, payload)

  var docRef = id.ref;

  return docRef.update(payload)
  .then(() => {
      console.log("Document successfully updated!");
      return true
  })
  .catch((error) => {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
      return false
  });

};

var deleteRecord = async function(doc) {

  var docRef = doc.ref;

  return docRef
    .delete()
    .then(() => {
      console.log("Document successfully deleted!");
      return true
    }).catch((error) => {
      console.error("Error removing document: ", error);
      return false
    });

};

export const store = {
  MileageTypes: [],
  MileageCollection: [],
  activeListener: null,
  getDocuments: getDocuments,
  destoy: destroy,
  saveRecord: saveRecord,
  updateRecord: updateRecord,
  deleteRecord: deleteRecord
};
