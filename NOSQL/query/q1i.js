// Task 1i

db.keywords.aggregate([
    {//Match Documents!
        $match: {
            $or: [ //Keyword contains name "mickey mouse or keyword contains name marvel comic."
            {keywords: {$elemMatch: {name: "mickey mouse"}}},
            {keywords: {$elemMatch: {name: "marvel comic"}}}]
        }
    },
    {
        $sort: {movieId: 1}
    },
    { //Let us only project the movie ID such that we only project {"movieId": <number>}
        $project: {_id:0 ,movieId: 1}
    }
]);