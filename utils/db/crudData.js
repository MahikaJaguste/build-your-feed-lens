import { doc, setDoc, getDoc } from 'firebase/firestore';
import db from './index.js';

export async function AddDocument_CustomID(address, protocolInfo) {
    const ref = doc(db, "ProtocolPreference", address);

    await setDoc(ref, {
        walletAddress: address,
        preference: protocolInfo,
    })
    .then(() => {
        alert('Data added successfully.')
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

