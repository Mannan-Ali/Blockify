# -*- coding: utf-8 -*-
"""
Created on Sun Nov 17 12:02:43 2024
"""
print("Hello World")


#Importing the libraries 
# To get the exact time when the block is created 
import datetime 
# To hash the blocks 
import hashlib 
# To encode the block before hasing them 
import json 
'''
as we will create an object of flask that will server as an web appliacation itself
we will use jsonify to returm messages using which we can interact with blockchain
also when a new block will be mined we will use it to jsonfiy to return the key information for this mined block
'''
from flask import Flask,jsonify


# Part 1 - Building a BlockChain
class BlockChain :
    
    def __init__(self) :
        #this is the chain part of the block it is basically a list containing blocks
        self.chain = []
        '''
        genesis block
        we are calling the function here to create the genesis block, we are basically  making it with default parameters so genesisblock is automatically created
        prev_hash is in quotes becaouse we will use hashlib on it whcih take quoted values,
        By calling self.create_block(proof=1, prev_hash='0') inside __init__, you ensure that every blockchain starts with a genesis block, which is a foundational block and the starting point for any blockchain.
        why proof = 1?
        For the genesis block, there’s no prior block or need for complex calculations. Thus, it's common practice to set a simple, fixed proof value like 1.
        '''
        self.create_block(proof =1,prev_hash = '0')
        

# Part 2 - Mining our BlockChain

# function 1() To get a state of a blockChain

#function 2 () to mine new block 