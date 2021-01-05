var mongoose  = require('mongoose');
var Schema = mongoose.Schema;
var passportlocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    admin:{
 		type: Boolean,
 		default: false
		 },
         facebookId:String,
    firstname:{
    	type:String,
    	default: ''
    },
    lastname:{
    	type:String,
    	default: ''
    }
	
});
User.plugin(passportlocalMongoose);

module.exports = mongoose.model('User',User);