const errorBoundary = require("../errors/asyncErrorBoundary");
const service= require("./reviews.service");
const mapProperties = require("../utils/map-properties");

const config = {
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name"
};
const addCritic= mapProperties(config);
const addCriticArray= (array)=>{
    return array.map((item)=>addCritic(item));
};

//middleware
async function ifExists(req, res, next){
    const {reviewId}= req.params;
    const foundReview= await service.read(reviewId);
    if(foundReview){
        res.locals.review=foundReview;
        return next();
    }else{
        next({status: 404, message:'Review cannot be found'});
    }
}

function hasScore(req, res, next){
    console.log(req.body.data);
    const {data: {score}={}}= req.body;
    console.log(score);
    if(score){
        res.locals.score=score;
        return next();
    }else{
        next({status: 400, message:`Must include score`});
    }
}

function hasContent(req, res, next){
    console.log(req.body.data);
    const {data: {content}={}}= req.body;
    console.log(content);
    if(content){
        res.locals.content=content;
        return next();
    }else{
        next({status: 400, message:`Must include content`});
    }
}

//HTTP Verb Handlers
async function list(req, res){
    const {movieId}= req.params;
    let reviews;
    if(movieId){
        reviews= await service.listByMovie(movieId);
    }else{
        reviews = await service.list();
    }
    reviews=addCriticArray(reviews);
    res.status(200).json({data: reviews});
}

async function update(req, res){
    const {score, content, review}= res.locals;
    const newReview={
        ...review,
        ...req.body.data,
        review_id: review.review_id
    };
    const data= await service.update(newReview);
    const formatReview = addCritic(data);
    res.status(200).json({data: formatReview});
}

async function destroy(req, res){
    const {review}= res.locals;
    await service.delete(review.review_id);
    res.sendStatus(204);
}

module.exports={
    list: [errorBoundary(list)],
    update: [errorBoundary(ifExists), hasContent, errorBoundary(update)],
    delete: [errorBoundary(ifExists), errorBoundary(destroy)]
};