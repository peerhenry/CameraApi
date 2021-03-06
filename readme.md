# Camera API

![demo](https://github.com/peerhenry/CameraApi/blob/master/snip.PNG)

## Create javascript bundle
Install node modules using `npm install`, then run `npm run build`. This will create 'bundle.js' inside 'wwwroot'.

## Using the google API
The client makes a call to the google API using an empty string as Key. If you wish to use your own valid key you can enter it in the file 'js/apiKey';
Be sure to build the bundle again afterwards.

## Running the server
Run the server using `dotnet run`

## Use the CLI
To display the list of cameras in the console, run: `dotnet run search`

To filter based on name, use the flag --name, eg. `dotnet run search --name neude`

## Unit tests
There are Javascript unit tests. They can be executed and displayed in browser using `npm test`