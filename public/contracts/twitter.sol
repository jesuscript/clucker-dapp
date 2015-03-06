contract twitter {
 struct Tweet{
		address sender;
		mapping (uint => string32) tweet_text;
		uint text_len;
		
	}

	mapping (uint => Tweet) tweets;
	uint tweet_count;

	function twitter(){
		tweet_count = 0;
		
	}

	function tweet(string32 t1,string32 t2,string32 t3){
		Tweet t = tweets[tweet_count];
		t.twat = msg.sender;

		t.tweet_text[0] = t1;
		t.tweet_text[1] = t2;
		t.tweet_text[2] = t3;

		tweet_count++;
		
	}

	function getTweet(uint index) returns(address sender, string32 t1,string32 t2,string32 t3){
		Tweet t = tweets[index];
		sender = t.sender;
		t1 = t.tweet_text[0];
		t2 = t.tweet_text[1];
		t3 = t.tweet_text[2];
		
	}

	function getTweetCount() returns(uint c){
		return tweet_count;
	}
}
