import Firebase from '../../firebase';
import firebase from "firebase";
import uuidv4 from "uuid";

const auth = Firebase.auth();

export async function registration(name, email, phoneNumber, password) {
    try {
        await auth.createUserWithEmailAndPassword(email, password);
        const currentUser = auth.currentUser;
        const db = firebase.firestore();
        db.collection("users")
            .doc(currentUser.uid)
            .set({
                name: name,
                email: currentUser.email,
                phoneNumber: phoneNumber,
                password: password
            });
    } catch (err) {
        alert(err.message);
    }
}

export async function submitPost(
    name,
    phoneNumber,
    website,
    description,
    selectedPrice,
    selectedVariant,
    selectedCategory,
    userName,
    totalVote,
    logo,
    email
) {
    try {
        const currentUser = auth.currentUser;
        const db = firebase.firestore();
        db.collection("posts")
            .doc(uuidv4())
            .set({
                    name: name,
                    phoneNumber: phoneNumber,
                    website: website,
                    description: description,
                    selectedPrice: selectedPrice,
                    selectedVariant: selectedVariant,
                    selectedCategory: selectedCategory,
                    userName: userName,
                    totalVote: totalVote,
                    logo: logo,
                    approve: true,
                    time: Date.now(),
                    email: email
                }
            )
        ;
    } catch (err) {
        alert(err.message);
    }
}


export async function updateProfile(name, phoneNumber, bio, website) {
    try {
        const currentUser = auth.currentUser;
        const db = firebase.firestore();
        db.collection("users")
            .doc(currentUser.uid)
            .set({
                name: name,
                phoneNumber: phoneNumber,
                bio: bio,
                website: website
            }, {merge: true});
    } catch (err) {
        alert(err.message);
    }
}

export async function signIn(email, password) {
    try {
        await firebase
            .auth()
            .signInWithEmailAndPassword(email, password);
    } catch (err) {
        alert(err.message);
    }
}

export async function loggingOut() {
    try {
        await firebase.auth().signOut();
    } catch (err) {
        alert(err.message);
    }
}
