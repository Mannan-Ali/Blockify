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
import os
# To get the exact time when the block is created 
import datetime 
# To hash the blocks 
import hashlib 
# To encode the block before hasing them 
import json 
from flask import Flask,jsonify,request #this request works like post and form in js , it will be used to get data from the user (like the data we send in postman) or  get data from incoming HTTP requests sent to your Flask app.
import requests
'''
You use requests to interact with APIs (other programs running on different servers). For example, if you want to get information from another server or send data to a server, you can use requests.
The requests library in Python is like a tool that allows your program to talk to other programs over the internet. In your decentralized blockchain, the nodes (computers) need to communicate with each other to keep their blockchain copies in sync.
# Sending a GET request to fetch data
response = requests.get('http://example.com/data')
similar to fetch 

DIFFERENCE BETWEEN REQUEST(FLAST) AND REQUESTS:
    =>The request object in Flask is part of the Flask web framework, and it is used to handle incoming HTTP requests to your Flask server. This object is available to you in your route handlers.
    =>It provides you with data about the request that was made to your Flask application, such as query parameters, form data, JSON data, etc.
    =>Example Use Case: If your Flask app is running a node in the blockchain and someone sends a POST request to add a new block, the request object in Flask will be used to receive and handle that incoming data.

    =>The requests library is a Python package that allows you to send HTTP requests (GET, POST, PUT, etc.) from your Python application to other servers.
    =>It's typically used when your Python program needs to request data from or send data to external servers or APIs (like another node in your blockchain network).
    =>Example Use Case: If your Python blockchain node wants to check what other nodes have, it can use requests to ask them for their blockchain data.
      Focus: Outgoing HTTP requests from your program to other servers.

'''

from uuid import uuid4
from urllib.parse import urlparse
#Flask 3.1.0
#requests 2.18.4
#python-dotenv 1.0.1

# Part 1 - Changes on Building a BlockChain to fit the cryptocurrency
class BlockChain :
    def __init__(self) :
        #this is the chain part of the block it is basically a list containing blocks
        self.chain = []

        #CHANGE 1:
        #list to append the transections that will be happening around the world before putting them in block
        #it should be before create block as it will be used in it (like in cpp above we need to declare the func in class to let the compiler know)
        self.transactions = []
        self.create_block(proof =1,previous_hash = '0000')
        self.nodes = set()  #its the commputer/miner/users on the network; to add them to the network
        #like till now we were dealing with one node address 127.0.0.1/5000 but now we will add more like it 5001,...2
    def create_block(self,proof,previous_hash):
        block = {
            'index':len(self.chain)+1, #as the new block will be lenght plus 1 digit 
            'timestamp': str(datetime.datetime.now()), #exact time block is mined
            'proof' : proof, #The proof that we get when mining our block by solving our proof of work
            'previous_hash':previous_hash,
            'transactions' : self.transactions
            }
        self.transactions = [] # after transections are added to the block we need to empty the list
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

    #CHANGE 2:
    #here the transection structure is defined and added to transaction list-(this list is choosen by the miner from the mempool)
    def add_transactions(self,sender,receiver,amount):
        self.transactions.append(
            {
                'sender':sender,
                'receiver':receiver,
                'amount': amount,
            }
        )
        #we will return the index of the block that will receive this transection
        previous_block = self.get_previous_block()
        return previous_block['index']+1  #basicaly we are passing the number of block that will have our transection


    #address is the address of the node over the network
    def add_node(self,address):
        #we will parse the address of the node first
        parsed_url = urlparse(address)
        self.nodes.add(parsed_url.netloc)#addnig the '127.0.0.1:5000' to nodes (hepls to know which nodes are on our netwrok or using our blockchian)
        #also now we can perform function like avalanch effect, and consenses
        '''
        what does parse url do 
        >>> from urllib.parse import urlparse
        >>> address = 'http://127.0.0.1:5000/'
        >>> parsed_url = urlparse(address)
        >>> parsed_url
        Output : ParseResult(scheme='http', netloc='127.0.0.1:5000', path='/', params='', query='', fragment='')
        we take out the netlock part as we only need that part
        '''
    
    '''
    What is the consensus? That is just an algorithm to make sure that all the nodes contain the same chain at any time, t.
    So whenever a new block is mined on any node, you know, to welcome some new transactions that happen around that node, well, we will make sure that all the other nodes
    in the decentralized network are also updated with the same chain.And that's very important when we implement a blockchain because indeed that's one of the pillars of the blockchain.
    '''
    #CHECKING THE CONSENSUS
    # since each node contains a specific version of the blockchain, whether it is up to date or not, well, we will need to apply this replace_chain function inside a specific node
    def replace_chain(self):
        network = self.nodes #all the nodes will make network basic
        #we will find this if it exits we will replace all the chains of all the nodes over the network with these
        longest_chain = None 
        max_length = len(self.chain) #we initialized it with current chains length so when we iterate we can check if any chain is longer than this one we will replace it 
        for node in network: #checking all nodes in the network
            #the node here contains the address that we set in add_node so we can use it to get to different nodes
            response = requests.get(f'http://{node}/get_chain')#here we are requesting for our own functions response which gives the chain and its length in return which we can compare here (we ask for get_chain for all the nodes)   

            if response.status_code == 200: # checking if everything fine then move ahead
                length = response.json()['length'] #taking the length from response
                chain = response.json()['chain'] #taking the chain from response
                if length > max_length and self.is_chain_valid(chain):
                    max_length = length 
                    longest_chain = chain
        
        if longest_chain: #by  checking this we are cheking if the chain was replaced or not and if longest chain was found or not if yes return true
            self.chain = longest_chain # chan
            return True
        return False


# Part 2 - Changes : Mining our BlockChain with transections between person
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


#Part 3 : New Decentralizing our blockchain
#Inside which we will create a decentralized networkof several nodes and each one of you will be able to mine some blocks on any of these nodes


#Important points read
'''
1. what makes a blockchain a cryptocurrency?Well, the answer is transactions.The principle of cryptocurrency is that we're able to exchange these cryptocurrencies through transactions that are secured, added to new blocks, mined by the miners in the most secured way.
2.  now that we understand that, well, the key element we'll be adding into our blockchain class are these transactions.That's our first pillar. And then the second pillar will be to build a consensus function to make sure that each node
    =>in the decentralized network has the same chain. You know, because once some new transactions are integrated to a new block which is added to the blockchain, well, we need to make sure that all the nodes
    =>in the network get also their chain updated with this last mined block containing the transactions.And this particular check is called the consensus. So that's our two pillars for the development
'''



