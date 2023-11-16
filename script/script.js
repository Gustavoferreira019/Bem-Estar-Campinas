function menuShow() {
    if (mmobile.style.display == 'block') {
        mmobile.style.display = 'none';
    } else {
        mmobile.style.display = 'block'
    }
}

const toggleButton = document.getElementById('icone');
let isOpen = false;

toggleButton.addEventListener('click', () => {
    isOpen = !isOpen;
    if (isOpen) {
        toggleButton.innerHTML = '&#10006';
    } else {
        toggleButton.innerHTML = '&#9776;'
    }
}
)

//Função para criação de Cadastro

async function handleButtonClick() {
    try {
      const response = await fetch('http://127.0.0.1:5500/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: randomUUID(),
          name: firstName + ' ' + lastName,
          email,
          password: hashedPassword,
          birthDate,
          address,
          city,
          state,
          phone,
          gender,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Erro ao enviar dados para o servidor');
      }
  
      const novoPaciente = await response.json();
      console.log('Novo paciente registrado:', novoPaciente);
    } catch (error) {
      console.error('Erro ao processar a solicitação:', error);
    }
  }

  //Pegando infos do cliente e enviando ao Backend

  const registrarPaciente = document.getElementById('btnRegister')

  if(registrarPaciente){
    registrarPaciente.addEventListener('click',handleButtonClick)
  }