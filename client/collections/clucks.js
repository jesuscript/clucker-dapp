Clucks = new Mongo.Collection("clucks", {connection: null});

Clucks.attachSchema(new SimpleSchema({
  sender: {
    type: String
  },
  body: {
    type: String
  },
  numId: {
    type: Number
  }
}));

Clucks.helpers({
  senderName: function(){
    return NameregContract.reactive.getName(this.sender) || this.sender;
  }
});
