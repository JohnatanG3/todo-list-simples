const button = document.querySelector('.button-add-task');
const input = document.querySelector('.input-task');
const listCompleta = document.querySelector('.list-task');

// Criando meu array vazio para receber todos os itens da tarera do usuário
let minhaListaDeItens = [];

// Função para adicionar uma nova tarefa
function adicionarNovaTarefa() {
    const tarefa = input.value.trim(); // Remove espaços em branco no início e no fim

    if (tarefa === '') { // Verifica se o input está vazio
        // Mostra um alerta ao usuário na tela do navegador
        alert('Você não pode inserir uma tarefa vazia! Por favor, digite uma tarefa para inseri-la!');
        return; // Sai da função sem adicionar a tarefa
    }
    
    // Adiciona a nova tarefa ao array(vetor) de tarefas
    minhaListaDeItens.push({
        tarefa: tarefa,
        concluida: false,
    });

    input.value = ''; // Limpa o campo de entrada deixando vazio após a tarefa ser adicionada
    mostrarTarefas(); // Atualiza a exibição da lista de tarefas
}

// Função para mostrar as tarefas na lista
function mostrarTarefas() {
    let novaLi = ''; // Inicializa uma string vazia para armazenar o HTML das tarefas
    minhaListaDeItens.forEach((item, posicao) => { // Itera sobre cada item na lista de tarefas
        novaLi += `
            <li class="task ${item.concluida && "done"}">
                <img src="./img/checked.png" alt="check-na-tarefa" onclick="concluirTarefa(${posicao})">
                <p>${item.tarefa}</p>
                <img src="./img/trash.png" alt="tarefa-para-lixo" onclick="deletarItem(${posicao})">
            </li>
        `;
    });

    // Insere o HTML das tarefas na lista
    listCompleta.innerHTML = novaLi;

    // Salva a lista no localStorage do navegador como string
    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens))
}

// Função para concluir tarefa
function concluirTarefa(posicao) {
    // Alterna o estado de conclusão da tarefa
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida;
    
    // Atualiza a exibição da lista de tarefas
    mostrarTarefas();
}

// Função para deletar tarefa
function deletarItem(posicao) {
    // Remove a tarefa da lista
    minhaListaDeItens.splice(posicao, 1);

    // Atualiza a exibição da lista de tarefas
    mostrarTarefas();
}

// Função para recarregar tarefas do localStorage
function recarregarTarefas() {
    // Obtém as tarefas do localStorage
    const tarefasDoLocalStorage = localStorage.getItem('lista');

    if (tarefasDoLocalStorage) { // Verifica se há tarefas armazenadas no localStorage
        // Converte os dados do localStorage de volta para um array JavaScript como objeto
        minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)
    }
    
    // Atualiza a exibição da lista de tarefas
    mostrarTarefas()

    // Define o foco no campo de entrada após a página ser carregada
    input.focus();
}

// Exibe as tarefas quando a página for carregada
recarregarTarefas();

// Adiciona evento de clique no botão para adicionar tarefa
button.addEventListener('click', adicionarNovaTarefa);

// Adicionando a tarefa com a tecla enter do teclado
input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') { // Verifica se a tecla pressionada é Enter
        adicionarNovaTarefa(); // Adiciona uma nova tarefa
    }
});