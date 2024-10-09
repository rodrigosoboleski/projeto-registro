// Elementos do DOM (formulário, botão e lista de usuários)
const form = document.getElementById('userForm'); // Captura o formulário pelo ID
const listBtn = document.getElementById('listBtn'); // Captura o botão de listagem pelo ID
const userList = document.getElementById('userList'); // Captura a área onde a lista de usuários será exibida

// Array vazio para armazenar os usuários
let users = [];
let editIndex = null; // Variável para armazenar o índice do usuário a ser editado

// Função para adicionar ou editar um usuário no array de usuários
function addUser(name, age, course) {
    if (editIndex !== null) {
        // Se editIndex for diferente de null, atualiza o usuário existente
        users[editIndex] = { name, age, course };
        editIndex = null; // Reseta o índice após editar
    } else {
        // Adiciona um novo usuário ao array
        users.push({ name, age, course });
    }
}

// Função para exibir a lista de usuários na interface
function displayUsers() {
    userList.innerHTML = ''; // Limpa o conteúdo atual da lista de usuários para evitar duplicação

    // Percorre o array de usuários e para cada usuário, cria um bloco HTML com suas informações
    users.forEach((user, index) => {
        // Bloco de HTML para cada usuário, incluindo os botões de editar e deletar
        const userHTML = `
        <div class="userItem">
            <h3>${user.name}</h3> <!-- Exibe o nome do usuário -->
            <p>Idade: ${user.age}</p> <!-- Exibe a idade do usuário -->
            <p>Curso: ${user.course}</p> <!-- Exibe o curso do usuário -->
            <button class="editBtn" onclick="editUser(${index})">Editar</button> <!-- Botão para editar o usuário -->
            <button class="deleteBtn" onclick="deleteUser(${index})">Deletar</button> <!-- Botão para deletar o usuário -->
        </div>
        `;
        // Insere o bloco HTML gerado no final do elemento 'userList'
        userList.insertAdjacentHTML('beforeend', userHTML);
    });
}

// Função para deletar um usuário da lista
function deleteUser(index) {
    // Remove o usuário do array 'users' com base no índice fornecido
    users.splice(index, 1);
    // Atualiza a exibição da lista de usuários após a remoção
    displayUsers();
}

// Função para editar um usuário
function editUser(index) {
    // Preenche o formulário com os dados do usuário selecionado para edição
    document.getElementById('name').value = users[index].name;
    document.getElementById('age').value = users[index].age;
    document.getElementById('course').value = users[index].course;
    
    // Armazena o índice do usuário a ser editado
    editIndex = index;
}

// Função para alternar a exibição da lista de usuários
function toggleUsersList() {
    // Alterna a classe 'hidden' para mostrar ou esconder a lista
    userList.classList.toggle('hidden');
    
    // Se a lista não estiver escondida, chama a função para exibir os usuários
    if (!userList.classList.contains('hidden')) {
        displayUsers();
    }
}

// Evento que ocorre ao enviar o formulário
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Previne o comportamento padrão de recarregar a página
    
    // Captura os valores do formulário
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const course = document.getElementById('course').value;
    
    // Adiciona ou edita o usuário com os valores capturados
    addUser(name, age, course);
    
    // Reseta os campos do formulário após adicionar ou editar o usuário
    form.reset();
    
    // Exibe a lista atualizada de usuários se ela já estiver visível
    if (!userList.classList.contains('hidden')) {
        displayUsers();
    }
});

// Evento que ocorre ao clicar no botão de listagem
listBtn.addEventListener('click', toggleUsersList); // Alterna a exibição da lista de usuários
