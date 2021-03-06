const express = require('express');
const bodyParser =require('body-parser');
const mongoose =require('mongoose');
const Leaders =require('../models/leaders');
const authenticate=require('../authenticate');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());
leaderRouter.route('/')
.get((req,res,next)=>{
Leaders.find({}).then((Leaders)=> {
	res.statusCode = 200;
	res.setHeader('Content-Type','application/json');
	res.json(Leaders);
},(err)=>next(err)).catch((err) => next(err));

})
.post(authenticate.verifyUser,(req,res,next)=>{
Leaders.create(req.body)
.then((leader) => {
	console.log('leader created',leader);
	res.statusCode = 200;
	res.setHeader('Content-Type','application/json');
	res.json(leader);

},(err)=>next(err)).catch((err) => next(err));
})
.put(authenticate.verifyUser,(req,res,next)=>{
	res.statusCode=403;
res.end('Put operation not supported no /Leaders');

})
.delete(authenticate.verifyUser,(req,res,next)=>{
Leaders.remove({}).then((resp)=>
{
    res.statusCode = 200;
	res.setHeader('Content-Type','application/json');
	res.json(resp);	
},(err)=>next(err)).catch((err) => next(err));
});

leaderRouter.route('/:leaderId')
.get((req,res,next)=>{
Leaders.findById(req.params.leaderId).then((leader) => {
	res.statusCode = 200;
	res.setHeader('Content-Type','application/json');
	res.json(leader);

},(err)=>next(err)).catch((err) => next(err));
})
.post(authenticate.verifyUser,(req,res,next)=>{
res.statusCode=403;
res.end('Post operation 403 not supported no /Leaders/'+req.params.leaderId);
})
.put(authenticate.verifyUser,(req,res,next)=>{
	Leaders.findByIdAndUpdate(req.params.leaderId,{
		$set: req.body
	},{new: true}).then((leader) => {
	res.statusCode = 200;
	res.setHeader('Content-Type','application/json');
	res.json(leader);

},(err)=>next(err)).catch((err) => next(err));

})
.delete(authenticate.verifyUser,(req,res,next)=>{
Leaders.findByIdAndRemove(req.params.leaderId)
.then((resp)=>
{
    res.statusCode = 200;
	res.setHeader('Content-Type','application/json');
	res.json(resp);	
},(err)=>next(err)).catch((err) => next(err));

});
module.exports= leaderRouter;


