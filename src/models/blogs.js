import DBOperation from '../services/database/database_operation';
import { v4 as uuidv4 } from 'uuid';
import SchemaModel from '../services/database/schema_model';

const schema = {
  blog_id: {
    type: String,
    default: uuidv4,
    index: true
  },
  user_id: {
    type: String,
    required: [true, 'User should be LoggedIn!!']
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  category: {
    type: String
  },
  likes: [String],
  comments: [
    {
      type: String
    }
  ]
};

const modelName = 'Blogs';
export let BlogsModel = DBOperation.createModel(modelName, schema);
let blogModel = new SchemaModel(BlogsModel);
export default blogModel;
