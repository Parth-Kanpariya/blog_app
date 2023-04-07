import DBOperation from '../services/database/database_operation';
import { v4 as uuidv4 } from 'uuid';
import SchemaModel from '../services/database/schema_model';

const schema = {
  todo_id: {
    type: String,
    default: uuidv4,
    index: true
  },
  user_id: {
    type: String,
    required: [true, 'User should be LoggedIn!!']
  },
  description: {
    type: String,
    required: [true, 'Description required!']
  },
  completed: {
    type: Boolean,
    default: false
  }
};

const modelName = 'Todos';
export let TodosModel = DBOperation.createModel(modelName, schema);
let todoModel = new SchemaModel(TodosModel);
export default todoModel;
