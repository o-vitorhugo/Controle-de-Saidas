let container = document.getElementById('container');
let consultar = document.getElementById('consultar');

consultar.addEventListener('click', (e) => {
    e.preventDefault();

    let codSaida = document.getElementById('codSaida').value;

    container.innerHTML = ``;

    fetch(`http://localhost:8081/saida/${codSaida}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Saída não encontrada");
            }
            return response.json();
        })
        .then(saida => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <div class="card-info-consulta">
                    <h3>${saida.nomeAluno}</h3>
                    <p class="saida-p">${saida.motivo}</p>
                    <p class="saida-p">${saida.localDestino}</p>
                    <p class="saida-p">${saida.dataSolicitacao}</p>
                    <p class="saida-p">${saida.horaSaida}</p>
                    <p class="saida-p">${saida.horaRetorno}</p>
                    <p class="saida-p">${saida.status}</p>
                </div>
            `;
    
            container.innerHTML += `<br> <h2 style="text-align: center">Saída encontrada</h2>`;
            container.appendChild(card);
        })
        .catch(error => {
            console.error("Erro ao buscar saida:", error);
            container.innerHTML = `<span style="color:red; text-align: center">Erro ao consultar saida.</span>`;
        });
});