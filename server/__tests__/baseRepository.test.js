const { default: mongoose } = require("mongoose");
const BaseRepository = require("../src/core/base/baseRepository");
require("dotenv").config();

let TestModel;
let testUsers;

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/test");
  const schema = new mongoose.Schema({}, { strict: false });
  TestModel = mongoose.model("test-hotel", schema);
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("testing BaseRepository Methods", () => {
  afterEach(async () => {
    await TestModel.deleteMany({});
  });

  beforeEach(async () => {
    testUsers = await TestModel.create([
      {
        name: "random1",
        age: Math.trunc(Math.random() * 90),
        isStudent: true,
      },
      {
        name: "random2",
        age: Math.trunc(Math.random() * 90),
        isStudent: false,
      },
      {
        name: "random3",
        age: Math.trunc(Math.random() * 90),
        isStudent: false,
      },
      {
        name: "random4",
        age: Math.trunc(Math.random() * 90),
        isStudent: true,
      },
    ]);
  });

  it("testing find Method", async () => {
    const baseRepository = new BaseRepository(TestModel);
    const result = await baseRepository.find({ isStudent: true });
    expect(result.map((res) => res.name)).toContain(testUsers[0].name);
    expect(result.map((res) => res.name)).toContain(testUsers[3].name);
    expect(result.length).toBe(2);
  });

  it("testing findOne method", async () => {
    const baseRepository = new BaseRepository(TestModel);
    const result = await baseRepository.findOne({ name: "random1" });
    expect(result.name).toBe("random1");
    expect(result.isStudent).toBe(true);
  });

  it("testing findById method CastError", async () => {
    const baseRepository = new BaseRepository(TestModel);
    await expect(
      baseRepository.findById("this is not valid id")
    ).rejects.toThrow(mongoose.Error.CastError);
  });

  it("testing findByIdAndDelete method CastError", async () => {
    const baseRepository = new BaseRepository(TestModel);
    await expect(
      baseRepository.findByIdAndDelete("this is not valid id")
    ).rejects.toThrow(mongoose.Error.CastError);
  });

  it("testing findByIdAndUpdate method CastError", async () => {
    const baseRepository = new BaseRepository(TestModel);
    await expect(
      baseRepository.findByIdAndUpdate("this is not valid id")
    ).rejects.toThrow(mongoose.Error.CastError);
  });

  it("testing findById method", async () => {
    const baseRepository = new BaseRepository(TestModel);
    const result = await baseRepository.findById(testUsers[1]._id);
    expect(result._id).toEqual(testUsers[1]._id);
    expect(result.name).toEqual(testUsers[1].name);
  });

  it("testing create method", async () => {
    const userData = {
      name: "test123",
      age: 30,
      isStudent: false,
    };
    const baseRepository = new BaseRepository(TestModel);
    const newUser = await baseRepository.create(userData);
    const searchUser = await baseRepository.findOne(userData);

    expect(newUser).not.toBe(null);
    expect(searchUser).not.toBe(null);
    expect(newUser._id.toString()).toBe(searchUser._id.toString());
  });

  it("testing update method", async () => {
    const name = "we are students";
    const baseRepository = new BaseRepository(TestModel);
    const update = await baseRepository.update({ isStudent: true }, { name });
    const studentsData = await baseRepository.find({ isStudent: true });
    studentsData.forEach((student) => {
      expect(student.name).toBe(name);
    });
  });

  it("testing updateOne method", async () => {
    const name = "we are students";
    const baseRepository = new BaseRepository(TestModel);
    const update = await baseRepository.updateOne(
      { isStudent: true },
      { name }
    );
    const studentsData = await baseRepository.find({ isStudent: true });
    expect(studentsData[0].name).toBe(name);
    const studentsExceptFirst = studentsData.slice(1);
    studentsExceptFirst.forEach((student) =>
      expect(student.name).not.toEqual(name)
    );
  });

  it("testing delete method", async () => {
    const baseRepository = new BaseRepository(TestModel);
    const deleteUsers = await baseRepository.delete({ isStudent: true });
    const findUsers = await baseRepository.find();
    expect(findUsers.length).toBe(2);
    expect(deleteUsers.deletedCount).toBe(2);
    findUsers.forEach((student) => expect(student.isStudent).toBe(false));
  });

  it("testing deleteOne method", async () => {
    const baseRepository = new BaseRepository(TestModel);
    const deleteUsers = await baseRepository.deleteOne({ name: "random1" });
    const findUsers = await baseRepository.find().lean();
    expect(deleteUsers.deletedCount).toBe(1);
    expect(findUsers.map((std) => std.name)).not.toContain("random1");
  });
  it("testing findByIdAndDelete", async () => {
    const id = testUsers[0]._id;
    const baseRepository = new BaseRepository(TestModel);
    const deleteFirstUser = await baseRepository.findByIdAndDelete(id);
    expect(deleteFirstUser._id).toEqual(testUsers[0]._id);
    await expect(baseRepository.findById(id)).resolves.toBeNull();
  });

  it("testing findByIdAndUpdate", async () => {
    const id = testUsers[0]._id;
    const baseRepository = new BaseRepository(TestModel);
    const updateFirstUser = await baseRepository.findByIdAndUpdate(id, {
      name: "hello world",
    });
    expect(updateFirstUser._id).toEqual(testUsers[0]._id);
    const searchUser = await baseRepository.findById(id);
    await expect(searchUser.name).toBe("hello world");
  });

  it("testing findOneAndDelete method", async () => {
    const id = testUsers[0]._id;
    const baseRepository = new BaseRepository(TestModel);
    const deleteFirstUser = await baseRepository.findOneAndDelete({ _id: id });
    expect(deleteFirstUser._id).toEqual(testUsers[0]._id);
    await expect(baseRepository.findById(id)).resolves.toBeNull();
  });

  it("testing findOneAndUpdate method", async () => {
    const id = testUsers[0]._id;
    const baseRepository = new BaseRepository(TestModel);
    const updateFirstUser = await baseRepository.findOneAndUpdate(
      { _id: id },
      {
        name: "hello world",
      }
    );
    expect(updateFirstUser._id).toEqual(testUsers[0]._id);
    const searchUser = await baseRepository.findById(id);
    await expect(searchUser.name).toBe("hello world");
  });
});
