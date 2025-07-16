let res = document.getElementById('res');
let cadastrar = document.getElementById('cadastrar');

cadastrar.addEventListener('click', (e) => {
    e.preventDefault();

    const now = new Date(); // Pega a data e hora atual do sistema
    let dataSolicitacao = now.toISOString().split('T')[0]; // Separa data e hora e mantém somente a data
    let horaSaida = null;
    let horaRetorno = null;

    let motivo = document.getElementById('motivo').value;
    let localDestino = document.getElementById('localDestino').value;

    let status = "Pendente";

    let alunoSelect = document.getElementById('aluno_cod');
    let aluno_cod = Number(alunoSelect.value); // Pega o valor do cod do select
    let nomeAluno = alunoSelect.options[alunoSelect.selectedIndex].textContent; // Pega o texto da option selecionada e armazena em "nomeAluno"

    let professorSelect = document.getElementById('professor_cod');
    let professor_cod = Number(professorSelect.value);
    let nomeProfessor = professorSelect.options[professorSelect.selectedIndex].textContent;

    const saida = {
        dataSolicitacao: dataSolicitacao,
        horaSaida: horaSaida,
        horaRetorno: horaRetorno,
        motivo: motivo,
        localDestino: localDestino,
        status: status,   
        nomeAluno: nomeAluno,
        nomeProfessor: nomeProfessor,
        aluno_cod: aluno_cod,
        professor_cod: professor_cod,
    };

    console.log("Enviando: ", JSON.stringify(saida));

    res.innerHTML = ``;
    res.style.backgroundColor = '#f6f6f6';
    res.style.borderLeft = '4px solid #667eea';
    res.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';

    fetch('http://localhost:8081/saida', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(saida)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Saída cadastrada com sucesso:", data);
            res.innerHTML = `Saída cadastrada com sucesso! Cód: ${data.codSaida}`;
        })
        .catch(error => {
            console.error("Erro ao cadastrar saída:", error);
            res.innerHTML = `<span style="color:red">Erro ao cadastrar saída.</span>`;
        });
});

// Faz um fetch do backend para buscar os alunos e professores e inserir nos selects
window.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:8081/aluno')
        .then(res => res.json())
        .then(alunos => {
            const selectAluno = document.getElementById('aluno_cod');
            alunos.forEach(a => {
                const option = document.createElement('option');
                option.value = a.codAluno;
                option.textContent = `${a.nome} ${a.sobrenome}`;
                selectAluno.appendChild(option);
            });
        });

    fetch('http://localhost:8081/professor')
        .then(res => res.json())
        .then(professores => {
            const selectProfessor = document.getElementById('professor_cod');
            professores.forEach(p => {
                const option = document.createElement('option');
                option.value = p.codProfessor;
                option.textContent = `${p.nome} ${p.sobrenome}`;
                selectProfessor.appendChild(option);
            });
        });
});