let container = document.getElementById("container");

let alunos = [];

fetch("http://localhost:8081/aluno")
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao buscar alunos.");
        }
        return response.json();
    })
    .then(data => {
        if (data.length === 0) {
            container.innerHTML = "<p>Nenhum aluno encontrado.</p>";
            return;
        }

        container.innerHTML = ``;

        alunos = data;

        data.forEach((aluno, index) => {
            const card = document.createElement("div");
            card.classList.add("card");
    
            card.innerHTML = `
                <div class="card-info">
                    <h3>${aluno.nome} ${aluno.sobrenome}</h3>
                    <p>${aluno.matricula}</p>
                    <p>${aluno.telefone}</p>
                    <p>${aluno.email}</p>
                </div>
                <div class="card-actions">
                    <button class="btn-icon" onclick="atualizarAluno(${index})">
                        <img src="../assets/images/pencil.svg">
                    </button>
                    <button class="btn-icon" onclick="apagarAluno(${index})">
                        <img src="../assets/images/trash.svg">
                    </button>
                </div>
            `;
    
            container.appendChild(card);
        });
    })
    .catch(error => {
        console.error("Erro ao carregar os alunos:", error);
        container.innerHTML = `<p style="color:red">Erro ao carregar os alunos.</p>`;
    });

    function atualizarAluno(index) {
        const aluno = alunos[index];
        localStorage.setItem('alunoParaAtualizar', JSON.stringify(aluno));
        window.location.href = './aluno-atualizar.html';
    }
    
    function apagarAluno(index) {
        const aluno = alunos[index];
        localStorage.setItem('alunoParaApagar', JSON.stringify(aluno));
        window.location.href = './aluno-apagar.html';
    }