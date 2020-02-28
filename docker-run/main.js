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

   const dockerImage = core.getInput('docker-image');
   const hostDir     = core.getInput('host-dir');
   const guestDir    = core.getInput('guest-dir');
   const command     = core.getInput('command');
 
   // pull the required machine
   dockerCommand (`pull ${dockerImage}`, options)
     .then(() => console.log (`Pulled OK: ${dockerImage}`))
     .catch(err => console.log (`Pulled Err: ${dockerImage} ${err}`))
   // run it
     .then(() => dockerCommand (`run -w ${guestDir} -v${hostDir}:${guestDir} ${dockerImage} ${command}`))
     .then(() => console.log (`Ran OK: ${command}`))
     .catch(err => console.log (`Run Err: ${dockerImage} ${command}: error is: ${err}`));

} catch (error) {
   core.setFailed(error.message);
}
