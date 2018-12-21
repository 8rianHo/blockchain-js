const shajs = require('sha.js');
const sha256 = shajs('sha256');

class Block {
    constructor(position, timestamp, data, previousHash) {
        this.position = position; // position of the block on the chain
        this.timestamp = timestamp; // time block was generated
        this.data = data; // data associated with this block (e.g. bitcoin would be sender, receiver, amount)
        this.previousHash = previousHash; // hash of previous block
        
        this.thisHash = sha256.update(
            this.position + this.timestamp + this.data + this.previousHash
        ).digest('hex'); // this hash block to link with next block
    }
}

// we need a way to generate the genesis block i.e. first block of the chain
function newGenesisBlock() {
    return new Block(
        0, 
        Date.now(), 
        "I am the Genesis Block",
        "0"
    );
}

// now we need to create and connect the next block of data to the chain
function nextBlockToAdd(lastBlock, data) {
    return new Block(
        lastBlock.position + 1, 
        Date.now(), 
        data,
        lastBlock.thisHash
    ); 
}

// -----------------------------------------------------

// class Account {
//     constructor(name, amount) {
//         this.name = name.toUpperCase();
//         this.amount = amount;
//     }

//     deposit(amount) {
//         this.amount += amount;
//     }
//     withdraw(amount) {
//         this.amount -= amount;
//     }
// }

// creating a transaction data object
// function createTransaction(sender, receiver, amount) {
//     return {
//         "sender" : sender,
//         "receiver" : receiver,
//         "amount" : amount
//     }
// }

// // to process a transaction between accounts
// function processTransaction(sender = Account, receiver = Account, amount) {
//     sender.withdraw(amount);
//     receiver.deposit(amount);
//     return amount;
// }

// function createTheBlockchain() {
//     const blockChain = [newGenesisBlock()];
//     return blockChain;
// }

// // run function to simulate blockchain transactions
// function run(blockChain, transactions = []) {
//     let lastBlock = blockChain[blockChain.length-1];

//     for (let i = 0; i < transactions.length; i++) {
//         let nextBlock = nextBlockToAdd(lastBlock, transactions[i]);
//         blockChain.push(nextBlock);
//         lastBlock = nextBlock;
//     }

//     console.log("Running blockchain transactions");
//     console.log(blockChain);
// }

// const blockChain = createTheBlockchain();
// let a = new Account("Adam", 500.00);
// let b = new Account("Brian", 500.00);
// let c = new Account("Carly", 500.00);
// let d = new Account("David", 500.00);

// let transactions = [
//     createTransaction(a.name, b.name, processTransaction(a, b, 150.00)),
//     createTransaction(a.name, c.name, processTransaction(a, c, 100.00)),
//     createTransaction(c.name, b.name, processTransaction(c, b, 25.00)),
//     createTransaction(b.name, d.name, processTransaction(b, d, 70.00)),
//     createTransaction(c.name, d.name, processTransaction(c, d, 20.00)),
//     createTransaction(d.name, b.name, processTransaction(d, b, 15.00)),
//     createTransaction(b.name, a.name, processTransaction(b, a, 50.00)),
//     createTransaction(a.name, c.name, processTransaction(a, c, 5.00)),
//     createTransaction(c.name, b.name, processTransaction(c, b, 100.00))
// ];
// run(blockChain, transactions);

// console.log(a.name + ": £" + a.amount);
// console.log(b.name + ": £" + b.amount);
// console.log(c.name + ": £" + c.amount);
// console.log(d.name + ": £" + d.amount);

// -----------------------------------------------------

// this function is used to simulate the blockchain
function createTheBlockchainSimulation(numberOfBlocks) {
    const theBlockchain = [newGenesisBlock()];
    let lastBlock = theBlockchain[0]; // to connect to the Genesis Block

    for (let i = 1; i < numberOfBlocks; i++) { // starts after the Genesis Block
        let nextBlock = nextBlockToAdd(lastBlock, "Block number: " + i);
        theBlockchain.push(nextBlock); // add to the chain
        lastBlock = nextBlock; // move lastBlock index up one
    }

    console.log(theBlockchain);
}
createTheBlockchainSimulation(20);

