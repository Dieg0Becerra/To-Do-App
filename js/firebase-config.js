        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
        import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";
        import { getFirestore } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries

        // Your web app's Firebase configuration
        const firebaseConfig = 
        {
            apiKey: "AIzaSyCNQ_kgY3RR1rRjb6icoXnG0y87Lf0Yxes",
            authDomain: "to-do-app-a6442.firebaseapp.com",
            projectId: "to-do-app-a6442",
            storageBucket: "to-do-app-a6442.firebasestorage.app",
            messagingSenderId: "826497174576",
            appId: "1:826497174576:web:bd0e43c113b91066bdf1f5"
        };

        // Initialize Firebase
        export const firebaseApp = initializeApp(firebaseConfig);
        export const auth =  getAuth(firebaseApp)
        export const googleAuth = new GoogleAuthProvider()
        export const fireSave = getFirestore(firebaseApp)