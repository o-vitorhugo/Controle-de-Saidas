let container = document.getElementById("container");

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

        data.forEach((saida) => {
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
                    <h3 class="saida-h3">${saida.nomeAluno}</h3>
                    <p class="saida-p">${saida.motivo}</p>
                    <p class="saida-p">${saida.localDestino}</p>
                    <p class="saida-p">${saida.dataSolicitacao}</p>
                    <p class="saida-p hora-saida">${saida.horaSaida}</p>
                    <p class="saida-p">${saida.nomeProfessor}</p>
                    <p class="saida-p">${saida.status}</p>
                </div>
                <div class="card-actions">
                    ${botoes}
                </div>
            `;

            container.appendChild(card);
            saida.cardElement = card;
        });
    })
    .catch(error => {
        console.error("Erro ao carregar os alunos:", error);
        container.innerHTML = `<p style="color:red">Erro ao carregar os alunos.</p>`;
    });

function getSaidaPorId(codSaida) {
    return saidas.find(s => s.codSaida === codSaida);
}

function autorizarSaida(codSaida) {
    const saida = getSaidaPorId(codSaida);

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
            const horaAtual = new Date().toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            });

            // Atualiza o texto da horaSaida no card
            const horaSaidaEl = saida.cardElement.querySelector(".hora-saida");
            if (horaSaidaEl) horaSaidaEl.textContent = horaAtual;

            saida.status = "Autorizada";

            // Atualiza status no card
            const statusEl = saida.cardElement.querySelector(".saida-p:last-child");
            statusEl.textContent = "Autorizada";

            // Atualiza botões
            saida.cardElement.querySelector(".card-actions").innerHTML = `
                <button class="btn-icon" onclick="finalizarSaida(${codSaida})">
                    <img src="../assets/images/saida.svg">
                </button>
            `;
        })
        .catch(err => alert(err));
}

function rejeitarSaida(codSaida) {
    const saida = getSaidaPorId(codSaida);

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
            saidas = saidas.filter(s => s.codSaida !== codSaida); // Remove a saída
            saida.cardElement.remove(); // Remove o card do container
        })
        .catch(err => alert(err));
}

function finalizarSaida(codSaida) {
    const saida = getSaidaPorId(codSaida);

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
            saidas = saidas.filter(s => s.codSaida !== codSaida);
            saida.cardElement.remove();
        })
        .catch(err => alert(err));
}