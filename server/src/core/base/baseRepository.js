class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  findOne(filter = {}) {
    return this.model.findOne(filter);
  }

  find(filter = {}) {
    return this.model.find(filter);
  }

  findById(id) {
    return this.model.findById(id);
  }

  update(filter, data) {
    return this.model.updateMany(filter, data, {
      new: true,
      runValidators: true,
    });
  }

  updateOne(filter, data) {
    return this.model.updateOne(filter, data, {
      new: true,
      runValidators: true,
    });
  }

  create(data) {
    return this.model.create(data);
  }

  delete(filter = {}) {
    return this.model.deleteMany(filter);
  }

  deleteOne(filter = {}) {
    return this.model.deleteOne(filter);
  }

  findOneAndDelete(filter = {}) {
    return this.model.findOneAndDelete(filter);
  }
  findOneAndUpdate(filter = {}, data) {
    return this.model.findOneAndUpdate(filter, data, {
      new: true,
      runValidators: true,
    });
  }

  findByIdAndDelete(id) {
    return this.model.findByIdAndDelete(id);
  }

  findByIdAndUpdate(id, data) {
    return this.model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }
}

module.exports = BaseRepository;
