var _ = lodash;

CluckerContract = new Contract({
  address: "0xcbca10ab33a6bba91044303eda06487aa7f992a6",
  desc: [
    {
      "constant":false,
      "inputs":[
        { "name":"index", "type":"uint256" }
      ],
      "name":"getCluck",
      "outputs":[
        {"name":"name","type":"string32"},
        {"name":"sender","type":"address"},
        {"name":"c1","type":"string32"},
        {"name":"c2","type":"string32"},
        {"name":"c3","type":"string32"}
      ],
      "type":"function"
    },
    {
      "constant":false,
      "inputs":[],
      "name":"getCluckCount",
      "outputs":[
        {"name":"c","type":"uint256"}
      ],
      "type":"function"
    },
    {
      "constant":true,
      "inputs":[],
      "name":"nameregAddr",
      "outputs":[
        {"name":"","type":"address"}
      ],
      "type":"function"
    },
    {
      "constant":false,
      "inputs":[
        {"name":"name","type":"string32"}
      ],
      "name":"registerName",
      "outputs":[],
      "type":"function"
    },
    {
      "constant":false,
      "inputs":[
        {"name":"c1","type":"string32"},
        {"name":"c2","type":"string32"},
        {"name":"c3","type":"string32"}
      ],
      "name":"cluck",
      "outputs":[],
      "type":"function"
    }
  ]
});

Eth.onNewBlock(function(){
  updateClucks();
});


function updateClucks(){
  //console.log("update clucks");
  var rStart = (Clucks.findOne({}, {sort: {numId: -1}}) || {numId: 0}).numId,
      rEnd = CluckerContract.call().getCluckCount();

  _.each(_.range(rStart,rEnd), function(i){
    var cluck = CluckerContract.call().getCluck(i);

    Clucks.upsert({numId: i}, {
      $set: {
        sender: cluck[0] || cluck[1],
        body: cluck.slice(2).join(""),
        numId: i
      }
    });
  });
}
