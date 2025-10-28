// Função para obter usuários do localStorage
function getUsers() {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
  }
  
  // Função para salvar usuários no localStorage
  function saveUsers(users) {
    localStorage.setItem("usuarios", JSON.stringify(users));
  }
  
  // Função para exibir usuários na seção direita
  function mostrarUsuarios() {
    const direita = document.querySelector(".direita");
    const usuarios = getUsers();
  
    // Limpa tudo antes de exibir
    direita.innerHTML = "";
  
    if (usuarios.length === 0) {
      direita.innerHTML = '<img src="fotos/Gemini_Generated_Image_36o1b536o1b536o1-removebg-preview.png" alt="Logo">';
      return;
    }
  
    usuarios.forEach((usuario) => {
      const div = document.createElement("div");
      div.classList.add("usuario_exibicao");
      div.innerHTML = `
        <h3>${usuario.nome}</h3>
        <p><strong>Email:</strong> ${usuario.email}</p>
        <p><strong>Telefone:</strong> ${usuario.telefone}</p>
        <div class="botoes_usuario">
          <button class="editar">Editar</button>
          <button class="deletar">Deletar</button>
          <button class="logar">Logar</button>
        </div>
        <div class="mensagem_login"></div>
      `;
      direita.appendChild(div);
  
      // Botão Editar
      div.querySelector(".editar").addEventListener("click", () => {
        document.getElementById("inome").value = usuario.nome;
        document.getElementById("iemail").value = usuario.email;
        document.getElementById("itelefone").value = usuario.telefone;
        document.getElementById("isenha").value = usuario.senha;
        document.getElementById("iconfirmesenha").value = usuario.senha;
  
        // Remove o usuário antigo ao editar
        deletarUsuario(usuario.email);
      });
  
      // Botão Deletar
      div.querySelector(".deletar").addEventListener("click", () => {
        deletarUsuario(usuario.email);
        mostrarUsuarios();
      });
  
      // Botão Logar
      div.querySelector(".logar").addEventListener("click", () => {
        window.location.href = "dashboard.html";
      });
    });
  }
  
  // CREATE — cadastrar usuário
  function cadastrarUsuario(event) {
    event.preventDefault();
  
    const nome = document.getElementById("inome").value.trim();
    const email = document.getElementById("iemail").value.trim();
    const telefone = document.getElementById("itelefone").value.trim();
    const senha = document.getElementById("isenha").value;
    const confirmarSenha = document.getElementById("iconfirmesenha").value;
  
    if (!nome || !email || !telefone || !senha || !confirmarSenha) {
      return; // não faz nada se campos estiverem vazios
    }
  
    if (senha !== confirmarSenha) {
      return; // não faz nada se senha não coincidir
    }
  
    const usuarios = getUsers();
  
    // Evita emails duplicados
    const existe = usuarios.find((u) => u.email === email);
    if (existe) return;
  
    const novoUsuario = { id: Date.now(), nome, email, telefone, senha };
    usuarios.push(novoUsuario);
    saveUsers(usuarios);
  
    document.querySelector("form").reset();
    mostrarUsuarios();
  }
  
  // DELETE — excluir usuário pelo email
  function deletarUsuario(email) {
    let usuarios = getUsers();
    usuarios = usuarios.filter((u) => u.email !== email);
    saveUsers(usuarios);
  }
  
  // ===========================
  // EVENTOS
  // ===========================
  document.querySelector("form").addEventListener("submit", cadastrarUsuario);
  
  // Inicializa a exibição de usuários
  mostrarUsuarios();