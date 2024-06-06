import crypto, { createHash } from "crypto";

class Block {
  constructor(index, timestamp, data, previous_hash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previous_hash = previous_hash;
    this.hash = this.createHash();
    this.next = null;
  }

  createHash() {
    return createHash("sha256")
      .update(
        this.index +
          this.timestamp +
          this.previous_hash +
          JSON.stringify(this.data)
      )
      .digest("hex");
  }
}

class Blockchain {
  constructor() {
    const genesisBlock = this.createGenesisBlock();
    this.head = genesisBlock;
    this.tail = genesisBlock;
  }

  createGenesisBlock() {
    return new Block(0, Date.now(), "Genesis Block", "0");
  }

  addBlock(newBlock) {
    newBlock.previous_hash = this.tail.hash;
    newBlock.hash = newBlock.createHash();
    this.tail.next = newBlock;
    this.tail = newBlock;
  }

  printChain() {
    let currentBlock = this.head;
    while (currentBlock != null && currentBlock.next != null) {
      console.log(`Block ${currentBlock.index}:${currentBlock.hash} ->`);
      currentBlock = currentBlock.next;
    }
  }
}
let blockchain = new Blockchain();
blockchain.addBlock(new Block(1, Date.now(), { amount: 4 }));
blockchain.addBlock(new Block(2, Date.now(), { amount: 10 }));
blockchain.printChain();
