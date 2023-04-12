import DBOperation from '../services/database/database_operation';
import { v4 as uuidv4 } from 'uuid';
import SchemaModel from '../services/database/schema_model';

const schema = {
  _id: {
    //also called _id
    type: String,
    default: uuidv4,
    index: true
  },
  follower_id: {
    type: String
  },
  user_id: {
    type: String,
    required: [true, 'User should be LoggedIn!!']
  }
};

const modelName = 'Followings';
export let FollowingsModel = DBOperation.createModel(modelName, schema);
let followingsModel = new SchemaModel(FollowingsModel);
export default followingsModel;
