// Task 1ii

/*
Return the id, title, average vote, and vote count of the top 50 comedy movies ordered from highest to lowest by average vote, 
breaking ties by descending order of vote count, and any further ties in ascending order of movieId. 
Only include movies with 50 or more votes. The output documents should have the following fields:
*/

db.movies_metadata.aggregate([
    // TODO: Write your query here
    {
        $match: { genres: {$elemMatch: {name: "Comedy"}}}
    },
    {
        $match: { vote_count: {$gte: 50 }}
    },
    {
        $sort: {vote_average: -1 , vote_count: -1, movieId :1}
    },
    {
     $project: {title: 1, vote_average: 1, vote_count : 1,movieId:1 , _id: 0}
    },
    {$limit: 50}
]);