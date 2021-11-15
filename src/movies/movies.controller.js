const movies = [
    {
      title: "Spirited Away",
      runtime_in_minutes: 125,
      rating: "PG",
      description:
        "Chihiro and her parents are moving to a small Japanese town in the countryside, much to Chihiro's dismay. On the way to their new home, Chihiro's father makes a wrong turn and drives down a lonely one-lane road which dead-ends in front of a tunnel. Her parents decide to stop the car and explore the area. They go through the tunnel and find an abandoned amusement park on the other side, with its own little town...",
      image_url:
        "https://imdb-api.com/images/original/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_Ratio0.6791_AL_.jpg",
    },
    {
      title: "Interstellar",
      runtime_in_minutes: 169,
      rating: "PG-13",
      description:
        "Earth's future has been riddled by disasters, famines, and droughts. There is only one way to ensure mankind's survival: Interstellar travel. A newly discovered wormhole in the far reaches of our solar system allows a team of astronauts to go where no man has gone before, a planet that may have the right environment to sustain human life...",
      image_url:
        "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_Ratio0.6716_AL_.jpg",
    },
    {
      title: "Rear Window",
      runtime_in_minutes: 112,
      rating: "PG",
      description:
        'Professional photographer L.B. "Jeff" Jefferies breaks his leg while getting an action shot at an auto race. Confined to his New York apartment, he spends his time looking out of the rear window observing the neighbors. He begins to suspect that a man across the courtyard may have murdered his wife. Jeff enlists the help of his high society fashion-consultant girlfriend Lisa Freemont and his visiting nurse Stella to investigate...',
      image_url:
        "https://m.media-amazon.com/images/M/MV5BNGUxYWM3M2MtMGM3Mi00ZmRiLWE0NGQtZjE5ODI2OTJhNTU0XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_Ratio0.6716_AL_.jpg",
    }
];

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
    const movies= await service.list();
    res.status(200).json({data:movies});
}

//if exist
function read (req,res,next){
    res.status(200).json({data: res.locals.movie});
}

module.exports={
    list: [errorBoundary(list)],
    read: [errorBoundary(ifExists), read],
};