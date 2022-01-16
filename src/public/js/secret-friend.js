class SecretFriend {
  participants = [];
  chosenParticipants = [];
  
  constructor() {}

  emitParticipant(participant) {
    socket.emit('addParticipant', participant);
  }

  getAllParticipants(participants) {
    participants.forEach(p => this.getParticipant(p));
    this.renderParticipants();
  }
  
  getParticipant(participant) {
    if (participant) {
      const index = this.participants.findIndex(p => p.id === participant.id);

      index != -1 ?  this.participants[index] = participant : this.participants.push(participant);
    }
  }

  renderParticipants() {
    const orderedList = document.querySelector('.participants-list');
    orderedList.innerHTML = '';
    this.participants.forEach(p => {
      const listItem = document.createElement('li');
      listItem.textContent = p.name;
      orderedList.appendChild(listItem);
    });
  }

  setRandomIndex() {
    const availableIndex = this.participants.map((participant, index) => {
      const chosenIndex = this.chosenParticipants.findIndex(chosen => chosen.id === participant.id);

      if (chosenIndex !== -1 || participant.id === myUserId) {
        return undefined;
      }

      return index;
    }).filter(p => !!p);

    if (availableIndex.length > 0) {
      const length = availableIndex.length;
      return availableIndex[Math.floor(Math.random() * (length - 1))];
    }

    return 0;
  }

  getAllChosen(participants) {
    console.log(participants);
    participants.forEach(p => this.getChosenParticipant(p));
    this.renderParticipants();
  }

  getChosenParticipant(participant) {
    if (participant) {
      const index = this.chosenParticipants.findIndex(p => p.id === participant.id);

      index != -1 ?  this.chosenParticipants[index] = participant : this.chosenParticipants.push(participant);
    }
  }

  raffleParticipant() {
    if (this.participants.length > 0) {
      const randomIndex = this.setRandomIndex();

      const chosenParticipant = this.participants[randomIndex];
      socket.emit('addChosen', chosenParticipant);
      this.renderRaffledParticipant(chosenParticipant);
    }
  }

  renderRaffledParticipant(participant) {
    const chosenContainer = document.querySelector('.chosen-container');
    const element = document.createElement('div');
    chosenContainer.appendChild(element);
    element.setAttribute('class', 'chosen-participant');
    element.textContent = participant.name;
  }
}