const FactoryGirl = require('factory-girl');
const factory = FactoryGirl.factory;
const Application = require('../../models/application').model();

factory.define('application', Application, {
    _id: require('mongoose').Types.ObjectId(),
    name: factory.chance('word',{syllables: 3}),
    description: factory.chance('sentence',{words: 8}),
    hash_key: factory.chance('string',{length: 10}),
    root: true
});

factory.define('not_root_application', Application, {
    _id: require('mongoose').Types.ObjectId(),
    name: factory.chance('word',{syllables: 3}),
    description: factory.chance('sentence',{words: 8}),
    hash_key: factory.chance('string',{length: 10}),
    root: false
});
