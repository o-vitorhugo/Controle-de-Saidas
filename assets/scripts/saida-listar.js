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

        data.forEach((saida, index) => {
            const card = document.createElement("div");
            card.classList.add("card");
    
            card.innerHTML = `
                <div class="card-info">
                    <h3 class="saida-h3">${saida.nomeAluno}</h3>
                    <p class="saida-p">${saida.motivo}</p>
                    <p class="saida-p">${saida.localDestino}</p>
                    <p class="saida-p">${saida.dataSolicitacao}</p>
                    <p class="saida-p">${saida.horaSaida}</p>
                    <p class="saida-p">${saida.horaRetorno}</p>
                    <p class="saida-p">${saida.status}</p>
                </div>
                <div class="card-actions">
                    <button class="btn-icon" onclick="atualizarSaida(${index})">
                        <img src="../assets/images/pencil.svg">
                    </button>
                    <button class="btn-icon" onclick="apagarSaida(${index})">
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

    function atualizarSaida(index) {
        const saida = saidas[index];
        localStorage.setItem('saidaParaAtualizar', JSON.stringify(saida));
        window.location.href = './saida-atualizar.html';
    }
    
    function apagarSaida(index) {
        const saida = saidas[index];
        localStorage.setItem('saidaParaApagar', JSON.stringify(saida));
        window.location.href = './saida-apagar.html';
    }