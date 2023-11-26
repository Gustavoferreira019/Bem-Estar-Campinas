// Organiza o header conforme usuario logado
const headerCadastro = document.getElementById("header-cadastro-sobre");
const headerLogin = document.getElementById("header-login-sobre");
const headerCadastroAgendamento = document.getElementById(
  "header-cadastro-agendamento-sobre"
);
const headerListarAgendamento = document.getElementById(
  "header-listar-agendamento-sobre"
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