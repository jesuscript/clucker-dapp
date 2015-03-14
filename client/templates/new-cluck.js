Template.newCluck.events({
  "submit form": function(e, tmpl){
    e.preventDefault();
    var $text = tmpl.$(".cluck-text");
    var body = $text.val().match(/.{1,32}/g);
    TwitterContract.tweet(body[0] || "", body[1] ||"", body[2] ||"");

    $text.val("");

    Session.set("newCluck_submitting", true);
  },
  "keyup .cluck-text": function(e, tmpl){
    Session.set("newCluck_textChars", tmpl.$(".cluck-text").val().length);
  }
});

Eth.onNewBlock(function(){
  Session.set("newCluck_submitting");
});


Template.newCluck.helpers({
  submitting: function(){
    return Session.get("newCluck_submitting");
  },
  disabledIf: function(bool){
    return bool ? "disabled" : "";
  },
  charsLeft: function(){
    return 96 - (Session.get("newCluck_textChars") || 0);
  }
});
