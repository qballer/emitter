import {MyEventEmitter} from './event-emitter.mjs'
import { strict as assert } from 'assert';

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


test('should emit data', function () {
  const emitter = new MyEventEmitter()
  let called = false 
  emitter.on('data', function () {
    called = true
  })

  assert.equal(called, true, "callback has been called")
})