#         * * * * * *   The code that I used in the blochain file is also used here with few changes * * * * * * * 
''' We have multiple ways to create a cryptocurrency from a blockchain here 
1. we are implemeting it using the blockchain file implementation we did earlier
    =>A cryptocurrency is native to its blockchain. IT Operates on its own blockchain.
    =>You are creating a blockchain (like Ethereum or Bitcoin) and developing the core cryptocurrency (using the file or code of that blockchain) of that blockchain (Ether or Bitcoin). This is a cryptocurrency.

2. another way is Creating a Cryptocurrency Using Smart Contracts:
    =>Tokens created by smart contracts are not considered cryptocurrencies because they do not run on their own independent blockchain.
    =>Tokens can have currency-like properties and function similarly to cryptocurrencies in certain applications, but they are technically not cryptocurrencies.

Difference:
    =>Are Tokens a Type of Cryptocurrency?
    Technically, yes.
    Tokens can act as a form of currency or digital asset within their ecosystem.
    The key difference is tokens depend on an existing blockchain, while cryptocurrencies run on their own blockchain.
 '''
#Importing the libraries 
from dotenv import load_dotenv
load_dotenv()
#python-dotenv 1.0.1
import os
# To get the exact time when the block is created 
import datetime 
# To hash the blocks 
import hashlib 
# To encode the block before hasing them 
import json 
from flask import Flask,jsonify
#Flask 3.1.0

#requests==2.18.4

# Part 1 - Building a BlockChain
class BlockChain :
    def __init__(self) :
        #this is the chain part of the block it is basically a list containing blocks
        self.chain = []
      
        self.create_block(proof =1,previous_hash = '0000')
       
    def create_block(self,proof,previous_hash):
        block = {
            'index':len(self.chain)+1, #as the new block will be lenght plus 1 digit 
            'timestamp': str(datetime.datetime.now()), #exact time block is mined
            'proof' : proof, #The proof that we get when mining our block by solving our proof of work
            'previous_hash':previous_hash,
            }
        self.chain.append(block)
        #appending the created block to the chain
        return block

    def get_previous_block(self):
        return self.chain[-1] #this gives the last index of the chain
   
    def proof_of_work(self,previous_proof):
        new_proof = 1 #this is the value that is passed as proof and here its incremented till we get right proof or right no of zeors
        check_proof = False
        while check_proof is False :
            hash_operation = hashlib.sha256(str(new_proof**2 - previous_proof**2).encode()).hexdigest() 
            if hash_operation[:4] == '0000' :#checking for 4 zeors usually for more zeors
                check_proof =True
            else:
                new_proof += 1
        return new_proof
   

    #its main use in returning previous blocks hash as hash is not stored anywhere
    def hash(self, block):
        encoded_block = json.dumps(block,sort_keys=True).encode()
        return hashlib.sha256(encoded_block).hexdigest()

    def is_chain_valid(self,chain):
        previous_block = chain[0] # to check the block from genesis block
        block_index = 1
        while block_index < len(chain):
            block = chain[block_index] #getting the current block we are on 
            if block['previous_hash'] != self.hash(previous_block):
                return False
            
            #second check is proof of each block is valid
            previous_proof = previous_block['proof']
            proof = block['proof']
            #now to check we do the same thing we did to make the problem that is check hash operation
            hash_operation = hashlib.sha256(str(proof**2 - previous_proof**2).encode()).hexdigest() 
            if hash_operation[:4] != '0000':
                return False
            previous_block = block
            block_index +=1
        return True
    
# Part 2 - Mining our BlockChain
#Creating a web app to interact with web on postman
app = Flask(__name__)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = False
#creating an intance  BlockChain
blockchain = BlockChain()

#to mine new block 
@app.route("/mine_block", methods=['GET'])
def mine_block():
    #getting the last block of the chain
    previous_block = blockchain.get_previous_block()
    #now we need previous proof to call the proof of work function
    previous_proof = previous_block['proof']
    #calling proof_of_work - so that we have exact value of proof that makes exact no of zeros. Now when ever hash is called it will aslo generate n0's hash becaus of proof or nounce 
    proof = blockchain.proof_of_work(previous_proof)
    #note the hash for prev block is not stored anywhere so to get it also we use hash 
    previous_hash = blockchain.hash(previous_block)
    block = blockchain.create_block(proof,previous_hash)
    #to display in postman 
    response = {
        'message' : 'Congratulation you just mineda block',
        'index' : block['index'],
        'timestamp': block['timestamp'],
        'proof' : block['proof'],
        'previous_hash':block['previous_hash']
        }
    return jsonify(response),200  #status https code

#To get a state of a blockChain
@app.route("/get_chain", methods=['GET'])

#to display the whole blockchain
def get_chain():
    response = { 
        'chain' : blockchain.chain,
        'length' : len(blockchain.chain)
    }
    return jsonify(response),200
@app.route("/is_valid", methods=['GET'])
def is_valid():
    check_valid = blockchain.is_chain_valid(blockchain.chain)
    if check_valid:
        response = {
            'message': 'The blockchain is valid, each block is verified',
            'length' : len(blockchain.chain)
        }
    else:
        response = {
            'message': 'The blockchain is not valid, someone tempered with the blocks',
            'length' : len(blockchain.chain)           
        }
    return jsonify(response),200
#to run this app
app.run(host = os.getenv("HOST_VALUE"),port=os.getenv("PORT"))