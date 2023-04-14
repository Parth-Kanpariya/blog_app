import DBOperation from '../services/database/database_operation';
import { v4 as uuidv4 } from 'uuid';
import SchemaModel from '../services/database/schema_model';

const schema = {
  favorite_id: {
    type: String,
    default: uuidv4,
    index: true
  },
  blog_id: String,
  user_id: {
    type: String,
    required: [true, 'User should be LoggedIn!!']
  }
};

const modelName = 'Favorites';
export let FavoritesModel = DBOperation.createModel(modelName, schema);
let favoritesModel = new SchemaModel(FavoritesModel);
export default favoritesModel;
