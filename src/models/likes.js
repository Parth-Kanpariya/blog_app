import DBOperation from '../services/database/database_operation';
import { v4 as uuidv4 } from 'uuid';
import SchemaModel from '../services/database/schema_model';

const schema = {
  like_id: {
    type: String,
    default: uuidv4,
    index: true
  },
  blog_id: {
    type: String
  },
  user_id: {
    type: String,
    required: [true, 'User should be LoggedIn!!']
  },
  text: {
    type: String
  }
};

const modelName = 'Likes';
export let LikesModel = DBOperation.createModel(modelName, schema);
let likeModel = new SchemaModel(LikesModel);
export default likeModel;
