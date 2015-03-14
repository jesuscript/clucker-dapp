Cluckers = new Meteor.Collection("cluckers", {connection: null});

Cluckers.attachSchema(new SimpleSchema({
  name: {
    type: String
  }
}));
