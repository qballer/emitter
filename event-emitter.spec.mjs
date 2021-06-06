import { MyEventEmitter } from "./event-emitter.mjs";
import { strict as assert } from "assert";

async function test(name, callback) {
  try {
    const value = callback();
    if (value instanceof Promise) {
      await value;
    }
    console.log(`✅ test ${name} passed`);
  } catch (e) {
    console.log(`❌ test ${name} failed`);
    console.log("error is", e);
  }
}

await test("event emitter should support on", async function () {
  const emitter = new MyEventEmitter();
  let called = false;
  const promise = new Promise((resolve) => {
    emitter.on("data", function () {
      called = true;
      resolve();
    });
  });

  emitter.emit("data");
  await promise;
  assert.deepEqual(called, true, "callback has been called");
});

await test("should call several functions", async function () {
  const emitter = new MyEventEmitter();
  let called = 0;
  const func = () => ++called;
  const promise1 = new Promise((resolve) =>
    emitter.on("data", () => (func(), resolve()))
  );
  const promise2 = new Promise((resolve) =>
    emitter.on("data", () => (func(), resolve()))
  );
  emitter.emit("data");
  await Promise.all([promise1, promise2]);
  assert.deepEqual(called, 2, "the two callbacks have been called");
});

await test("event emitter should support on", async function () {
  const emitter = new MyEventEmitter();
  const sendArgs = ["some", "value"];
  let gotArgs;
  const promise = new Promise((resolve) => {
    emitter.on("data", function (...args) {
      gotArgs = args;
      resolve();
    });
  });
  emitter.emit("data", ...sendArgs);
  await promise;
  assert.deepEqual(gotArgs, sendArgs, "callback has been called");
});

await test(".on should throw if not given name string", function () {
  const emitter = new MyEventEmitter();
  try {
    emitter.on(333, () => {});
  } catch (e) {
    return;
  }
  throw new Error("name is not string but on is successful");
});

await test(".on should throw if not callback is not a function", function () {
  const emitter = new MyEventEmitter();
  try {
    emitter.on("name");
  } catch (e) {
    return;
  }
  throw new Error();
});

await test(".emit should throw if name is not string", function () {
  const emitter = new MyEventEmitter();
  try {
    emitter.emit(111);
  } catch (e) {
    return;
  }
  throw new Error("name is not string but on is successful");
});
