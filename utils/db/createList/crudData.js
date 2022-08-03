import { collection, addDoc, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import db from '../index.js';

export async function AddDocument_AutoID(address, title, creatorList) {
    const ref = collection(db, "LensList");

    await addDoc(ref, {
        walletAddress: address,
        title,
        creatorList,
    })
    .then(() => {
        console.log('Data saved successfully.')
    })
    .catch((err) => {
        console.log(err)
        alert("Error", err);
    })
}

export async function GetOwnedDocuments(address) {

    const ref = collection(db, "LensList");
    const q = query(ref, where("walletAddress", "==", address))

    let result  = [];

    const querySnapshot = await getDocs(q);
    // console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        result.push({...doc.data(), docId:doc.id})
    });
    return result
}

export async function GetOtherDocuments(address) {

    const ref = collection(db, "LensList");
    const q = query(ref, where("walletAddress", "!=", address))

    let result  = [];

    const querySnapshot = await getDocs(q);
    // console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        result.push({...doc.data(), docId:doc.id});
    });

    return result
}


export async function GetADocument(docId) {

    const docRef = doc(db, "LensList", docId);
    const docSnap = await getDoc(docRef);

    let result = null;
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        result = docSnap.data();
    } 
    else {
    // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    return result
}

export async function GetDocuments(address) {
    const ref = collection(db, "LensList");
    const q = query(ref)

    let docData = [], docKey = [], success = false;
    let querySnapshot;
    try {
        querySnapshot = await getDocs(q);
        
        // console.log(querySnapshot)
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            docData.push({...doc.data(), docId:doc.id});
            docKey.push(doc.id);
        });

        success = true;
    }
    catch(err){
        console.log(err);
    }

    return [docData, docKey, success];
}