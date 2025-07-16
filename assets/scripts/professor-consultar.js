let container = document.getElementById('container');
let consultar = document.getElementById('consultar');

consultar.addEventListener('click', (e) => {
    e.preventDefault();

    let codProfessor = document.getElementById('codProfessor').value;

    container.innerHTML = ``;

    fetch(`http://localhost:8081/professor/${codProfessor}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Professor não encontrado");
            }
            return response.json();
        })
        .then(professor => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML += `
                <div class="card-info-consulta">
                    <h3>${professor.nome} ${professor.sobrenome}</h3>
                    <p class="card-p">${professor.matricula}</p>
                    <p class="card-p">${professor.telefone}</p>
                    <p class="card-p">${professor.email}</p>
                </div>    
            `;

            container.innerHTML += `<br> <h2 style="text-align: center">Professor encontrado</h2>`;
            container.appendChild(card);
        })
        .catch(error => {
            console.error("Erro ao buscar professor:", error);
            container.innerHTML = `<span style="color:red; text-align: center">Erro ao consultar professor.</span>`;
        });
});