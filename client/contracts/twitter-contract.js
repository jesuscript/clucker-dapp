var _ = lodash;

TwitterContract = new Contract({
  src: "/contracts/twitter.sol",
  address: "0xae75ab04043cd190bb208e360660c3b42cd924c5",
  desc: [{
    "name": "getTweetCount()",
    "type": "function",
    "inputs": [
    ],
    "outputs": [
      {
        "name": "c",
        "type": "uint"
      }
    ]
  },{
    name: "getTweet(uint256)",
    "type": "function",
    "inputs": [{
      name: "index",
      type: "uint"
    }],
    outputs: [{
      name: "sender",
      type: "address"
    },{
      name: "t1",
      type: "string32"
    },{
      name: "t2",
      type: "string32"
    },{
      name: "t3",
      type: "string32"
    }]
  },{
    name: "tweet(string32,string32,string32)",
    type: "function",
    inputs: [{
      name: "t1",
      type: "string32"
    },{
      name: "t2",
      type: "string32"
    },{
      name: "t3",
      type: "string32"
    }],
    outputs: []
  }],
  track: ["getTweetCount", "getTweet"] //TODO shouldn't probably even need this
});

Eth.onNewBlock(function(){
  updateClucks();
});


function updateClucks(){
  //console.log("update clucks");
  var rStart = (Clucks.findOne({}, {sort: {numId: -1}}) || {numId: 0}).numId,
      rEnd = TwitterContract.call().getTweetCount();

  _.each(_.range(rStart,rEnd), function(i){
    var cluck = TwitterContract.call().getTweet(i);

    Clucks.upsert({numId: i}, {
      $set: {
        sender: cluck[0],
        body: cluck.slice(1).join(""),
        numId: i
      }
    });
  });
}
