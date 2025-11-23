import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyAKPdnYvzPF9Y66dmb2clOYqELXAG6VaqY",
  authDomain: "resenha-c1e70.firebaseapp.com",
  projectId: "resenha-c1e70",
  storageBucket: "resenha-c1e70.firebasestorage.app",
  messagingSenderId: "241528145872",
  appId: "1:241528145872:web:5f439d33689b001cdddbd5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById('btnLogout').addEventListener('click', () => {
    signOut(auth).then(() => {
        alert("Deslogado!");
        window.location.href = "index.html";
    }).catch((error) => {
        console.error(error);
    });
});