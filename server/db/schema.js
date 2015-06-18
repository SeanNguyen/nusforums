var Schema = {
  users: {
  	id: {type: 'increments', nullable: false, primary: true},
  	username: {type: 'string', nullable: false, unique: true},
  	email: {type: 'string', nullable: false, unique: true},
    role: {type: 'integer', nullable: true},
    nOfNewsTagged: {type: 'integer', nullable: true},
    nOfUpVotes: {type: 'integer', nullable: true},
    nOfDownVotes: {type: 'integer', nullable: true},
    nOfUpVotesReceived: {type: 'integer', nullable: true},
    nOfDownVotesReceived: {type: 'integer', nullable: false},
    firstName: {type: 'string', nullable: false},
    middleName: {type: 'string', nullable: true},
    lastName: {type: 'string', nullable: false},
    nickNameOnline: {type: 'string', nullable: true},
    signupDate: {type: 'dateTime', nullable: false},
    photo: {type: 'string', nullable: true},
    FB1: {type: 'string', nullable: true},
    FB2: {type: 'string', nullable: true},
    FB3: {type: 'string', nullable: true},
    FB4: {type: 'string', nullable: true},
    FB5: {type: 'string', nullable: true},
  	password: {type: 'string', nullable: false},
    token: {type: 'string', nullable: true}
  },

  news: {
  	newsID: {type: 'increments', nullable: false, primary: true},
	headline: {type: 'string', nullable: false},
	content: {type: 'string', nullable: true},
	date: {type: 'dateTime', nullable: false},
	author: {type: 'string', nullable: true},
    source: {type: 'string', nullable: true},
    url: {type: 'string', nullable: true},
    BYLINE: {type: 'string', nullable: true},
    DATELINE: {type: 'string', nullable: true},
    LENGTH: {type: 'string', nullable: true},
    PUBLICATION: {type: 'string', nullable: true},
    SECTION: {type: 'string', nullable: true},
    COMPANY: {type: 'string', nullable: true},
    GEOGRAPHIC: {type: 'string', nullable: true},
    INDUSTRY: {type: 'string', nullable: true},
    ORGANIZATION: {type: 'string', nullable: true},
    PERSON: {type: 'string', nullable: true},
    SUBJECT: {type: 'string', nullable: true},
    TICKER: {type: 'string', nullable: true}
  },

  news_checked: {
    id: {type: 'increments', nullable: false, primary: true},
    newsID: {type: 'integer', nullable: false, references: 'news.newsID'},
    predictorID: {type: 'integer', nullable: false, references: 'predictor.id'},
    userID: {type: 'integer', nullable: false, references: 'users.id'},
    assetID: {type: 'integer', nullable: true, references: 'asset.id'},
    upDown: {type: 'string', nullable: false},
    time: {type: 'string', nullable: false},
    assetNotAvailable: {type: 'integer', nullable: true},
    CannotTell: {type: 'integer', nullable: true},
    NoPrediction: {type: 'integer', nullable: true},
    timeStamp: {type: 'dateTime', nullable: false},
    remarks: {type: 'string', nullable: true}, 
    downVote: {type: 'integer', nullable: false},
    upVote: {type: 'integer', nullable: false},
    targetPrice: {type: 'integer', nullable: false},
    original_sentence: {type: 'string', nullable: true}
  },

  asset: {
  	id: {type: 'increments', nullable: false, primary: true},
	assetName: {type: 'string', nullable: false},
    assetType: {type: 'string', nullable: false},
    assetRegion: {type: 'string', nullable: false},
    otherID: {type: 'string', nullable: false},
    description: {type: 'string', nullable: false},
    displayName: {type: 'string', nullable: false},
    ticker1: {type: 'string', nullable: true},
    ticker2: {type: 'string', nullable: true}, 
    ticker3: {type: 'string', nullable: true},
    ticker4: {type: 'string', nullable: true},
    ticker5: {type: 'string', nullable: true}
  },
  
  assetprice: {
    yahooID: {type: 'string', nullable: false, primary: true},
    date: {type: 'dateTime', nullable: false, primary: true},
    open: {type: 'double', nullable: false},
    high: {type: 'double', nullable: false},
    low: {type: 'double', nullable: false},
    close: {type: 'double', nullable: false},
    volume: {type: 'double', nullable: false},
    adjClose: {type: 'double', nullable: false}
  },

  predictor: {
    id: {type: 'increments', nullable: false, primary: true},
    firstName: {type: 'string', nullable: false},
    middleName: {type: 'string', nullable: true},
    lastName: {type: 'string', nullable: false},
    commonName: {type: 'string', nullable: true},
    currentTitle: {type: 'string', nullable: false},
    description: {type: 'string', nullable: true},
    photo: {type: 'string', nullable: true}, 
    wiki_URL: {type: 'string', nullable: true}
  }
}

module.exports = Schema;
