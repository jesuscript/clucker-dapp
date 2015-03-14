Template.registerModal.events({
  "submit form": function(e, tmpl){
    e.preventDefault();
    var name = tmpl.$("[name=username]").val();

    if(name){
      NameregContract.register(name);
      $("#register-modal").modal("hide");
    }
  }
});
