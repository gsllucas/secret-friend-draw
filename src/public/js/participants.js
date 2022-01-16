const myUserId = localStorage.getItem('myUserId');
const myUserName = localStorage.getItem('myUserName');

if (!myUserId) {
  window.open('/index.html', '_self');
}

const secretFriend = new SecretFriend();

socket.on('allParticipants', (participants) => secretFriend.getAllParticipants(participants));
socket.on('allChosen', (participants) => secretFriend.getAllChosen(participants));

document.addEventListener('DOMContentLoaded', () => {
  secretFriend.emitParticipant({id: myUserId, name: myUserName});
}, false);

function raffleParticipant() {
  secretFriend.raffleParticipant();
}