const errorBoundary = require("../errors/asyncErrorBoundary");
const service= require("./reviews.service");
const reduceProperties = require("../utils/reduce-properties");
const mapProperties = require("../utils/map-properties");

const configuration = {
    critic_id:  ["critic",null,"critic_id"],
    preferred_name: ["critic", null, "preferred_name"],
    surname: ["critic", null, "surname"],
    organization_name: ["critic", null, "organization_name"],
};

const reduceReviews = reduceProperties("review_id", configuration);
const nonArray = (reviews)=>{
    const reduced = reduceReviews(reviews)
    const finished= reduced.map((review)=>{
        const critic = review.critic;
        return ({
            ...review,
            critic: critic[0]
        });
    });
    return finished;
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
    //console.log(reviews);
    reviews=nonArray(reviews);
    res.status(200).json({data: reviews});
}

async function update(req, res){
    const {score, content, review}= res.locals;
    const newReview={
        ...review,
        score: score,
        content: content
    };
    const response = await service.update(newReview);
    console.log(repsonse);
    const data= nonArray(response);
    res.status(200).json({data: data});
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