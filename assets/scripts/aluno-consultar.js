let container = document.getElementById('container');
let consultar = document.getElementById('consultar');

consultar.addEventListener('click', (e) => {
    e.preventDefault();

    let codAluno = document.getElementById('codAluno').value;

    container.innerHTML = ``;

    fetch(`http://localhost:8081/aluno/${codAluno}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Aluno não encontrado");
            }
            return response.json();
        })
        .then(aluno => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML += `
                <div class="card-info-consulta">
                    <h3>${aluno.nome} ${aluno.sobrenome}</h3>
                    <p class="card-p">${aluno.matricula}</p>
                    <p class="card-p">${aluno.telefone}</p>
                    <p class="card-p">${aluno.email}</p>
                </div>    
            `;

            container.innerHTML += `<br> <h2 style="text-align: center">Aluno encontrado</h2>`;
            container.appendChild(card);
        })
        .catch(error => {
            console.error("Erro ao buscar aluno:", error);
            container.innerHTML = `<span style="color:red; text-align: center">Erro ao consultar aluno.</span>`;
        });
});