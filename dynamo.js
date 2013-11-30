var config      = require('./config.js');
var aws         = require('aws-sdk');

aws.config.update({accessKeyId: config.key, secretAccessKey: config.secret});
aws.config.update({region: 'us-east-1'});

exports.getParams = function (word) {
    var params = { 
        TableName : config.db,
        KeyConditions: {
            'word' : {
                AttributeValueList : [ { S : word } ],
                ComparisonOperator : 'EQ'
            }
        },
        Limit : 1
    };

    return params;
};

exports.getWord = function(word, callback) {

    var params = this.getParams(word);

    var db = new aws.DynamoDB();
    db.client.query(params, function(err, data) {
        if (err) {
            console.log('Get Word Error');
            console.log(err);
        }

        if (err || !data || data.Count == 0)
            callback({ data : false });
        else callback({ data : data });
    });
};

exports.addWord = function(word) {
    var db = new aws.DynamoDB();
    db.client.putItem({ 
        TableName : config.db,
        Item : { 'word' : { S : word } }
    }, function(err, data) {
        if (err) {
            console.log('Add Word Error');
            console.log(err);
        }
    });  
};