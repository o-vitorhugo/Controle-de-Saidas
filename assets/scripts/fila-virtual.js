let container = document.getElementById("container");
let res = document.getElementById("res");

let saidas = [];

fetch("http://localhost:8081/saida")
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao buscar saídas.");
        }
        return response.json();
    })
    .then(data => {
        if (data.length === 0) {
            container.innerHTML = "<p>Nenhuma saída encontrada.</p>";
            return;
        }

        container.innerHTML = ``;

        saidas = data;

        data.forEach((saida, index) => {
            if (saida.status === "Finalizada" || saida.status === "Rejeitada") {
                return
            }

            const card = document.createElement("div");
            card.classList.add("card");

            let botoes = ``;

            if (saida.status === "Pendente") {
                botoes = `
                    <button class="btn-icon" onclick="autorizarSaida(${saida.codSaida})">
                        <img src="../assets/images/autorizar.svg">
                    </button>
                    <button class="btn-icon" onclick="rejeitarSaida(${saida.codSaida})">
                        <img src="../assets/images/rejeitar.svg">
                    </button>
                `;
            } else if (saida.status === "Autorizada") {
                botoes = `
                    <button class="btn-icon" onclick="finalizarSaida(${saida.codSaida})">
                        <img src="../assets/images/saida.svg">
                    </button>
                `;
            }

            card.innerHTML = `
                <div class="card-info">
                    <h3>${saida.nomeAluno}</h3>
                    <p class="saida-p">${saida.dataSolicitacao}</p>
                    <p class="saida-p">${saida.motivo}</p>
                    <p class="saida-p">${saida.localDestino}</p>
                    <p class="saida-p">${saida.status}</p>
                </div>
                <div class="card-actions">
                    ${botoes}
                </div>
            `;

            container.appendChild(card);
            saida.cardElement = card; // Salva referência DOM diretamente no objeto
        });
    })
    .catch(error => {
        console.error("Erro ao carregar os alunos:", error);
        container.innerHTML = `<p style="color:red">Erro ao carregar os alunos.</p>`;
    });

function autorizarSaida(index) {
    const saida = saidas[index];

    fetch(`http://localhost:8081/saida/status/${saida.codSaida}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify("Autorizada")
    })
        .then(res => {
            if (!res.ok) throw new Error("Erro ao autorizar saída.");
            return res.text()
        })
        .then(() => {
            saida.status = "Autorizada";

            // Atualiza status no card
            const statusEl = saida.cardElement.querySelector(".saida-p:last-child");
            statusEl.textContent = "Autorizada";

            // Atualiza botões
            saida.cardElement.querySelector(".card-actions").innerHTML = `
                <button class="btn-icon" onclick="finalizarSaida(${index})">
                    <img src="../assets/images/saida.svg">
                </button>
            `;
        })
        .catch(err => alert(err));
}

function rejeitarSaida(index) {
    const saida = saidas[index];

    fetch(`http://localhost:8081/saida/status/${saida.codSaida}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify("Rejeitada")
    })
        .then(res => {
            if (!res.ok) throw new Error("Erro ao rejeitar saída.");
            return res.text()
        })
        .then(() => {
            saidas.splice(index, 1); // Remove a saida do array
            saida.cardElement.remove(); // Remove o card do container
        })
        .catch(err => alert(err));
}

function finalizarSaida(index) {
    const saida = saidas[index];

    fetch(`http://localhost:8081/saida/status/${saida.codSaida}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify("Finalizada")
    })
        .then(res => {
            if (!res.ok) throw new Error("Erro ao finalizar saída.");
            return res.text()
        })
        .then(() => {
            saidas.splice(index, 1);
            saida.cardElement.remove();
        })
        .catch(err => alert(err));
}