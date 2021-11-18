const knex = require("../db/connection");

function list(){
    return knex("theaters as t")
        .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
        .join("movies as m",  "m.movie_id", "mt.movie_id")
        .select("t.*", "m.*");
}

function listByMovie(movieId) {
    return knex("theaters as t")
      .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
      .join("movies as m", "mt.movie_id", "m.movie_id")
      .select("t.*", "mt.is_showing", "mt.created_at", "mt.updated_at", "m.movie_id")
      .where({ "m.movie_id": movieId });
}

module.exports={
    list,
    listByMovie
};