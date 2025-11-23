import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";


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
const db = getFirestore(app);

console.log("Firebase Conectado!");

const btnRegister = document.getElementById('btnRegisterAction');
if (btnRegister) {
    btnRegister.addEventListener('click', async () => {
        const nome = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const senha = document.getElementById('regPassword').value;

        if (!nome || !email || !senha) {
            alert("Preencha todos os campos!");
            return;
        }

        try {
            btnRegister.textContent = "Criando conta...";
            const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
            const user = userCredential.user;

            await setDoc(doc(db, "usuarios", user.uid), {
                nome: nome,
                email: email,
                criadoEm: new Date()
            });

            alert("Conta criada com sucesso!");
            window.location.href = "home.html";

        } catch (error) {
            console.error(error);
            if (error.code === 'auth/email-already-in-use') {
                alert("Este e-mail já está cadastrado.");
            } else if (error.code === 'auth/weak-password') {
                alert("A senha deve ter pelo menos 6 caracteres.");
            } else {
                alert("Erro: " + error.message);
            }
            btnRegister.textContent = "Cadastrar";
        }
    });
}

const btnLogin = document.getElementById('btnLogin');
if (btnLogin) {
    btnLogin.addEventListener('click', async () => {
        const email = document.getElementById('emailInput').value;
        const senha = document.getElementById('passInput').value;

        if (!email || !senha) {
            alert("Preencha e-mail e senha!");
            return;
        }

        try {
            btnLogin.textContent = "Entrando...";
            
            await signInWithEmailAndPassword(auth, email, senha);
            
            console.log("Login realizado com sucesso!");
            window.location.href = "home.html";

        } catch (error) {
            console.error("Erro no login:", error);
            alert("E-mail ou senha incorretos.");
            btnLogin.textContent = "Entrar na Resenha";
        }
    });
    
    const linkRegister = document.getElementById('btnRegister');
    if (linkRegister) {
        linkRegister.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = "register.html";
        });
    }
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Usuário detectado:", user.email);
    } else {
        console.log("Nenhum usuário logado.");
    }
});