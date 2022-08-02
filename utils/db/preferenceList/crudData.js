import { doc, setDoc, getDoc, getDocs, query, collection } from 'firebase/firestore';
import db from '../index.js';

export async function AddDocument_CustomID(address, protocolInfo) {
    const ref = doc(db, "ProtocolPreference", address);

    await setDoc(ref, {
        walletAddress: address,
        preference: protocolInfo,
    })
    .then(() => {
        alert('Data saved successfully.')
    })
    .catch((err) => {
        console.log(err)
        alert("Error", err);
    })
}

export async function GetADocument(address) {
    const ref = doc(db, "ProtocolPreference", address);
    const docSnap = await getDoc(ref);

    let result = [];
    let success = false;
    if(docSnap.exists()){
        result = docSnap.data().preference;
        success = true;
        console.log('result', result);
    }
    else{
        console.log('no such document');
    }
    return [result, success];
}

export async function GetDocuments(address) {
    const ref = collection(db, "ProtocolPreference");
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