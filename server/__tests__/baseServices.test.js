import mongoose from "mongoose";
import BaseRepository from "../src/core/base/baseRepository";
import "dotenv/config.js";
import BaseService from "../src/core/base/baseService";
import AppError from "../src/core/AppError";

let TestModel;
let testUsers;
let baseRepository;

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/test");
  const schema = new mongoose.Schema({}, { strict: false });
  TestModel = mongoose.model("test-hotel", schema);
  baseRepository = new BaseRepository(TestModel);
});

afterAll(async () => {
  await mongoose.disconnect();
});

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

// _______________________________________________________________
describe("Testing find method", () => {
  it("Should return all users", async () => {
    const baseService = new BaseService(baseRepository);
    const allUsers = await baseService.find({}, "users", false);

    expect(allUsers.length).toBe(4);
  });

  it("Should find no users and fail", async () => {
    try {
      const baseService = new BaseService(baseRepository);
      const allUsers = await baseService.find(
        { unknownProperty: "test" },
        "users",
        false
      );
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
      expect(err.statusCode).toBe(404);
    }
  });
});

// _______________________________________________________________
describe("testing findOne method", () => {
  it("Should return random4 user", async () => {
    const baseService = new BaseService(baseRepository);
    const user = await baseService.findOne({ name: "random4" }, "users", false);

    expect(user.name).toBe("random4");
    expect(user.isStudent).toBe(true);
  });

  it("should fail to find user and throw AppError", async () => {
    try {
      const baseService = new BaseService(baseRepository);
      const user = await baseService.findOne(
        { unknownProperty: "test" },
        "users",
        false
      );
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
      expect(err.statusCode).toBe(404);
    }
  });
});

// _______________________________________________________________
describe("Testing findById method", () => {
  it("Should find third user with id", async () => {
    const id = testUsers[2]._id;
    const baseService = new BaseService(baseRepository);
    const user = await baseService.findById(id, "users", false);

    expect(user.name).toBe("random3");
    expect(user._id.toString()).toBe(id.toString());
    expect(user.isStudent).toBe(false);
  });

  it("Should fail to find user by id", async () => {
    try {
      const fakeId = "68bc56789fd6fa36c81b1b69";
      const baseService = new BaseService(baseRepository);
      const user = await baseService.findById(fakeId, "users", false);
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
      expect(err.statusCode).toBe(404);
    }
  });
});

// _______________________________________________________________
describe("testing update method", () => {
  it("Should change all students only name", async () => {
    const baseService = new BaseService(baseRepository);
    const students = await baseService.update(
      { isStudent: true },
      { name: "test name" },
      "users"
    );
    const allStudents = await baseService.find();

    allStudents.forEach((std) => {
      if (std.isStudent) {
        expect(std.name).toBe("test name");
      } else {
        expect(std.name).not.toBe("test name");
      }
    });
  });

  it("Should fail to change any user and throw error", async () => {
    try {
      const baseService = new BaseService(baseRepository);
      const students = await baseService.update(
        { unknownProperty: "test" },
        { name: "test name" },
        "users"
      );
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
      expect(err.statusCode).toBe(404);
    }
  });
});

// _______________________________________________________________
describe("testing updateOne method", () => {
  it("Should change second student only name", async () => {
    const name = "test name";
    const id = testUsers[0]._id;
    const baseService = new BaseService(baseRepository);
    const student = await baseService.updateOne({ _id: id }, { name }, "users");
    const allStudents = await baseService.find();

    allStudents.forEach((std) => {
      if (std._id === student._id) {
        expect(std.name).toBe(student.name);
      } else {
        expect(std.name).not.toBe(student.name);
      }
    });
  });

  it("Should fail to change any user and throw error", async () => {
    try {
      const baseService = new BaseService(baseRepository);
      const students = await baseService.updateOne(
        { unknownProperty: "test" },
        { name: "test name" },
        "users"
      );
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
      expect(err.statusCode).toBe(404);
    }
  });
});

// _______________________________________________________________
describe("testing findByIdAndUpdate method", () => {
  it("Should change second student only name", async () => {
    const name = "test name";
    const id = testUsers[0]._id;
    const baseService = new BaseService(baseRepository);
    const student = await baseService.findByIdAndUpdate(id, { name }, "users");
    const allStudents = await baseService.find();

    allStudents.forEach((std) => {
      if (std._id.toString() === student._id.toString()) {
        expect(std.name).toBe(student.name);
      } else {
        expect(std.name).not.toBe(student.name);
      }
    });
  });

  it("Should fail to change any user and throw error", async () => {
    try {
      const fakeId = "68bc56789fd6fa36c81b1b69";
      const baseService = new BaseService(baseRepository);
      const students = await baseService.findByIdAndUpdate(
        fakeId,
        { name: "test name" },
        "users"
      );
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
      expect(err.statusCode).toBe(404);
    }
  });
});

describe("testing findOneAndUpdate method", () => {
  it("Should change second student only name", async () => {
    const name = "test name";
    const id = testUsers[0]._id;
    const baseService = new BaseService(baseRepository);
    const student = await baseService.findOneAndUpdate(
      { _id: id },
      { name },
      "users"
    );
    const allStudents = await baseService.find();

    allStudents.forEach((std) => {
      if (std._id.toString() === student._id.toString()) {
        expect(std.name).toBe(student.name);
      } else {
        expect(std.name).not.toBe(student.name);
      }
    });
  });

  it("Should fail to change any user and throw error", async () => {
    try {
      const fakeId = "68bc56789fd6fa36c81b1b69";
      const baseService = new BaseService(baseRepository);
      const students = await baseService.findOneAndUpdate(
        { _id: fakeId },
        { name: "test name" },
        "users"
      );
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
      expect(err.statusCode).toBe(404);
    }
  });
});

describe("testing delete method", () => {
  it("should delete all students", async () => {
    const baseService = new BaseService(baseRepository);
    const deleted = await baseService.delete({ isStudent: true }, "students");

    expect(deleted.deletedCount).toBe(2);
  });

  it("should fail and throw app error", async () => {
    try {
      const baseService = new BaseService(baseRepository);
      const deleted = await baseService.delete(
        { unknownProperty: "test" },
        "students"
      );
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
      expect(err.statusCode).toBe(404);
    }
  });
});

describe("testing deleteOne method", () => {
  it("should delete random1 student", async () => {
    const baseService = new BaseService(baseRepository);
    const deleted = await baseService.deleteOne(
      { name: "random1" },
      "students"
    );

    expect(deleted.deletedCount).toBe(1);
  });

  it("should fail and throw app error", async () => {
    try {
      const baseService = new BaseService(baseRepository);
      const deleted = await baseService.delete(
        { unknownProperty: "test" },
        "students"
      );
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
      expect(err.statusCode).toBe(404);
    }
  });
});

describe("testing findOneAndDelete method", () => {
  it("should delete random1 student and return it", async () => {
    const baseService = new BaseService(baseRepository);
    const deleted = await baseService.findOneAndDelete(
      { name: "random1" },
      "students"
    );
    const cachedUser = testUsers.find((std) => std.name === "random1");

    expect(deleted.name).toBe(cachedUser.name);
    expect(deleted.isStudent).toBe(cachedUser.isStudent);
  });

  it("should fail and throw app error", async () => {
    try {
      const baseService = new BaseService(baseRepository);
      const deleted = await baseService.findOneAndDelete(
        { unknownProperty: "test" },
        "students"
      );
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
      expect(err.statusCode).toBe(404);
    }
  });
});

describe("testing findByIdAndDelete method", () => {
  it("should delete first student and return it", async () => {
    const baseService = new BaseService(baseRepository);
    const cachedUser = testUsers.find((std) => std.name === "random3");
    const deleted = await baseService.findByIdAndDelete(
      cachedUser._id.toString(),
      "students"
    );

    expect(deleted._id.toString()).toBe(cachedUser._id.toString());
  });

  it("should fail and throw app error", async () => {
    try {
      const fakeId = "68bc56789fd6fa36c81b1b69";
      const baseService = new BaseService(baseRepository);
      const deleted = await baseService.findByIdAndDelete(fakeId, "students");
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
      expect(err.statusCode).toBe(404);
    }
  });
});

describe("testing create method", () => {
  it("Should create user", async () => {
    const baseService = new BaseService(baseRepository);
    const user = await baseService.create({
      name: "test",
      age: 30,
      isStudent: true,
    });

    expect(user._id).not.toBeUndefined();
  });
});
