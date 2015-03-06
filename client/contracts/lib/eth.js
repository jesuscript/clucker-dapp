var web3 = require("web3"),
    active = false,
    error,
    activeDep = new Tracker.Dependency,
    errorDep = new Tracker.Dependency;

Eth = {
  state: {
    isActive: function(){
      activeDep.depend();
      return active;
    },
    error: function(){
      errorDep.depend();
      return error;
    }
  },
  start: function(host){
    try{
      web3.setProvider(new web3.providers.HttpSyncProvider(host));
      if(web3.eth.listening) setActive(true);
    }catch(e){
      error = e;
      errorDep.changed();
      setActive(false);
    }
  },
  stop: function(){
    web3.reset();
    setActive(false);
  },
  contract: function(spec){
    return web3.eth.contract(spec.address, spec.desc);
  }
};

Eth.start();

function setActive(state){
  if(active = !!state){
    error = undefined;
  }
  errorDep.changed();
  activeDep.changed();
}
