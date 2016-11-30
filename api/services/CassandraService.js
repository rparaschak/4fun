const cassandra = require('cassandra-driver');

function CassandraHelper(){

	const client = new cassandra.Client({ contactPoints: ['51.15.48.136'], keyspace: 'messenger' });

	this.getConnection = function(){

	}
}
