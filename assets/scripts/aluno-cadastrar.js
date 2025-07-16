let res = document.getElementById('res');
let cadastrar = document.getElementById('cadastrar');

cadastrar.addEventListener('click', (e) => {
    e.preventDefault();

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
    res.style.backgroundColor = '#f6f6f6';
    res.style.borderLeft = '4px solid #667eea';
    res.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';

    fetch('http://localhost:8081/aluno', {
        method: 'POST',
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
            console.log("Aluno cadastrado com sucesso:", data);
            res.innerHTML = `Aluno cadastrado com sucesso! Cód: ${data.codAluno}`;
        })
        .catch(error => {
            console.error("Erro ao cadastrar aluno:", error);
            res.innerHTML = `<span style="color:red">Erro ao cadastrar aluno.</span>`;
        });
});