const { addUser, addBalance, showUsers } = require('./commands.js');

const args = process.argv.slice(2);

async function main() {
  const cmd = args[0];

  if (cmd === "add") {
    await addUser(args[1]);
  } else if (cmd === "balance") {
    await addBalance(args[1], parseInt(args[2]));
  } else if (cmd === "show") {
    await showUsers();
  } else {
    console.log("الأوامر:");
    console.log("node init.js add NAME");
    console.log("node init.js balance NAME AMOUNT");
    console.log("node init.js show");
  }
}

main();
