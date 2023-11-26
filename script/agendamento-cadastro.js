const usuario = JSON.parse(window.localStorage.getItem("user"));

let especialidadeSelecionada = "";
let dataSelecionada = "";
let dataHoraSelecionada = "";

const especialidade = document.getElementById("especialidade-selecao");
const dataAgenda = document.getElementById("data-agenda");
const horariosDisponiveis = document.getElementById("horarios-disponiveis");
const form = document.getElementById("cadastrar-agendamento");

// Funcao para listar os agendamentos disponiveis
async function listarAgendamentosDisponiveis() {
  const res = await fetch(
    `http://localhost:5000/agendamentos?especialidadeId=${especialidadeSelecionada}&dia=${dataSelecionada}`
  );
  const data = await res.json();
  return data;
}

// Funcao para criar o agendamento
async function criarAgendamento(e) {
  e.preventDefault();

  try {
    const res = await fetch(
      `http://localhost:5000/paciente/${usuario.id}/agendamentos`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          especialidadeId: especialidadeSelecionada,
          startsAt: new Date(dataHoraSelecionada),
        }),
      }
    );
    if (res.ok) {
      Swal.fire("Agendado!", "Agendamento criado com sucesso.", "success").then(
        () => {
          window.location = "listar-agendamentos.html";
        }
      );
    }
  } catch (error) {
    Swal.fire("Error", "Nao foi possivel criar o agendamento", "error").then(
      () => {
        window.location.reload();
      }
    );
  }
}

// Busca especialidades ao carregar a pagina
document.addEventListener("DOMContentLoaded", async () => {
  const especialidade = document.getElementById("especialidade-selecao");
  const res = await fetch(`http://localhost:5000/especialidades`);
  const data = await res.json();

  data.forEach((item) => {
    const newRow = document.createElement("option");
    newRow.innerHTML = `
      <option value="${item.id}">${item.name}</option>
      `;
    especialidade.appendChild(newRow);
  });
});

// Observa por mudancas no input de especialidades
// Se especialidade e data estiver selecionados, busca os horarios disponeis para a combinacao
especialidade.addEventListener("change", async () => {
  especialidadeSelecionada = especialidade.selectedIndex;
  if (especialidadeSelecionada && dataSelecionada) {
    const horarios = await listarAgendamentosDisponiveis();
    horarios.forEach((horario) => {
      const newRow = document.createElement("option");
      newRow.innerHTML = `
        <option>${horario}</option>
      `;
      horariosDisponiveis.appendChild(newRow);
    });
  }
});

// Observa por mudancas no input de data
// Se especialidade e data estiver selecionados, busca os horarios disponeis para a combinacao
dataAgenda.addEventListener("change", async () => {
  const dateParts = dataAgenda.value.split("-");
  const convertedDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
  dataSelecionada = convertedDate;

  if (especialidadeSelecionada && dataSelecionada) {
    const horarios = await listarAgendamentosDisponiveis();
    horarios.forEach((horario) => {
      const newRow = document.createElement("option");
      newRow.innerHTML = `
        <option>${horario}</option>
      `;
      horariosDisponiveis.appendChild(newRow);
    });
  }
});

// Observa por mudancas no input de horario
// Adiciona o horario selecionado a data selecionada para enviar na criacao do agendamento
horariosDisponiveis.addEventListener("change", () => {
  const [hour, minute] = horariosDisponiveis.value.split(":");
  dataSelecionada.setHours(hour);
  dataSelecionada.setMinutes(minute);
  dataHoraSelecionada = new Date(dataSelecionada);
});

form.addEventListener("submit", criarAgendamento);

//------------------- Organiza o header conforme usuario logado -------------------
const headerCadastro = document.getElementById(
  "header-cadastro-cadastro-agendamento"
);
const headerLogin = document.getElementById(
  "header-login-cadastro-agendamento"
);
const headerCadastroAgendamento = document.getElementById(
  "header-cadastro-agendamento-cadastro-agendamento"
);
const headerListarAgendamento = document.getElementById(
  "header-listar-agendamento-cadastro-agendamento"
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