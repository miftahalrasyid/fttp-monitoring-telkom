import firebase,{initializeApp} from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import {getDatabase, ref,update,query, onValue} from "firebase/database";

const credentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  }
  
// export default function initFirebase(){
//     console.log("firebase",firebase)
//     // if(!firebase.app.length){
//         const app = initializeApp(credentials);
//         console.log('firebase was successfully init.');
//         const db = getDatabase(app);
//         console.log(db)
//     // }
//     const test=()=>{
//         console.log("welcome")
//     }
//     return {test}
// }
function FirebaseBackEnd() {
    // console.log("firebase",credentials)
    
    // Get a reference to the database service
    const app = initializeApp(credentials);
    const db = getDatabase(app);
    const starCountRef = ref(db, 'odcBox');
    // code below should exist to trigger the database to update
    onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
        console.log(data)
    });
    function setSplitter({odcboxIndex,feederIndex,newData}) {
        update(ref(db,`odcBox/${odcboxIndex}/feeder/data/${feederIndex}`),newData)
        // ref(db,"odcBox/0/feeder/data/0").update({splitter:3})
        // console.log("firebase app",app)
        // const db = getDatabase(app);
        // console.log("welcome");
    }
    function setDistributor({odcboxIndex,distributorIndexses,splitter}){
        // console.log(distributorIndexses,splitter)
        // update(ref(db,`odcBox/0/distributor/data/0`),{splitter:9})
        distributorIndexses.forEach((dt)=>{
            console.log("dt",dt,Object.entries(dt))
            const [[key,value]] = Object.entries(dt);
            console.log("value",value)
            const starCountRef = ref(db,`odcBox/${odcboxIndex}/distributor/data/${key}`);
            update(starCountRef,{splitter,name:value})
            // onValue(starCountRef, (snapshot) => {
            // const data = snapshot.val();
            //     console.log("change",data)
            // });
        })
        // console.log("distribute",response)
        // update(ref(db,`odcBox/${odcboxIndex}/distributor/data`),newData)
    }
    return {setSplitter,setDistributor}
    // const app = (typeof window !== undefined)?initializeApp(firebaseConfig):null;
}

let _firebaseSDK = null;

function initFirebaseBackend(config){
    console.log("init firebase",config)
    if(!_firebaseSDK){
        _firebaseSDK = new FirebaseBackEnd(config)
    }
    return _firebaseSDK
}

function getFirebaseBackend(){
    return _firebaseSDK
}

export { initFirebaseBackend, getFirebaseBackend }