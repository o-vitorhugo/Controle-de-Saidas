let res = document.getElementById('res');
let cadastrar = document.getElementById('cadastrar');

cadastrar.addEventListener('click', (e) => {
    e.preventDefault();

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

    fetch('http://localhost:8081/professor', {
        method: 'POST',
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
            console.log("Professor cadastrado com sucesso:", data);
            res.innerHTML = `Professor cadastrado com sucesso! Cód: ${data.codProfessor}`;
        })
        .catch(error => {
            console.error("Erro ao cadastrar professor:", error);
            res.innerHTML = `<span style="color:red">Erro ao cadastrar professor.</span>`;
        });
});