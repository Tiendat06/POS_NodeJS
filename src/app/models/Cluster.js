const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cluster = new Schema({
    cluster_id: {type: String, default: '', maxLength: 500},
    cluster_name: {type: String, default: '', maxLength: 500},
    cluster_address: {type: String, default: '', maxLength: 500},
    cluster_photo: {type: String, default: '', maxLength: 500},
    area_id: {type: String, default: '', maxLength: 500},
});

module.exports = mongoose.model('cluster', Cluster, 'cluster');