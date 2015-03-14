Template.currentAccountInfo.helpers({
  username: function(){
    var addr = Eth.web3.eth.coinbase;

    if(Eth.currentBlock()){
      return NameregContract.reactive.getName(addr) || addr;
    }
  },
  balance: function(){
    if(Eth.currentBlock()){
      return Eth.web3.toEth(Eth.web3.eth.balanceAt(Eth.web3.eth.coinbase));
    }
  }
});
