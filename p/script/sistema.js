// sistema.js
let crimes = [];

fetch('crimes/crimes.json')
  .then(response => response.json())
  .then(data => {
    crimes = data.crimes;
  })
  .catch(error => console.error('Erro ao carregar crimes:', error));

// Processa os crimes aqui
let crimeAtendido = false;
let historicoCrimes = [];
let crimesSelecionados = []; // Guardar os crimes selecionados para resolver

function mostrarCrime() {
  // Garante que o crime não seja repetido até ser resolvido
  if (crimeAtendido) {
    crimeAtendido = false;
    document.getElementById("resolverBtn").disabled = false; // Habilita o botão "resolver crime"
  }

  // Seleciona aleatoriamente de 1 a 5 crimes
  const numCrimes = Math.floor(Math.random() * 5) + 1;

  // Seleciona crimes aleatórios
  crimesSelecionados = [];
  for (let i = 0; i < numCrimes; i++) {
    const crimeAleatorio = crimes[Math.floor(Math.random() * crimes.length)];
    crimesSelecionados.push(crimeAleatorio);
  }

  // Exibe os crimes encontrados
  let crimeTexto = " Crimes encontrados:\n";
  crimesSelecionados.forEach((crime, index) => {
    crimeTexto += `${index + 1}. Crime: ${crime.nome} - Vilão: ${crime.vilao}\n`;
  });
  document.getElementById("crime").innerText = crimeTexto;
}
  
      function resolverCrime() {
        // Verifica se há crimes para resolver
        if (crimesSelecionados.length === 0) {
          console.log("Nenhum crime para resolver.");
          return; // Se não houver crime, não faz nada
        }
  
        // Marca todos os crimes como resolvidos e atualiza o histórico
        crimesSelecionados.forEach((crime) => {
          crimeAtendido = true;
  
          // Adiciona o crime resolvido ao histórico
          const crimeTexto = `✅ Crime Resolvido: ${crime.nome} (Vilão: ${crime.vilao})`;
          historicoCrimes.push(crimeTexto);
        });
  
        // Atualiza o histórico na tela
        atualizarHistorico();
  
        // Desabilita o botão "Resolver Crime"
        document.getElementById("resolverBtn").disabled = true;
        document.getElementById("crime").innerText = "✅ Todos os crimes foram resolvidos!";
      }
  
      function atualizarHistorico() {
        const historicoDiv = document.getElementById("historico");
        historicoDiv.innerHTML = "<h3>Histórico de Crimes</h3>"; // Limpa o histórico antes de atualizar
  
        historicoCrimes.forEach(crime => {
          const crimeDiv = document.createElement("div");
          crimeDiv.classList.add("crime-item");
          crimeDiv.textContent = crime;
          historicoDiv.appendChild(crimeDiv);
        });
      }
  
      function baixarHistorico() {
        // Cria um texto com todos os crimes resolvidos no histórico
        const textoHistorico = historicoCrimes.join("\n");
  
        // Cria um arquivo de texto
        const blob = new Blob([textoHistorico], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'historico_de_crimes.txt';
        link.click();
      }
  
      function limparHistorico() {
        // Limpa o array do histórico
        historicoCrimes = [];
        atualizarHistorico(); // Atualiza a interface para refletir a limpeza
      }