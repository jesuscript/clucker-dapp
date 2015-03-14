Template.web3ErrorNotifications.helpers({
  alert: function(){
    var err = Eth.state.error();
    if(err){
      return err.name + ": " + err.message;
    }
  }
});
