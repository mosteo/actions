const core = require('@actions/core');

try {
   console.log(`Hello Actionworld`);
} catch (error) {
   core.setFailed(error.message);
}
