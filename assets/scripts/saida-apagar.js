let res = document.getElementById('res');
let apagar = document.getElementById('apagar');

apagar.addEventListener('click', (e) => {
    e.preventDefault();

    let codSaida = document.getElementById('codSaida').value;

    res.innerHTML = ``;
    res.style.display = `block`;
    res.style.backgroundColor = '#f6f6f6';
    res.style.borderLeft = '4px solid #667eea';
    res.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';

    fetch(`http://localhost:8081/saida/${codSaida}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                res.innerHTML = `<span>Saída excluída com sucesso!</span>`;
            } else {
                res.innerHTML = `<span style="color:red">Erro ao excluir saída.</span>`;
            }
        })
        .catch(error => {
            console.error("Erro ao excluir saída:", error);
            res.innerHTML = `<span style="color:red">Erro ao excluir saída.</span>`;
        });
});

// Recuperar dados do localStorage
const saidaJSON = localStorage.getItem('saidaParaApagar');

if (saidaJSON) {
    const saida = JSON.parse(saidaJSON);
    document.getElementById('codSaida').value = saida.codSaida || ''; 
} else {
    document.getElementById('codSaida').value = '';
    console.error("Nenhum saida selecionado.");
}

// Sempre limpar o localStorage ao carregar a página
localStorage.removeItem('saidaParaApagar');