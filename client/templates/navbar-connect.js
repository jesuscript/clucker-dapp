Template.navbarConnect.events({
  "submit [form-connect]": function(e,tmpl){
    e.preventDefault();

    Eth.start(tmpl.$("[form-connect] input").val());
  },
  "click [btn-disconnect]": function(e){
    e.preventDefault();
    Eth.stop();
  }
});


Template.navbarConnect.helpers({
  connected: function(){
    return Eth.state.isActive();
  }
});
