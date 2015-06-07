var Schema = {
  user: {
  	id: {type: 'increments', nullable: false, primary: true},
  	name: {type: 'string', nullable: false},
  	email: {type: 'string', nullable: false, unique: true},
  	password: {type: 'string', nullable: false},
    token: {type: 'string', nullable: true}
  },

  article: {
  	id: {type: 'increments', nullable: false, primary: true},
	  headline: {type: 'string', nullable: false},
	  content: {type: 'string', nullable: false},
	  url: {type: 'string'},
	  date: {type: 'dateTime', nullable: false},
	  source: {type: 'string'},
	  author: {type: 'string'}
  },

  asset: {
  	id: {type: 'increments', nullable: false, primary: true},
	  flag_stock:  {type: 'string', nullable: false},
	  flag_bond:  {type: 'string', nullable: false},
	  flag_index:  {type: 'string', nullable: false},
	  flag_currency:  {type: 'string', nullable: false},
	  flag_commidities:  {type: 'string', nullable: false}
  },

  company: {
  	id: {type: 'increments', nullable: false, primary: true},
	  name: {type: 'string', nullable: false},
	  alias1: {type: 'string'},
	  alias2: {type: 'string'},
	  wiki_url: {type: 'string'},
	  linkedin_url: {type: 'string'},
	  stock_sticker: {type: 'string', nullable: false}
  },

  price: {
  	id: {type: 'increments', nullable: false, primary: true},
	  date: {type: 'dateTime', nullable: false},
	  price: {type: 'double'}
  },

  person: {
    id: {type: 'increments', nullable: false, primary: true},
    first_name: {type: 'string', nullable: false},
    last_name: {type: 'string', nullable: false},
    wiki_url: {type: 'string'},
    linkedin_url: {type: 'string'},
    employer: {type: 'string', nullable: false},
    job_title: {type: 'string', nullable: false},
    job_info: {type: 'string', nullable: false}
  }
}

module.exports = Schema;
