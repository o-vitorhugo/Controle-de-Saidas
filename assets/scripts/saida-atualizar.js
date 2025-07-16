let res_consulta = document.getElementById('res_consulta');
let consultar = document.getElementById('consultar');

let nomeAluno = document.getElementById('nomeAluno');

consultar.addEventListener('click', (e) => {
    e.preventDefault();

    let codSaida = document.getElementById('codSaida').value;

    res_consulta.innerHTML = ``;
    res_consulta.style.backgroundColor = '#f6f6f6';
    res_consulta.style.borderLeft = '4px solid #667eea';
    res_consulta.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';

    fetch(`http://localhost:8081/saida/${codSaida}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Saída não encontrada");
            }
            return response.json();
        })
        .then(saida => {
            res_consulta.innerHTML += `<p>Saída do aluno <strong> ${saida.nomeAluno} </strong> encontrada</p>`;

            console.log(saida);

            dataSolicitacao.value = saida.dataSolicitacao;
            horaSaida.value = saida.horaSaida;
            horaRetorno.value = saida.horaRetorno;
            motivo.value = saida.motivo;
            localDestino.value = saida.localDestino;
            status.value = saida.status;
            nomeAluno.value = saida.nomeAluno;
            nomeProfessor.value = saida.nomeProfessor;
            aluno_cod.value = saida.aluno_cod;
            professor_cod.value = saida.professor_cod;
        })
        .catch(error => {
            console.error("Erro ao consultar saída:", error);
            res_consulta.innerHTML = `<span style="color:red">Erro ao consultar saída.</span>`;
        });
});

let res = document.getElementById('res');
let atualizar = document.getElementById('atualizar');

atualizar.addEventListener('click', (e) => {
    e.preventDefault();

    let codSaida = document.getElementById('codSaida').value;

    let dataSolicitacao = document.getElementById('dataSolicitacao').value;
    let horaSaida = document.getElementById('horaSaida').value;
    let horaRetorno = document.getElementById('horaRetorno').value;
    let motivo = document.getElementById('motivo').value;
    let localDestino = document.getElementById('localDestino').value;
    let status = document.getElementById('status').value;

    let alunoSelect = document.getElementById('aluno_cod');
    let aluno_cod = Number(alunoSelect.value);
    let nomeAluno = alunoSelect.options[alunoSelect.selectedIndex].textContent;

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
        professor_cod: professor_cod
    };

    console.log("Enviando: ", JSON.stringify(saida));

    res.innerHTML = ``;
    res.style.backgroundColor = '#f6f6f6';
    res.style.borderLeft = '4px solid #667eea';
    res.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';

    fetch(`http://localhost:8081/saida/${codSaida}`, {
        method: 'PUT',
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
            console.log("Saída atualizada com sucesso:", data);
            res.innerHTML = `Saída atualizada com sucesso!`;
        })
        .catch(error => {
            console.error("Erro ao atualizar saída:", error);
            res.innerHTML = `<span style="color:red">Erro ao atualizar saída.</span>`;
        });
});

// Recuperar dados do localStorage
const saidaJSON = localStorage.getItem('saidaParaAtualizar');

if (saidaJSON) {
    const saida = JSON.parse(saidaJSON);

    // Preencher os inputs com os dados da saída
    document.getElementById('codSaida').value = saida.codSaida || '';
    document.getElementById('dataSolicitacao').value = saida.dataSolicitacao || '';
    document.getElementById('horaSaida').value = saida.horaSaida || '';
    document.getElementById('horaRetorno').value = saida.horaRetorno || '';
    document.getElementById('motivo').value = saida.motivo || '';
    document.getElementById('localDestino').value = saida.localDestino || '';
    document.getElementById('status').value = saida.status || '';
    document.getElementById('nomeAluno').value = saida.nomeAluno || '';
    document.getElementById('nomeProfessor').value = saida.nomeProfessor || '';
    document.getElementById('aluno_cod').value = saida.aluno_cod || '';
    document.getElementById('professor_cod').value = saida.professor_cod || '';
} else {
    // Limpar os inputs (caso acesse diretamente pelo menu)
    document.getElementById('codSaida').value = '';
    document.getElementById('dataSolicitacao').value = '';
    document.getElementById('horaSaida').value = '';
    document.getElementById('horaRetorno').value = '';
    document.getElementById('motivo').value = '';
    document.getElementById('localDestino').value = '';
    document.getElementById('status').value = '';
    document.getElementById('nomeAluno').value = '';
    document.getElementById('nomeProfessor').value = '';
    document.getElementById('aluno_cod').value = '';
    document.getElementById('professor_cod').value = '';
}

// Sempre limpar o localStorage ao carregar a página
localStorage.removeItem('saidaParaAtualizar');

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