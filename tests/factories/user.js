const FactoryGirl = require('factory-girl');
const factory = FactoryGirl.factory;
const User = require('../../models/user').model();

factory.define('user', User, {
    _id: require('mongoose').Types.ObjectId(),
    name: factory.chance('word',{syllables: 3}),
    email: factory.chance('email'),
    password: factory.chance('string',{length: 10}),
    active: true,
    is_master: false//,
    //applications: factory.assocMany('application', 2, '_id')
});
