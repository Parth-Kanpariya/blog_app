import DBOperation from "./database_operation";
import { logger, level } from "../../config/logger";

export default class SchemaModel {
  constructor(model) {
    this.model = model;
  }

  async add(data) {
    return new Promise((resolve, reject) => {
      try {
        const addedData = Promise.resolve(DBOperation.create(this.model, data));
        resolve(addedData);
      } catch (err) {
        reject(err);
      }
    });
  }

  async isExist(filter, option) {
    let isExist = false;
    try {
      const data = await DBOperation.get(this.model, filter, null, option);
      if (data.length > 0) {
        isExist = true;
      }
    } catch (err) {
      logger.log(level.error, err);
    }
    return isExist;
  }

  async get(filter, returnField, option) {
    return new Promise((resolve, reject) => {
      try {
        const data = Promise.resolve(
          DBOperation.get(this.model, filter, returnField, option)
        );
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  async getFilter(filter, option) {
    return new Promise((resolve, reject) => {
      try {
        const data = Promise.resolve(
          DBOperation.getFilter(this.model, filter, option)
        );
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  async getAll(option) {
    return new Promise((resolve, reject) => {
      try {
        const allData = Promise.resolve(
          DBOperation.get(this.model, {}, null, option)
        );
        resolve(allData);
      } catch (err) {
        reject(err);
      }
    });
  }

  async list(filter, returnField, populateObj, option) {
    return new Promise((resolve, reject) => {
      try {
        const category = Promise.resolve(
          DBOperation.list(this.model, filter, returnField, populateObj, option)
        );
        resolve(category);
      } catch (err) {
        reject(err);
      }
    });
  }

  async count(filter) {
    return new Promise((resolve, reject) => {
      try {
        const countDocument = Promise.resolve(
          DBOperation.count(this.model, filter)
        );
        resolve(countDocument);
      } catch (err) {
        reject(err);
      }
    });
  }

  async update(filter, updatedField) {
    return new Promise((resolve, reject) => {
      try {
        const updatedData = Promise.resolve(
          DBOperation.update(this.model, filter, updatedField)
        );
        resolve(updatedData);
      } catch (err) {
        reject(err);
      }
    });
  }

  async delete(filter) {
    return new Promise((resolve, reject) => {
      try {
        const deletedData = Promise.resolve(
          DBOperation.delete(this.model, filter)
        );
        resolve(deletedData);
      } catch (err) {
        reject(err);
      }
    });
  }

  async deleteMultiple(filter) {
    return new Promise((resolve, reject) => {
      try {
        const deletedData = Promise.resolve(
          DBOperation.deleteMultiple(this.model, filter)
        );
        resolve(deletedData);
      } catch (err) {
        reject(err);
      }
    });
  }

  async updateMany(filter, updatedField, option) {
    return new Promise((resolve, reject) => {
      try {
        const updatedData = Promise.resolve(
          DBOperation.updateMany(this.model, filter, updatedField, option)
        );
        resolve(updatedData);
      } catch (err) {
        reject(err);
      }
    });
  }

  async aggregate(pipeline) {
    return new Promise((resolve, reject) => {
      try {
        const agreegatedData = Promise.resolve(
          DBOperation.aggregate(this.model, pipeline)
        );
        resolve(agreegatedData);
      } catch (err) {
        reject(err);
      }
    });
  }
}
