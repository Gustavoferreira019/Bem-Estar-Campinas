const form = document.getElementById("login-form");
const email = document.getElementById("login-email");
const senha = document.getElementById("login-senha");

form.addEventListener("submit", submitLogin);

async function submitLogin(e) {
  e.preventDefault();

  const apiUrl = "http://localhost:5000/login";

  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: senha.value,
    }),
  });
  const data = await res.json();

  if (res.status !== 200) {
    alert(data.error);
    return;
  }

  window.localStorage.setItem("user-token", data.token);
  window.localStorage.setItem("user", JSON.stringify(data.paciente));
  setTimeout(function () {
    window.location.href = "cadastro-agendamento.html"; // Alterar para tela de criar agendamento
  }, 2000);
}

//------------------- Organiza o header conforme usuario logado -------------------
const headerCadastro = document.getElementById("header-cadastro-login");
const headerLogin = document.getElementById("header-login-login");
const headerCadastroAgendamento = document.getElementById(
  "header-cadastro-agendamento-login"
);
const headerListarAgendamento = document.getElementById(
  "header-listar-agendamento-login"
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