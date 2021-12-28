// Task 2i
/**
 * i. The TAs are having a movie night but they're having trouble choosing a movie! Luckily, 
 * Joe has read about IMDb's Weighted Rating which assigns movies a score based on demographic filtering. 
 * The weighted ranking () is calculated as follows:
 * WR = ( v / (v+m))*R + (m/(v+m))*C
 * v = count(votes) for the movie
 * m = 1838
 * R = avg(rating) of the movie _vote_average
 * C = 7
 * Return the 20 highest rated movies according to this formula. 
 * The output should contain three fields: title with the title of the movie, 
 * vote_count with the number of votes the movie received, and score which contains the WR for the associated movie rounded to two decimal places. 
 * How many movies can you recognize on this list? 
 * Sort in descending order of score, and break ties in descending order of vote_count and ascending order of title. 
 * Your output documents should have the following fields:
 * 
 * {
    "title": <string>,
    "vote_count": <number>,
    "score": <number>
}
 */

db.movies_metadata.aggregate([
    // TODO: Write your query here
    //Main Idea is to retrieve the values we need:
    {
        $match:{ vote_count: {$gte : 1838}}
    },
    {
        $group: {
            _id: {movieId:"$movieId",title:"$title"},
            v: {$sum:"$vote_count"},
            R: {$sum: "$vote_average"}
        }
    },
    {
        $project:{
            _id:0,
            title:"$_id.title",
            vote_count:"$v",
            score: {
                $round: [ {$add: [ { $multiply: [ { $divide: [ "$v" , {$add:["$v",1838]} ] },"$R" ] } , { $multiply: [ { $divide: [1838,{$add:["$v",1838]}] }, 7 ] } ]} ,2]
                } 
            }
    },
    {
        $sort:{score:-1,vote_count:-1,title:1}
    },
    {$limit:20}
]);
