const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');

//const usuario = [{"email": "renata@gmail.com", "senha": "1234"}]

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const senha = senhaInput.value;

  if (!email || !senha) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      //[{"email": "renata@gmail.com", "senha": "1234"}]
      body: JSON.stringify({ email, senha }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message); // Login realizado com sucesso!
      // Exemplo de redirecionamento futuro:
      // window.location.href = 'produtos.html';
    } else {
      alert(data.message); // E-mail ou senha incorretos.
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    alert('Não foi possível conectar ao servidor.');
  }
});