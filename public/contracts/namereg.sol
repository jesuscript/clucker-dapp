contract Namereg {
  mapping(address => string32) names;

  function register(string32 name){
      names[msg.sender] = name;
  }

  function getName(address a) returns(string32 name){
      return names[a];
  }
}