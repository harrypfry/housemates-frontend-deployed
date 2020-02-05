import firebase from "firebase";

import app from "firebase/app";

var config = {
  apiKey: "AIzaSyBfkRBe16DD6ZFZdcMYbxU7mSI2luX4daU",
  authDomain: "housemates-fe.firebaseapp.com",
  databaseURL: "https://housemates-fe.firebaseio.com",
  projectId: "housemates-fe",
  storageBucket: "housemates-fe.appspot.com",
  messagingSenderId: "361429944229",
  appId: "1:361429944229:web:d87baed86051c9ef908a4c",
  measurementId: "G-2CC0LTTVC0"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        this.auth.currentUser.updateProfile({
          photoURL: `https://avatars.dicebear.com/v2/male/${user.uid}.svg`
        });
      });

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();
}

export default Firebase;
