let res_consulta = document.getElementById('res_consulta');
let consultar = document.getElementById('consultar');

let nome = document.getElementById('nome');
let sobrenome = document.getElementById('sobrenome');

consultar.addEventListener('click', (e) => {
    e.preventDefault();

    let codAluno = document.getElementById('codAluno').value;

    res_consulta.innerHTML = ``;
    res_consulta.style.display = `block`;
    res_consulta.style.backgroundColor = '#f6f6f6';
    res_consulta.style.borderLeft = '4px solid #667eea';
    res_consulta.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';

    fetch(`http://localhost:8081/aluno/${codAluno}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Aluno não encontrado");
            }
            return response.json();
        })
        .then(aluno => {
            res_consulta.innerHTML += `<p>Aluno <strong> ${aluno.nome} ${aluno.sobrenome} </strong> encontrado</p>`;

            console.log(aluno);

            nome.value = aluno.nome;
            sobrenome.value = aluno.sobrenome;
            matricula.value = aluno.matricula;
            telefone.value = aluno.telefone;
            email.value = aluno.email;
        })
        .catch(error => {
            console.error("Erro ao consultar aluno:", error);
            res_consulta.innerHTML = `<span style="color:red">Erro ao consultar aluno.</span>`;
        });
});

let res = document.getElementById('res');
let atualizar = document.getElementById('atualizar');

atualizar.addEventListener('click', (e) => {
    e.preventDefault();

    let codAluno = document.getElementById('codAluno').value;

    let nome = document.getElementById('nome').value;
    let sobrenome = document.getElementById('sobrenome').value;
    let matricula = Number(document.getElementById('matricula').value);
    let telefone = document.getElementById('telefone').value;
    let email = document.getElementById('email').value;

    const aluno = {
        nome: nome,
        sobrenome: sobrenome,
        matricula: matricula,
        telefone: telefone,
        email: email
    };

    console.log("Enviando: ", JSON.stringify(aluno));

    res.innerHTML = ``;
    res.style.display = `block`;
    res.style.backgroundColor = '#f6f6f6';
    res.style.borderLeft = '4px solid #667eea';
    res.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';

    fetch(`http://localhost:8081/aluno/${codAluno}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(aluno)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Aluno atualizado com sucesso:", data);
            res.innerHTML = `Aluno atualizado com sucesso!`;
        })
        .catch(error => {
            console.error("Erro ao atualizar aluno:", error);
            res.innerHTML = `<span style="color:red">Erro ao atualizar aluno.</span>`;
        });
});

// Recuperar dados do localStorage
const alunoJSON = localStorage.getItem('alunoParaAtualizar');

if (alunoJSON) {
    const aluno = JSON.parse(alunoJSON);

    // Preencher os inputs com os dados do aluno
    document.getElementById('codAluno').value = aluno.codAluno || '';
    document.getElementById('nome').value = aluno.nome || '';
    document.getElementById('sobrenome').value = aluno.sobrenome || '';
    document.getElementById('matricula').value = aluno.matricula || '';
    document.getElementById('telefone').value = aluno.telefone || '';
    document.getElementById('email').value = aluno.email || '';
} else {
    // Limpar os inputs (caso acesse diretamente pelo menu)
    document.getElementById('codAluno').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('sobrenome').value = '';
    document.getElementById('matricula').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('email').value = '';
}

// Sempre limpar o localStorage ao carregar a página
localStorage.removeItem('alunoParaAtualizar');  