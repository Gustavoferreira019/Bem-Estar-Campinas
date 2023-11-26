const usuario = JSON.parse(window.localStorage.getItem("user"));

const conteudoTabela = document.getElementById("conteudo-tabela");
const btn_delete = document.querySelectorAll(".btn-delete");

// Busca os agendamentos do paciente no backend
document.addEventListener("DOMContentLoaded", listarAgendamentos);
async function listarAgendamentos() {
  const res = await fetch(
    `http://localhost:5000/paciente/${usuario.id}/agendamentos`
  );
  const data = await res.json();

  data.forEach((item) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td class="text-center">${item.especialidade.name.toUpperCase()}</td>
        <td class="text-center">${formatarData(item.startsAt)}</td>
        <td class="text-center">
          <button class='btn btn-danger btn-delete' onclick="showModal(${
            item.id
          })">
            <i class="bi bi-trash text-light"></i>
          </button>
        </td>
    `;
    conteudoTabela.appendChild(newRow);
  });
}

function showModal(agendamentoId) {
  Swal.fire({
    title: "Tem certeza?",
    text: "Deseja deletar o agendamento?",
    icon: "warning",
    showCancelButton: true,
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim, deletar agendamento",
    cancelButtonText: "Cancelar",
    reverseButtons: true,
    focusConfirm: true,
    focusDeny: false,
    customClass: {
      confirmButton: "bg-success fw-bold",
    },
  }).then(async (result) => {
    if (result.isConfirmed) {
      await deleteAgendamento(agendamentoId);
    }
  });
}

// Funcao para deletar agendamento
async function deleteAgendamento(agendamentoId) {
  try {
    const res = await fetch(
      `http://localhost:5000/agendamentos/${agendamentoId}`,
      {
        method: "DELETE",
      }
    );
    if (res.ok) {
      Swal.fire(
        "Deletado!",
        "Agendamento deletado com sucesso.",
        "success"
      ).then(() => {
        window.location.reload();
      });
    }
  } catch (error) {
    Swal.fire("Error", "Nao foi possivel remover o agendamento", "error").then(
      () => {
        window.location.reload();
      }
    );
  }
}

function formatarData(data) {
  const dataFormatada = new Date(data);
  
  const dia = String(dataFormatada.getDate()).padStart(2, '0');
  const mes = String(dataFormatada.getMonth() + 1).padStart(2, '0');
  const ano = dataFormatada.getFullYear();
  const horas = String(dataFormatada.getHours()).padStart(2, '0');
  const minutos = String(dataFormatada.getMinutes()).padStart(2, '0');
  
  return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
}
//------------------- Organiza o header conforme usuario logado -------------------
const headerCadastro = document.getElementById(
  "header-cadastro-listar-agendamento"
);
const headerLogin = document.getElementById("header-login-listar-agendamento");
const headerCadastroAgendamento = document.getElementById(
  "header-cadastro-agendamento-listar-agendamento"
);
const headerListarAgendamento = document.getElementById(
  "header-listar-agendamento-listar-agendamento"
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