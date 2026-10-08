const program = pg.program;

const counter = web3.Keypair.generate();

await program.methods
  .initialize()
  .accounts({
    counterAccount: counter.publicKey,
    signer: pg.wallet.publicKey,
    systemProgram: web3.SystemProgram.programId,
  })
  .signers([counter])
  .rpc({ commitment: "confirmed" });

console.log("Counter initialized: 0");

await program.methods
  .increment()
  .accounts({
    counterAccount: counter.publicKey,
  })
  .rpc({ commitment: "confirmed" });

let account = await program.account.counterAccount.fetch(
  counter.publicKey,
  "confirmed"
);

console.log("Counter after first increment:", account.count.toString());

await program.methods
  .increment()
  .accounts({
    counterAccount: counter.publicKey,
  })
  .rpc({ commitment: "confirmed" });

account = await program.account.counterAccount.fetch(
  counter.publicKey,
  "confirmed"
);

console.log("Counter after second increment:", account.count.toString());
