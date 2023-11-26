function menuShow() {
  if (mmobile.style.display == "block") {
    mmobile.style.display = "none";
  } else {
    mmobile.style.display = "block";
  }
}

const toggleButton = document.getElementById("icone");
let isOpen = false;

toggleButton.addEventListener("click", () => {
  isOpen = !isOpen;
  if (isOpen) {
    toggleButton.innerHTML = "&#10006";
  } else {
    toggleButton.innerHTML = "&#9776;";
  }
});

// Organiza o header conforme usuario logado
const headerCadastro = document.getElementById("header-cadastro");
const headerLogin = document.getElementById("header-login");
const headerCadastroAgendamento = document.getElementById(
  "header-cadastro-agendamento"
);
const headerListarAgendamento = document.getElementById(
  "header-listar-agendamento"
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