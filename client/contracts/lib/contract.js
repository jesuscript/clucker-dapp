Contract = function(spec){
  var self = this;
  
  return _.extend(Eth.web3.eth.contract(spec.address, spec.desc), this);
};

