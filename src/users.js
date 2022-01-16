const users = [];
const chosen = [];

function addUser(user) {
  if (user) {
    const index = users.findIndex(p => p.id === user.id);
    index != -1 ? users[index] = user : users.push(user);
  }
  return users;
}

function addChosen(user) {
  if (user) {
    const index = chosen.findIndex(p => p.id === user.id);
    index != -1 ?  chosen[index] = user : chosen.push(user);
  }
  return chosen;
}

module.exports = {
  users,
  chosen,
  addUser,
  addChosen,
};