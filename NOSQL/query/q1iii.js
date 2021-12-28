// Task 1iii
/**
 * Do movies get more good reviews than bad reviews? 
 * Is it the other way around? We want to know! 
 * For each possible rating find how many times that rating was given. 
 * Include the rating and the number of the times the rating was given and output in descending order of the rating. 
 * The output documents should have the following fields:
 * 
 * {
    "count": <number>,
    "rating": <number>
 * }
 *
 */
db.ratings.aggregate([
    // TODO: Write your query here
    {//GroupBy the rating given, and then count. 
        $group: {
            _id: "$rating",
            count: {$sum: 1}
        }
    },
    {//Sort by score.
        $sort: {_id: -1}
    },
    {//Dont project _id however, project _id as its rename value rating
        $project: {_id: 0, count:1, rating: "$_id"}
    }
]);