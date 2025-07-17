let res_consulta = document.getElementById('res_consulta');
let consultar = document.getElementById('consultar');

let nome = document.getElementById('nome');
let sobrenome = document.getElementById('sobrenome');

consultar.addEventListener('click', (e) => {
    e.preventDefault();

    let codProfessor = document.getElementById('codProfessor').value;

    res_consulta.innerHTML = ``;
    res_consulta.style.display = `block`;
    res_consulta.style.backgroundColor = '#f6f6f6';
    res_consulta.style.borderLeft = '4px solid #667eea';
    res_consulta.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';

    fetch(`http://localhost:8081/professor/${codProfessor}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Professor não encontrado");
            }
            return response.json();
        })
        .then(professor => {
            res_consulta.innerHTML += `<p>Professor <strong> ${professor.nome} ${professor.sobrenome} </strong> encontrado</p>`;

            console.log(professor);

            nome.value = professor.nome;
            sobrenome.value = professor.sobrenome;
            matricula.value = professor.matricula;
            telefone.value = professor.telefone;
            email.value = professor.email;
        })
        .catch(error => {
            console.error("Erro ao consultar professor:", error);
            res_consulta.innerHTML = `<span style="color:red">Erro ao consultar professor.</span>`;
        });
});

let res = document.getElementById('res');
let atualizar = document.getElementById('atualizar');

atualizar.addEventListener('click', (e) => {
    e.preventDefault();

    let codProfessor = document.getElementById('codProfessor').value;

    let nome = document.getElementById('nome').value;
    let sobrenome = document.getElementById('sobrenome').value;
    let matricula = Number(document.getElementById('matricula').value);
    let telefone = document.getElementById('telefone').value;
    let email = document.getElementById('email').value;

    const professor = {
        nome: nome,
        sobrenome: sobrenome,
        matricula: matricula,
        telefone: telefone,
        email: email
    };

    console.log("Enviando: ", JSON.stringify(professor));

    res.innerHTML = ``;
    res.style.display = `block`;
    res.style.backgroundColor = '#f6f6f6';
    res.style.borderLeft = '4px solid #667eea';
    res.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';

    fetch(`http://localhost:8081/professor/${codProfessor}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(professor)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Professor atualizado com sucesso:", data);
            res.innerHTML = `Professor atualizado com sucesso!`;
        })
        .catch(error => {
            console.error("Erro ao atualizar professor:", error);
            res.innerHTML = `<span style="color:red">Erro ao atualizar professor.</span>`;
        });
});

// Recuperar dados do localStorage
const professorJSON = localStorage.getItem('professorParaAtualizar');

if (professorJSON) {
    const professor = JSON.parse(professorJSON);

    // Preencher os inputs com os dados do professor
    document.getElementById('codProfessor').value = professor.codProfessor || '';
    document.getElementById('nome').value = professor.nome || '';
    document.getElementById('sobrenome').value = professor.sobrenome || '';
    document.getElementById('matricula').value = professor.matricula || '';
    document.getElementById('telefone').value = professor.telefone || '';
    document.getElementById('email').value = professor.email || '';
} else {
    // Limpar os inputs (caso acesse diretamente pelo menu)
    document.getElementById('codProfessor').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('sobrenome').value = '';
    document.getElementById('matricula').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('email').value = '';
}

// Sempre limpar o localStorage ao carregar a página
localStorage.removeItem('professorParaAtualizar');  