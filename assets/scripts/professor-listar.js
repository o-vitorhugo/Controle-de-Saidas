let container = document.getElementById("container");

let professores = [];

fetch("http://localhost:8081/professor")
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao buscar professores.");
        }
        return response.json();
    })
    .then(data => {
        if (data.length === 0) {
            container.innerHTML = "<p>Nenhum professor encontrado.</p>";
            return;
        }

        container.innerHTML = ``;

        professores = data;

        data.forEach((professor, index) => {
            const card = document.createElement("div");
            card.classList.add("card");
    
            card.innerHTML = `
                <div class="card-info">
                    <h3>${professor.nome} ${professor.sobrenome}</h3>
                    <p>${professor.matricula}</p>
                    <p>${professor.telefone}</p>
                    <p>${professor.email}</p>
                </div>
                <div class="card-actions">
                    <button class="btn-icon" onclick="atualizarProfessor(${index})">
                        <img src="../assets/images/pencil.svg">
                    </button>
                    <button class="btn-icon" onclick="apagarProfessor(${index})">
                        <img src="../assets/images/trash.svg">
                    </button>
                </div>
            `;
    
            container.appendChild(card);
        });
    })
    .catch(error => {
        console.error("Erro ao carregar os professores:", error);
        container.innerHTML = `<p style="color:red">Erro ao carregar os professores.</p>`;
    });

    function atualizarProfessor(index) {
        const professor = professores[index];
        localStorage.setItem('professorParaAtualizar', JSON.stringify(professor));
        window.location.href = './professor-atualizar.html';
    }
    
    function apagarProfessor(index) {
        const professor = professores[index];
        localStorage.setItem('professorParaApagar', JSON.stringify(professor));
        window.location.href = './professor-apagar.html';
    }