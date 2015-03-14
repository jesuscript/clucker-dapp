Template.clucks.helpers({
  clucks: function(){
    return Clucks.find({}, {sort: {numId: -1}}).fetch();
  }
});
