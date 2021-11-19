const service = require("./movies.service");
const errorBoundary= require("../errors/asyncErrorBoundary");

//middleware
async function ifExists (req, res, next){
    const foundMovie= await service.read(req.params.movieId);
    if(foundMovie){
        res.locals.movie = foundMovie;
        return next();
    }else{
        next({status: 404, message:`Movie cannot be found.`});
    }
}

//VERB handlers
async function list (req, res, next){
    const {is_showing} = req.query;
    let movies;
    console.log(is_showing);
    if(is_showing){
      movies = await service.listIsShowing();
      console
    }else{
      movies = await service.list();
    }
    res.status(200).json({data:movies});
}

function read (req,res){
    res.status(200).json({data: res.locals.movie});
}

module.exports={
    list: [errorBoundary(list)],
    read: [errorBoundary(ifExists), read],
    ifExists: [errorBoundary(ifExists)],
};