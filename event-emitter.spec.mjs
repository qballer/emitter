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

