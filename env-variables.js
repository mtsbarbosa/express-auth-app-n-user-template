module.exports = {
  "development":{
    mongoose:{
      autoIndex:true,
    },
    'morgan':{
      logger: 'dev'
    },
  },
  "test":{
    mongoose:{
      autoIndex:true,
    },
    'morgan':{
      logger: 'dev'
    },
  },
  "test-2":{
    mongoose:{
      autoIndex:false,
    },
    'morgan':{
      logger: 'dev'
    },
  },
  "qa":{
    mongoose:{
      autoIndex:false,
    },
    'morgan':{
      logger: 'dev'
    },
  },
  "production":{
    mongoose:{
      autoIndex:false,
    },
    'morgan':{
      logger: 'dev'
    },
  },
};
