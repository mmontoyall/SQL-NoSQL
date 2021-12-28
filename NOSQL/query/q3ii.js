// Task 3ii

db.credits.aggregate([
    {$unwind: "$crew"},
    {
        //$match: {crew: { $elemMatch: { id: 7624, job: "Director" } }}
        $match: { $and: [ {"crew.id": {$eq: 5655} } , { "crew.job": {$eq: "Director"}} ] }
        
    },
    {$unwind: "$cast"},
    {
        $group: {
            _id: {id: "$cast.id", name: "$cast.name"},
            count: {$sum:1}
        }
    },
    {
        $project: {
            _id:0,
            count:1,
            id:"$_id.id",
            name:"$_id.name"
        }
    },
    {$sort:{count:-1, id:1}},
    {$limit :5}
]);



