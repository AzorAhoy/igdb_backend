// Set up a schema and model to match result structure
var scoreAvgSchema = new Schema({
    "_id": { "type": Schema.Types.ObjectId, "ref": "Bourbon" },
    "avgRating": Number
});

// The "null" for the collection is because there will not be any physical storage
var scoreAvg = mongoose.model("scoreAvg", scoreAvgSchema, null);