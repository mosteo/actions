const core = require('@actions/core');
const github = require('@actions/github');

try {
   console.log(`Hello Actionworld`);
} catch (error) {
   core.setFailed(error.message);
}
