const core = require('@actions/core');
const github = require('@actions/github');
const { dockerCommand } = require('docker-cli-js');

try {
   console.log(`Hello Actionworld`);

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
 
   // pull the required machine
   dockerCommand (`pull ${image}`, options)
     .then(() => console.log (`Pulled OK: ${image}`))
     .catch(err => core.setFailed (`Pulled Err: ${image} ${err}`))
   // run it
     .then(() => dockerCommand (`run -e PATH -w ${guestDir} -v${hostDir}:${guestDir} ${image} ${command}`))
     .then(() => console.log (`Ran OK: ${command}`))
     .catch(err => core.setFailed (`Run Err: ${image} ${command}: error is: ${err}`));

} catch (error) {
   core.setFailed(error.message);
}
