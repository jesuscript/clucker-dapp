TwitterContract = Eth.contract({
  src: "/contracts/twitter.sol",
  address: "0xa4f1109dfae21715db2d6e82699f704f45ae12b4",
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
  }]
});

