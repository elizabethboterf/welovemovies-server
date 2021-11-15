const knex = require("../db/connection");

function list(){
    console.log(knex("movies").select("*"));
    return knex("movies").select("*");
}

function read(movieId){
    return knex("movies")
    .select("*")
    .where({"movies.movie_id": movieId})
    .first();
}

module.exports={
    list,
    read
};