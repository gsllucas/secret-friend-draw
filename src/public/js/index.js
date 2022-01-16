let myUserId;

socket.on('userConnected', (socketId) => myUserId = socketId);

function login() {
  event.preventDefault();

  const myUserName = document.getElementById('loginInput').value;

  if (!myUserName || myUserName.length === 0 || !myUserId) {
    return;
  }

  localStorage.setItem('myUserId', myUserId);
  localStorage.setItem('myUserName', myUserName);
  window.open('/participants.html', '_self');
}