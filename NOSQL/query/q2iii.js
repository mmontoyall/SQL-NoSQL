// Task 2iii

db.movies_metadata.aggregate([
    {$project: {
        budget: {
            $switch:
                {
                    branches: [
                    {//See if the field is false: thus, check if FALSE and check if type is boolean
                        case:  {$and: [{$not: { $ne:["$budget",false] }} , {budget: {$type: 'bool'}}  ] },
                        //Do the rounding
                        then: 'unknown'
                    },
                    {//Check if budget field to null.
                        case:  {$and: [{$not: { $ne:["$budget",null] }} , {budget: {$type: 'null'}}  ] },
                        //Do the rounding
                        then: 'unknown'
                    },
                    {//Check if budget field to null.
                        case:  {$and: [{$not: { $ne:["$budget",""] }} , {budget: {$type: 'string'}}  ] },
                        //Do the rounding
                        then: 'unknown'
                    },
                    {//Check if budget field to null.
                        case:  {$and: [{$eq:['$budget', undefined] } , {budget: {$type: 'undefined'}}  ] },
                        //Do the rounding
                        then: 'unknown'
                    },
                    {//BudgetField ==  String prefix.
                        case: {$isNumber: "$budget"},
                        //then: 'unknown'
                        //then: {$multiply: [ {$toInt:{ $trim: { input: "$budget", chars: " USD$" } }}, 10000000] }
                        //then: 'deeznuts'
                        then: {$round : ["$budget",-7]}
                    },
                    {//BudgetField ==  String prefix.
                        case: {$eq: [{$type:"$budget"}, 'string']},
                        //then: 'unknown'
                        then: {$round: [ {$toInt:{ $trim: { input: "$budget", chars: " USD$" } }}, -7] }
                        //then: 'deeznuts'
                    }
                    ],
                    default: {$type:"$budget"}
                }
            }
        }
    },
    {
        $group:{
            _id: "$budget",
            count: {$sum:1}
        }
    },
    {
        $project :{
            _id: 0,
            budget: "$_id",
            count:"$count"
        }

    },
    {$sort: {budget: 1}},
]);

