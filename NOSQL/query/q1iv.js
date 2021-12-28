// Task 1iv
/**
 *  You've discovered a critic who always seems to know exactly which movies you would love and which ones you would hate. 
 * Their true name is a mystery, but you know their user id: 186. 
 * Find critic 186's five most recent movie reviews, and create create a document with the following fields:
 * {
    "movieIds": [most recent movieId, 2nd most recent, ... , 5th most recent],
    "ratings": [most recent rating, 2nd most recent, ..., 5th most recent],
    "timestamps": [most recent timestamp, 2nd most recent, ... , 5th most recent]
}
 */
db.ratings.aggregate([
    // TODO: Write your query here
    //Sort by timestamp first
    { $sort: {timestamp: -1}},
    {//Find our user
        $match: { userId: {$eq : 186} }
    },
    {// Since we already sorted, we can get rid of the rest as we want the most recently rated movies by the user.
        $limit: 5
    },
    {//GroupBy the rating given, and then count. 
        $group: { // Since we only matched the user ID of 186, it is also possible to groupby null.
            _id: 186,
            movieIds: {  $push:"$movieId" },  
            ratings: {  $push:"$rating" },  
            timestamps: {  $push:"$timestamp" },  
        }
    },
    {
        $project: {_id: 0 ,movieIds:1,ratings:1,timestamps:1}
    },
]);