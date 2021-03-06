const express = require('express');
const bodyParser =require('body-parser');
const mongoose =require('mongoose');
const promos =require('../models/promotions');
const authenticate = require('../authenticate');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());
promoRouter.route('/')
.get((req,res,next)=>{
promos.find({}).then((promo)=> {
	res.statusCode = 200;
	res.setHeader('Content-Type','application/json');
	res.json(promo);
},(err)=>next(err)).catch((err) => next(err));

})
.post(authenticate.verifyUser,(req,res,next)=>{
promos.create(req.body)
.then((promo) => {
	console.log('promo created',promo);
	res.statusCode = 200;
	res.setHeader('Content-Type','application/json');
	res.json(promo);

},(err)=>next(err)).catch((err) => next(err));
})
.put(authenticate.verifyUser,(req,res,next)=>{
	res.statusCode=403;
res.end('Put operation not supported no /promos');

})
.delete(authenticate.verifyUser,(req,res,next)=>{
promos.remove({}).then((resp)=>
{
    res.statusCode = 200;
	res.setHeader('Content-Type','application/json');
	res.json(resp);	
},(err)=>next(err)).catch((err) => next(err));
});

promoRouter.route('/:promoId')
.get((req,res,next)=>{
promos.findById(req.params.promoId).then((promo) => {
	res.statusCode = 200;
	res.setHeader('Content-Type','application/json');
	res.json(promo);

},(err)=>next(err)).catch((err) => next(err));
})
.post(authenticate.verifyUser,(req,res,next)=>{
res.statusCode=403;
res.end('Post operation 403 not supported no /promos/'+req.params.promoId);
})
.put(authenticate.verifyUser,(req,res,next)=>{
	promos.findByIdAndUpdate(req.params.promoId,{
		$set: req.body
	},{new: true}).then((promo) => {
	res.statusCode = 200;
	res.setHeader('Content-Type','application/json');
	res.json(promo);

},(err)=>next(err)).catch((err) => next(err));

})
.delete(authenticate.verifyUser,(req,res,next)=>{
promos.findByIdAndRemove(req.params.promoId)
.then((resp)=>
{
    res.statusCode = 200;
	res.setHeader('Content-Type','application/json');
	res.json(resp);	
},(err)=>next(err)).catch((err) => next(err));

});
module.exports= promoRouter;


