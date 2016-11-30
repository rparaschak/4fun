const crypto = require('crypto');

module.exports = {

  createRoom: function(to){
    const createChatRoomQuery = 'INSERT INTO chatrooms(id, last_message, last_read, messages_count, owner, participants) ' +
                                'VALUES(?, null, null, 0, ?, ?) ;'
    return CassandraService.query(createChatRoomQuery, [this.generateChatId(), {username: 'blahblag'}, [ '123', '321']], true);
  },

  generateChatId: function(){
    return crypto.randomBytes(20).toString('hex');
  }
};

// ChatRoom table

/*CREATE TABLE messenger.chatrooms (
  id text PRIMARY KEY,
  last_message map<text, text>,
  last_read map<text, bigint>,
  messages_count bigint,
  owner map<text, text>,
  participants set<text>
) WITH bloom_filter_fp_chance = 0.01
AND caching = {'keys': 'ALL', 'rows_per_partition': 'NONE'}
AND comment = ''
AND compaction = {'class': 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy', 'max_threshold': '32', 'min_threshold': '4'}
AND compression = {'chunk_length_in_kb': '64', 'class': 'org.apache.cassandra.io.compress.LZ4Compressor'}
AND crc_check_chance = 1.0
AND dclocal_read_repair_chance = 0.1
AND default_time_to_live = 0
AND gc_grace_seconds = 864000
AND max_index_interval = 2048
AND memtable_flush_period_in_ms = 0
AND min_index_interval = 128
AND read_repair_chance = 0.0
AND speculative_retry = '99PERCENTILE';
CREATE INDEX participants_index ON messenger.chatrooms (values(participants));*/
