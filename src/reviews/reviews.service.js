const knex = require("../db/connection");

function list(){
    return knex("reviews as r")
        .join("movies as m", "r.movie_id", "m.movie_id")
        .join("critics as c",  "c.critic_id", "r.critic_id")
        .select("r.*", "c.*");
}

function listByMovie(movieId) {
    return knex("reviews as r")
        .join("movies as m", "r.movie_id", "m.movie_id")
        .join("critics as c",  "c.critic_id", "r.critic_id")
        .select("r.*", "c.*")
        .where({ "m.movie_id": movieId });
}

function read(reviewId){
    return knex("reviews")
        .select("*")
        .where({"review_id": reviewId})
        .first();
}

function update(review){
    return knex("reviews")
        .select("*")
        .where({"review_id": review.review_id})
        .update(review, "*")
        .then((updatedRecords) => updatedRecords[0]);
}

function destroy(reviewId){
    return knex("reviews")
        .where({"review_id": reviewId})
        .del();
}

module.exports={
    list,
    listByMovie,
    read,
    update,
    delete: destroy
};