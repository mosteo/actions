const core = require('@actions/core');
const github = require('@actions/github');
const { dockerCommand } = require('docker-cli-js');
 
async function run() {
   try {
      const image    = core.getInput('image');
      const hostDir  = core.getInput('host-dir');
      const guestDir = core.getInput('guest-dir');
      const command  = core.getInput('command');
      const params   = core.getInput('params');

      core.info(`Host PATH: ${process.env.PATH}`);
    
      // pull the required machine
      await dockerCommand(`pull ${image}`);
      core.info(`Pulled OK: ${image}`);

      // run it
      await dockerCommand(`run ${params} -w ${guestDir} -v${hostDir}:${guestDir} ${image} ${command}`);
      core.info (`Ran OK: ${command}`);

   } catch (error) {
      core.setFailed(error.message);
   }
};

run();
