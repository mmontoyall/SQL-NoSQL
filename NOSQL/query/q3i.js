// Task 3i

db.credits.aggregate([
    {$unwind: "$cast"},
    {
        $match: {"cast.id": 7624}
    },
    {
        $lookup: {
            from: "movies_metadata", // Search inside movies_metadata
            localField: "movieId", // match our _id
            foreignField: "movieId", // with the "movieId" in movies_metadata
            as: "movies" // Put matching rows into the field "movies"
        }
    },
    {$unwind: "$movies"},
    {
        $project: {
            _id:0,
            title: "$movies.title",
            release_date: "$movies.release_date",
            character: "$cast.character"
        }
    },
    {
        $sort:{release_date:-1}
    },
    
]);