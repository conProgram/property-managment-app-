import FirebaseKeys from "./config";
import firebase from "firebase";
require("firebase/firestore");

class Fire {
    constructor() {
        if (!firebase.apps.length) {
            firebase.initializeApp(FirebaseKeys);
        }
    }

    addPost = async ({ text, localUri, user }) => {
        const remoteUri = await this.uploadPhotoAsync(localUri, `photos/${this.uid}/${Date.now()}`);

        return new Promise((res, rej) => {
            this.firestore
                .collection("posts")
                .add({
                    text,
                    timestamp: this.timestamp,
                    image: remoteUri,
                    user
                })
                .then(ref => {
                    res(ref);
                })
                .catch(error => {
                    rej(error);
                });
        });
    };



    uploadPhotoAsync = (uri, filename) => {
        return new Promise(async (res, rej) => {
            const response = await fetch(uri);
            const file = await response.blob();

            let upload = firebase
                .storage()
                .ref(filename)
                .put(file);

            upload.on(
                "state_changed",
                snapshot => {},
                err => {
                    rej(err);
                },
                async () => {
                    const url = await upload.snapshot.ref.getDownloadURL();
                    res(url);
                }
            );
        });
    };

    user = callback => {
        this.firestore
            .collection("users")
            .where("uid", "==", this.uid)
            .get()
            .then(snapshot => {
                // snapshot.forEach(doc => {
                //     console.log(doc.data());
                // });

                callback(snapshot.docs[0].data());
            });
    };

    createUser = async user => {
        let remoteUri = null;
        console.log(user.accessCode, user.accessInstructions);
        try {
            await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);

            let db = this.firestore.collection("users").doc(this.uid);

            db.set({
                name: user.name,
                email: user.email,
                avatar: "",
                accessCode: user.accessCode,
                accessInstructions: user.accessInstructions,
                uid: this.uid
            });

            if (user.avatar) {
                
                remoteUri = await this.uploadPhotoAsync(user.avatar, `avatars/${this.uid}`);

                db.set({ avatar: remoteUri }, { merge: true });
            }
        } catch (error) {
            alert("Create user error in firebase", error);
        }
    };

    
    signOut = () => {
        firebase.auth().signOut();
    };

    get firestore() {
        return firebase.firestore();
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    get timestamp() {
        return Date.now();
    }
}

Fire.shared = new Fire();
export default Fire;