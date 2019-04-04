
'use strict'
const { TransactionHandler } = require('sawtooth-sdk/processor/handler')
const {
    InvalidTransaction,
    InternalError
} = require('sawtooth-sdk/processor/exceptions')
const crypto = require('crypto')
const { TextEncoder, TextDecoder } = require('text-encoding/lib/encoding')

const _hash = (x) => crypto.createHash('sha512').update(x).digest('hex').toLowerCase().substring(0, 64)
var encoder = new TextEncoder('utf8')
var decoder = new TextDecoder('utf8')
const MIN_VALUE = 0
const SW_FAMILY = 'stockmanagement'
const SW_NAMESPACE = _hash(SW_FAMILY).substring(0, 6)

//function to obtain the payload obtained from the client
var _decodeRequest = function _decodeRequest(payload) {
    payload = payload.toString().split(',');
    if (payload.length === 2) {
        var payload_data = {
          action: payload[0],
          quantity: payload[1]
        }
    }
    else if (payload.length === 3) {
       var payload_data = {
        action: payload[0],
        quantity: payload[1],
        sendTo: payload[2]
       }
    }     
       else {
        throw new InvalidTransaction('Invalid payload serialization');
        
      }
      if (!payload_data.action) {
        throw new InvalidTransaction('Action is required');
      }
      var quantity = payload_data.quantity;
      if (quantity === null || quantity === undefined) {
        throw new InvalidTransaction('Value is required');
      }
      quantity = parseInt(quantity);
      if (typeof quantity !== "number" || quantity <= MIN_VALUE) {
        throw new InvalidTransaction('Value must be an integer ' + 'no less than 1');
      }
  return payload_data
  }
    //function to display the errors
    const _toInternalError = (err) => {
        console.log(" in error message block")
        let message = err.message ? err.message : err
        throw new InternalError(message)
    }

    //function to set the entries in the block using the "SetState" function
    const _setEntry = (context, address, stateValue) => {
        let dataBytes = encoder.encode(stateValue)
        let entries = {
            [address]: dataBytes
        }
        return context.setState(entries)
    };
    
    //function to make a stock adding transaction
const addStock =(context, address, quantity, user)  => (possibleAddressValues) => {
    let stateValueRep = possibleAddressValues[address]
    let newStock = 0
    let stock
    if (stateValueRep == null || stateValueRep == ''){
      console.log("No previous stock available, adding new stock")
      newStock = quantity
    }
    else{
      stock = decoder.decode(stateValueRep)
      newStock = parseInt(stock) + quantity
      console.log("quantity adding:"+newStock)
    }
    let strnewStock = newStock.toString()
    return _setEntry(context, address, strnewStock)
  }
    //function to send a request action
    const sendRequest = (context, senderAddress, quantity, receiverAddress) => (possibleAddressValues) => {
        
        let currentEntry = possibleAddressValues[senderAddress]
        let currentEntryTo = possibleAddressValues[receiverAddress]
        let retailerStock
        let retailerNewStock = 0
        if (currentEntry == null || currentEntry == '')
            console.log("No wholsesale agent available")
        if (currentEntryTo == null || currentEntryTo == '')
            console.log("No retail agent available")
        retailerStock = decoder.decode(currentEntryTo)
        retailerStock = parseInt(retailerStock)
        if (retailerStock > quantity) {
            throw new InvalidTransaction("stock requested must be greater than the stock available")
        }
        else {
            console.log("sending request to" + receiverAddress + "for" + quantity)
            let stateData = wholesalerNewStock.toString()
            _setEntry(context, senderAddress, stateData)
            stateData = retailerNewStock.toString()
            return _setEntry(context, receiverAddress, stateData)
        }
    }
    //function to accept a request action
    acceptRequest = (context, senderAddress, quantity, receiverAddress) => (possibleAddressValues) => {
        let wholesalerStock
        let currentEntry = possibleAddressValues[senderAddress]
        let currentEntryTo = possibleAddressValues[receiverAddress]
        let wholesalerNewStock = 0
        let retailerStock
        let retailerNewStock = 0
        if (currentEntry == null || currentEntry == '')
            console.log("No wholsesale agent available")
        if (currentEntryTo == null || currentEntryTo == '')
            console.log("No retail agent available")
        wholesalerStock = decoder.decode(currentEntry)
        wholesalerStock = parseInt(wholesalerStock)
        retailerStock = decoder.decode(currentEntryTo)
        retailerStock = parseInt(retailerStock)
        if (wholesalerStock < quantity) {
            throw new InvalidTransaction("not much quanitiy of product in your stock")
        }
        else {
            console.log("Transfering from wholesaler" + quantity)
            wholesalerNewStock = wholesalerStock - quantity
            retailerNewStock = retailerStock + quantity
            let stateData = wholesalerNewStock.toString()
            _setEntry(context, senderAddress, stateData)
            stateData = retailerNewStock.toString()
            console.log("Wholesaler stock" + wholesalerNewStock + ", Retailer Stock" + retailerNewStock)
            return _setEntry(context, receiverAddress, stateData)
        }
    }

    class StockManagementHandler extends TransactionHandler {
        constructor() {
            super(SW_FAMILY, ['1.0'], [SW_NAMESPACE])
        }
        apply(transactionProcessRequest, context) {
            return _decodeRequest(transactionProcessRequest.payload)
                .catch(_toInternalError)
                .then((update) => {
                    let header = transactionProcessRequest.header
                    let userPublicKey = header.signerPublicKey
                    let action = update.action

                    // Select the action to be performed
                    let actionFn
                    if (update.action === 'deposit') { 
                        actionFn = addStock
                      }
                      else if (update.action === 'request') {
                        actionFn = sendRequest
                      }
                      else if (update.action === 'transfer') {
                        actionFn = acceptRequest
                      }
                      else if(update.action ==='stock') {
                        actionFn = showStock
                      }
                    else {
                        throw new InvalidTransaction(`Action must be create or take not ${update.action}`)
                    }
                    let senderAddress = SW_NAMESPACE + _hash(userPublicKey).slice(-64)
                    // this is the key obtained for the beneficiary in the payload , used only during transfer function
                    let beneficiaryKey = update.sendTo
                    let receiverAddress
                    if (beneficiaryKey != undefined) {
                        receiverAddress = SW_NAMESPACE + _hash(update.sendTo).slice(-64)
                    }
                    // Get the current state, for the key's address:
                    let getPromise
                    if (update.action == 'transfer')
                        getPromise = context.getState([senderAddress, receiverAddress])
                    else
                        getPromise = context.getState([senderAddress])
                    let actionPromise = getPromise.then(
                        actionFn(context, senderAddress, quantity, receiverAddress)
                    )
                    return actionPromise.then(addresses => {
                        if (addresses.length === 0) {
                            throw new InternalError('State Error!')
                        }
                    })
                })
        }
    }

module.exports = StockManagementHandler
