const core = require('@actions/core');
const github = require('@actions/github');
const { dockerCommand } = require('docker-cli-js');

try {
   // docker options
   const options = {
      machineName:             null, // local docker
      currentWorkingDirectory: null, // current working directory
      echo:                    true, // echo command output
   };

   const image    = core.getInput('image');
   const hostDir  = core.getInput('host-dir');
   const guestDir = core.getInput('guest-dir');
   const command  = core.getInput('command');
   const params   = core.getInput('params');

   core.info(`PATH is ${process.env.PATH}`);
 
   // pull the required machine
   dockerCommand (`pull ${image}`, options)
     .then(() => core.info (`Pulled OK: ${image}`))
     .catch(err => core.setFailed (`Pulled Err: ${image} ${err}`))

   // run it
     .then(() => dockerCommand (`run ${params} -w ${guestDir} -v${hostDir}:${guestDir} ${image} ${command}`))
     .then(() => core.info (`Ran OK: ${command}`))
     .catch(err => core.setFailed (`Run Err: ${image} ${command}: error is: ${err}`));

} catch (error) {
   core.setFailed(error.message);
}
