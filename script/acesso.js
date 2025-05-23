const senhaHash = "706cd158340e53b830554bf40fae9126b5647066807498d58dc3908fd66b3824";

async function verificarSenha() {
  const input = document.getElementById('senhaInput').value;

  if (!input) {
    alert("Senha necessária!");
    return;
  }

  const enc = new TextEncoder();
  const data = enc.encode(input);
  const hashBuf = await crypto.subtle.digest('SHA-256', data);
  const hashArr = Array.from(new Uint8Array(hashBuf));
  const hashHex = hashArr.map(b => b.toString(16).padStart(2, '0')).join('');

  if (hashHex === senhaHash) {
    alert("Senha correta! Redirecionando...");
    window.location.href = "sistema.html";
  } else {
    alert("Senha incorreta! Acesso negado.");
    window.location.href = "negado.html";
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btnEntrar').addEventListener('click', verificarSenha);
});
