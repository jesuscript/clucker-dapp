var web3 = require("web3"),
    active = false,
    error,
    activeDep = new Tracker.Dependency,
    errorDep = new Tracker.Dependency,
    newBlockDep = new Tracker.Dependency;

Eth = {
  web3: web3,
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
      if(web3.eth.listening){
        setActive(true);
        web3.eth.watch("chain").changed(function(){
          newBlockDep.changed();
        });
      } 
    }catch(e){
      error = e;
      errorDep.changed();
      setActive(false);
    }
  },
  onStart: function(cb){
    Tracker.autorun(function(comp){
      var isActive = Eth.state.isActive();

      if (isActive){
        Tracker.nonreactive(function(){cb();});
      }
    });
  },
  stop: function(){
    web3.reset();
    setActive(false);
  },
  currentBlock: function(){
    newBlockDep.depend();
    return web3.eth.block(web3.eth.number);
  },
  onNewBlock: function(cb){
    Tracker.autorun(function(comp){
      var b = Eth.currentBlock();

      if(b && !comp.firstRun) Tracker.nonreactive(function(){cb(b);});
    });
  }
};

Eth.start();

function setActive(state){
  if(active = !!state){
    error = undefined;
    errorDep.changed();
  }
  activeDep.changed();
}
