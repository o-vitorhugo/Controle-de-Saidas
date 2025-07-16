let res = document.getElementById('res');
let apagar = document.getElementById('apagar');

apagar.addEventListener('click', (e) => {
    e.preventDefault();

    let codAluno = document.getElementById('codAluno').value;

    res.innerHTML = ``;
    res.style.backgroundColor = '#f6f6f6';
    res.style.borderLeft = '4px solid #667eea';
    res.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';

    fetch(`http://localhost:8081/aluno/${codAluno}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                res.innerHTML = `<span>Aluno excluído com sucesso!</span>`;
            } else {
                res.innerHTML = `<span style="color:red">Erro ao excluir aluno.</span>`;
            }
        })
        .catch(error => {
            console.error("Erro ao excluir aluno:", error);
            res.innerHTML = `<span style="color:red">Erro ao excluir aluno.</span>`;
        });
});

// Recuperar dados do localStorage
const alunoJSON = localStorage.getItem('alunoParaApagar');

if (alunoJSON) {
    const aluno = JSON.parse(alunoJSON);

    // Preencher o input com o id do aluno
    document.getElementById('codAluno').value = aluno.codAluno || ''; 
} else {
    // Limpar o input se não houver dados
    document.getElementById('codAluno').value = '';
    console.error("Nenhum aluno selecionado.");
}

// Sempre limpar o localStorage ao carregar a página
localStorage.removeItem('alunoParaApagar');