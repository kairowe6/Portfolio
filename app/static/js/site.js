function toggleMenu() {
  var el = document.getElementById('sidebar');
  if (!el) return;
  el.classList.toggle('open');
}

function fakeChat(ev) {
  ev.preventDefault();
  const input = document.getElementById('chat-text');
  const log = document.getElementById('chat-log');
  if (!input || !log || !input.value.trim()) return false;

  const user = document.createElement('div');
  user.className = 'msg msg--user';
  user.textContent = input.value.trim();
  log.appendChild(user);

  const bot = document.createElement('div');
  bot.className = 'msg msg--bot';
  bot.textContent = "I’ll answer questions about posts and projects here once wired. For now, try clicking a card.";
  log.appendChild(bot);

  log.scrollTop = log.scrollHeight;
  input.value = "";
  return false;
}
