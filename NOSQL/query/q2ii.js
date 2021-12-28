// Task 2ii

db.movies_metadata.aggregate([
    //Set to lower
    {$project:{tagline: {$toLower: '$tagline'}}},
    //Split
    {$project:{
        tagline: { $split:[ "$tagline" , " "] } } 
    },
    //unwind
    {$unwind: "$tagline"},
    //once we unwind, we trim!
    {$project:{tagline: { $trim: { input: "$tagline", chars: ",!?." } } }},
    //Once we trim we get the lenght of each one so we can limit our range to items with greater lenght
    {$project:{
        tagline:'$tagline',
        len: {$strLenCP: "$tagline"}
        }
    },
    {
        $match: { len: { $gt: 3 } }
    },
    {
        $group:{
            _id: "$tagline",
            count: { $sum: 1 }
        }
    },
    {$sort: {count: -1}},
    { $limit : 20 }
]);

