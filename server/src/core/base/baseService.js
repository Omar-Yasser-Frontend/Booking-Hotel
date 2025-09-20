import AppError from "../AppError.js";

class BaseService {
  constructor(repository) {
    this.repo = repository;
  }

  async find(filter = {}, entityName = "Item", allowEmpty = false) {
    const result = await this.repo.find(filter);

    if (!allowEmpty && !result.length) {
      throw new AppError(`${entityName} Not Found`, 404);
    }

    return result;
  }

  async delete(filter = {}, entityName = "Item") {
    const deleted = await this.repo.delete(filter);

    if (deleted.deletedCount === 0) {
      throw new AppError(
        `Can't delete ${entityName}, ${entityName} Not Found`,
        404
      );
    }

    return deleted;
  }

  async create(data) {
    const createdItem = await this.repo.create(data);

    return createdItem;
  }

  async update(filter, data, entityName = "item") {
    const update = await this.repo.update(filter, data);

    if (update.modifiedCount === 0)
      throw new AppError(
        `Can't update ${entityName}, ${entityName} Not Found`,
        404
      );

    return update;
  }

  async findById(id, entityName = "Item", allowEmpty = false) {
    const result = await this.repo.findById(id);

    if (!allowEmpty && !result) {
      throw new AppError(`${entityName} Not Found`, 404);
    }

    return result;
  }

  async findByIdAndUpdate(id, data, entityName) {
    const update = await this.repo.findByIdAndUpdate(id, data);

    if (!update)
      throw new AppError(
        `Can't update ${entityName}, ${entityName} Not Found`,
        404
      );

    return update;
  }

  async findByIdAndDelete(id, entityName = "Item") {
    const deleted = await this.repo.findByIdAndDelete(id);

    if (!deleted) {
      throw new AppError(
        `Can't delete ${entityName}, ${entityName} Not Found`,
        404
      );
    }

    return deleted;
  }

  async findOne(filter = {}, entityName = "Item", allowEmpty = false) {
    const result = await this.repo.findOne(filter);

    if (!allowEmpty && !result) {
      throw new AppError(`${entityName} Not Found`, 404);
    }

    return result;
  }

  async deleteOne(filter = {}, entityName = "Item") {
    const deleted = await this.repo.deleteOne(filter);

    if (deleted.deletedCount === 0) {
      throw new AppError(
        `Can't delete ${entityName}, ${entityName} Not Found`,
        404
      );
    }

    return deleted;
  }

  async updateOne(filter, data, entityName = "Item") {
    const update = await this.repo.updateOne(filter, data);

    if (!update.modifiedCount)
      throw new AppError(
        `Can't update ${entityName}, ${entityName} Not Found`,
        404
      );

    return update;
  }

  async findOneAndUpdate(filter = {}, data, entityName = "Item") {
    const result = await this.repo.findOneAndUpdate(filter, data);

    if (!result)
      throw new AppError(
        `Can't update ${entityName}, ${entityName} Not Found`,
        404
      );

    return result;
  }

  async findOneAndDelete(filter = {}, entityName = "Item") {
    const result = await this.repo.findOneAndDelete(filter);

    if (!result)
      throw new AppError(
        `Can't update ${entityName}, ${entityName} Not Found`,
        404
      );

    return result;
  }
}

export default BaseService;
