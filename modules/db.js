const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://admin:admin@tutorbuddy-csxjn.azure.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true });

const ObjectID = require('mongodb').ObjectID;
//connect
function __connectDb(callback) {

    client.connect(err => {
        if (err) {
            return;
        }
        callback(client.db("TutorBuddy"));   
       }); 

}
//objectID
exports.ObjectID = ObjectID;
//find
exports.find = function (collectionName, json, C, D) {
    var result = [];    //
    if (arguments.length == 3) {
        //if no D ,c is callback
        var callback = C;
        var skipnumber = 0;
        var limit = 0;
    } else if (arguments.length == 4) {
        var callback = D;
        var args = C;
        var skipnumber = args.pageamount * args.page || 0;
        var limit = args.pageamount || 0;
        var sort = args.sort || {};
    } else {
        throw new Error("wrong parameter");
        return;
    }

   
    __connectDb((db)=> {
        var cursor = db.collection(collectionName).find(json).skip(skipnumber).limit(limit).sort(sort);
        cursor.each(function (err, doc) {
            if (err) {
                
               // client.close();
                return;
            }
            if (doc != null) {
                result.push(doc);   
            } else {
               
                callback(null, result);
               // client.close();
            }
        });
    });
}


//insert
exports.insert = (collectionname, json, callback) => {
    __connectDb((db) => {
    
        db.collection(collectionname).insertOne(json, (error, data) => {
            callback(error, data);
            // client.close();
            
        })
    })

}
//update
exports.update = (collectionname, json1, json2, callback) => {
    __connectDb((db) => {
        db.collection(collectionname).updateOne(json1, { $set: json2 }, (error, data) => {
            callback(error, data);
            // client.close();
        })
    })

}
//delete
exports.deleteOne = (collectionname, json, callback) => {
    __connectDb((db) => {
        db.collection(collectionname).deleteOne(json, (error, data) => {
            callback(error, data);
            // client.close(); 
        })
    })
}
//get all count
exports.getAllCount = (collectionname, callback) => {
    __connectDb((db) => {
        db.collection(collectionname).count({}).then((count)=> {
            callback(count);
            //db.close();
        })
    })
}