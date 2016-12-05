const cassandra = require('cassandra-driver');
const client = new cassandra.Client({contactPoints: sails.config.cassandra.points, keyspace: 'messenger'});

module.exports = {

  getConnection: function () {},

  execute: function(query, params, prepare = true){
    return new Promise(function(resolve, reject){
      client.execute(query, params, { prepare: prepare }, function(err, results){
        if(err)
          return reject(err);
        if(results)
          return resolve(results.rows);
      });
    });
  },

}
