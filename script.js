document.addEventListener('DOMContentLoaded', () => {

    const btnLogin = document.getElementById('btnLogin');
    const btnRegister = document.getElementById('btnRegister');

    if (btnLogin) {
        btnLogin.addEventListener('click', () => {
            const email = document.getElementById('emailInput').value;
            const pass = document.getElementById('passInput').value;
            if (email.trim() !== "" && pass.trim() !== "") {
                window.location.href = "home.html";
            } else {
                alert("Por favor, preencha e-mail e senha!");
            }
        });
    }

    if (btnRegister) {
        btnRegister.addEventListener('click', (e) => {
            e.preventDefault();
            alert("Funcionalidade de cadastro em desenvolvimento!");
        });
    }

    const jogosDisponiveis = [
        { termos: ['flamengo', 'bragantino', 'fla', 'braga', 'red bull'], url: 'match.html', status: 'ok' },
        
        { termos: ['palmeiras', 'fluminense', 'pal', 'flu', 'verdao'], url: 'match-pal-flu.html', status: 'ok' },
        
        { termos: ['botafogo', 'gremio', 'bot', 'gre', 'fogo'], url: 'match-bot-gre.html', status: 'ok' },

        { termos: ['corinthians', 'sao paulo', 'cor', 'sp', 'majestoso'], url: 'match-cor-sao.html', status: 'ok' },
        
        { termos: ['vasco', 'cruzeiro', 'santos'], url: '', status: 'indisponivel' }
    ];

    function processarBusca(termoInput) {
        const termo = termoInput.toLowerCase().trim();
        if (termo === "") { alert("Digite algum time!"); return; }

        const jogoEncontrado = jogosDisponiveis.find(jogo => jogo.termos.some(t => termo.includes(t)));

        if (jogoEncontrado) {
            if (jogoEncontrado.status === 'ok') {
                window.location.href = jogoEncontrado.url;
            } else {
                alert("Partida localizada, mas estatísticas ainda não processadas.");
            }
        } else {
            alert("Partida não encontrada ou indisponível.");
        }
    }

    const btnBuscar = document.getElementById('btnBuscar');
    const searchInput = document.getElementById('searchInput');
    if (btnBuscar && searchInput) {
        btnBuscar.addEventListener('click', () => processarBusca(searchInput.value));
        searchInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') processarBusca(searchInput.value); });
    }

    const navSearchInput = document.querySelector('.nav-search input');
    if (navSearchInput) {
        navSearchInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') processarBusca(navSearchInput.value); });
    }

    const abas = document.querySelectorAll('.tab-btn');
    const conteudos = document.querySelectorAll('.tab-content');

    if (abas.length > 0) {
        abas.forEach(aba => {
            aba.addEventListener('click', function() {
                abas.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                conteudos.forEach(c => c.style.display = 'none');
                const alvo = this.getAttribute('data-target');
                const divAlvo = document.getElementById(`content-${alvo}`);
                if (divAlvo) divAlvo.style.display = 'block';
            });
        });
    }
});