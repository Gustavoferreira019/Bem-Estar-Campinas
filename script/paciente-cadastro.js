const form = document.getElementById("cadastro-form");

const nome = document.getElementById("cadastro-nome");
const sobrenome = document.getElementById("cadastro-sobrenome");
const email = document.getElementById("cadastro-email");
const senha = document.getElementById("cadastro-senha");
const confirmarSenha = document.getElementById("cadastro-confirmar-senha");
const dataDeNascimento = document.getElementById("cadastro-data-nascimento");
const endereco = document.getElementById("cadastro-endereco");
const cidade = document.getElementById("cadastro-cidade");
const estado = document.getElementById("cadastro-estado");
const celular = document.getElementById("cadastro-celular");
const genero = document.getElementById("cadastro-genero");

const sucessoMessage = document.getElementById("sucesso-message");

form.addEventListener("submit", submitCadastro);

async function submitCadastro(e) {
  e.preventDefault();

  if (senha.value !== confirmarSenha.value) {
    alert("As senhas não coincidem. Por favor, tente novamente.");
    return;
  }

  if (celular.value.length !== 11) {
    alert("O numero de celular precisa conter 11 digitos");
    return;
  }

  const apiUrl = "http://localhost:5000/register";

  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: nome.value,
      lastName: sobrenome.value,
      email: email.value,
      password: senha.value,
      passwordConfirmation: confirmarSenha.value,
      birthDate: new Date(dataDeNascimento.value),
      address: endereco.value,
      city: cidade.value,
      state: estado.value,
      phone: celular.value,
      gender: genero.value,
    }),
  });

  if (res.status === 200) {
    sucessoMessage.style.display = "block";
    setTimeout(function () {
      window.location.href = "login.html";
    }, 2000);
  }
}

//------------------- Organiza o header conforme usuario logado -------------------
const headerCadastro = document.getElementById("header-cadastro-cadastro");
const headerLogin = document.getElementById("header-login-cadastro");
const headerCadastroAgendamento = document.getElementById(
  "header-cadastro-agendamento-cadastro"
);
const headerListarAgendamento = document.getElementById(
  "header-listar-agendamento-cadastro"
);
const headerSairAgendamento = document.getElementById(
  "header-sair-agendamento"
);
const pacienteLogado = window.localStorage.getItem("user-token");
if (pacienteLogado) {
  headerCadastro.remove();
  headerLogin.remove();
} else {
  headerCadastroAgendamento.remove();
  headerListarAgendamento.remove();
  headerSairAgendamento.remove();
}

headerSairAgendamento.addEventListener("click",()=>{
  window.localStorage.removeItem("user-token")
  window.localStorage.removeItem("user")
  window.location.reload()
})