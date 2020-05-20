import FirebaseKeys from "./config";
import firebase from "firebase";
require("firebase/firestore");

class Fire {
    constructor() {
        if (!firebase.apps.length) {
            firebase.initializeApp(FirebaseKeys);
        }
    }

    addPost = async ({postName, text, localUri, user }) => {
        console.log(this.postName, this.text, this.timestamp, this.image, this.user);
        const remoteUri = await this.uploadPhotoAsync(localUri, `photos/${this.uid}/${Date.now()}`);
        return new Promise((res, rej) => {
            this.firestore
                .collection("posts")
                .add({
                    postName,
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

    addMaintencePost = async ({ text, localUri, user }) => {
        console.log(this.text, this.timestamp, this.image, this.user);
        const remoteUri = await this.uploadPhotoAsync(localUri, `Maitencephotos/${this.uid}/${Date.now()}`);

        return new Promise((res, rej) => {
            this.firestore
                .collection("maintence")
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
        //console.log(user.accessCode, user.accessInstructions);
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


    //CHAT SECTION 
    send = messages => {
        messages.forEach(item => {
            const message = {
                text: item.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user
            };

            this.db.push(message);
        });
    };

    parse = message => {
        const { user, text, timestamp } = message.val();
        const { key: _id } = message;
        const createdAt = new Date(timestamp);

        return {
            _id,
            createdAt,
            text,
            user
        };
    };

    get = callback => {
        this.db.on("child_added", snapshot => callback(this.parse(snapshot)));
    };

    off() {
        this.db.off();
    }

    get db() {
        return firebase.database().ref("messages");
    }

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