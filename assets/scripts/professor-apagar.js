let res = document.getElementById('res');
let apagar = document.getElementById('apagar');

apagar.addEventListener('click', (e) => {
    e.preventDefault();

    let codProfessor = document.getElementById('codProfessor').value;

    res.innerHTML = ``;
    res.style.display = `block`;
    res.style.backgroundColor = '#f6f6f6';
    res.style.borderLeft = '4px solid #667eea';
    res.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';

    fetch(`http://localhost:8081/professor/${codProfessor}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                res.innerHTML = `<span>Professor excluído com sucesso!</span>`;
            } else {
                res.innerHTML = `<span style="color:red">Erro ao excluir professor.</span>`;
            }
        })
        .catch(error => {
            console.error("Erro ao excluir professor:", error);
            res.innerHTML = `<span style="color:red">Erro ao excluir professor.</span>`;
        });
});

// Recuperar dados do localStorage
const professorJSON = localStorage.getItem('professorParaApagar');

if (professorJSON) {
    const professor = JSON.parse(professorJSON);

    // Preencher o input com o id do professor
    document.getElementById('codProfessor').value = professor.codProfessor || ''; 
} else {
    // Limpar o input se não houver dados
    document.getElementById('codProfessor').value = '';
    console.error("Nenhum professor selecionado.");
}

// Sempre limpar o localStorage ao carregar a página
localStorage.removeItem('professorParaApagar');