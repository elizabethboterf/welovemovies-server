const { groupBy } = require("lodash");
const knex = require("../db/connection");

function list(){
    return knex("movies").select("*");
}

function read(movieId){
    return knex("movies")
    .select("*")
    .where({"movies.movie_id": movieId})
    .first();
}

function listIsShowing(){
    return knex("movies as m")
        .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
        .select("m.*")
        .where({"mt.is_showing": true})
        .groupBy("m.movie_id");
}

module.exports={
    listIsShowing,
    list,
    read
};