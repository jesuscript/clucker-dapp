NameregContract = new Contract({
  src: "/contracts/namereg.sol",
  address: "0x49699194ece4a9fca6be2f2b718c9fe964d0b87f",
  
  desc: [{
    name: "register(string32)",
    type: "function",
    inputs: [{
      name: "name",
      type: "string32"
    }],
    outputs: []
  }, {
    name: "getName(address)",
    type: "function",
    inputs: [{
      name: "a",
      type: "address"
    }],
    outputs: [{
      name: "name",
      type: "string32"
    }]
  }]
});

var blockDep = new Tracker.Dependency;

Eth.onNewBlock(function(){
  blockDep.changed();
});

NameregContract.reactive = {};

NameregContract.reactive.getName = function(addr){
  blockDep.depend();
  
  return NameregContract.call().getName(addr);
};


