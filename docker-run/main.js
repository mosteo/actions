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
 
   // pull the required machine
   const data = await dockerCommand
     (`pull ${core.getInput('docker-image')}`, options);

} catch (error) {
   core.setFailed(error.message);
}
