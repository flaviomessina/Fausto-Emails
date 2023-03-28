
//const lib = require('https://sdk-cdn.mypurecloud.com/javascript/160.1.0/purecloud-platform-client-v2.min.js'); 
//var platformClient = lib.require('platformClient');
//self.addEventListener('message', function(e) {


	console.log("Hello world!");

    const clientId = 'cb672a64-8ae6-4044-9f91-063b0ef18bf8';
    // const redirectUri = 'http://localhost:8080/index.html';
    const redirectUri = 'https://flaviomessina.github.io/Fausto-Emails/client-app-sdk.html';
    //const redirectUri = 'C:\Users\FlavioMessina\Documents\GitHub\Fausto-Emails\client-app-sdk.html';

    const appName = 'sample_app';
    const qParamLanguage = 'en-gb';
    const qParamEnvironment = 'mypurecloud.ie';

    // Default values are assigned but values should 
    // be set on the function 'assignConfiguration'
    let language = 'en-us';
    let environment = 'mypurecloud.ie'; 

    let userDetails = null;

    //var integrationsApi;
    //const architectApi;
    var testArchitecApi;
    var testName = 'hiThere';
    var platformClient;


      platformClient = require('platformClient');
      const client = platformClient.ApiClient.instance;
      const usersApi = new platformClient.UsersApi();
      const integrationsApi = new platformClient.IntegrationsApi();
      
      architectApi1 = new platformClient.ArchitectApi();
      const architectApi2 = new platformClient.ArchitectApi();
      //top.testArchitecApi = new platformClient.ArchitectApi();
	  architectApi = new platformClient.ArchitectApi();
      // Configure Client App
      const ClientApp = window.purecloud.apps.ClientApp;
      const myClientApp = new ClientApp({
          pcEnvironment: environment
      });

      // Configure and Authenticate Platform Client
      client.setPersistSettings(true, appName);
      client.setEnvironment(environment);

      console.log("loginImplicitGrant");

      client.loginImplicitGrant(clientId, redirectUri)

        .then(data =>  usersApi.getUsersMe())
        .then(data => {
          userDetails = data;

          myClientApp.alerting.showToastPopup(
            `Hi ${userDetails.name}`, 
            'Never gonna give you up, never gonna let you down 😊');
        })
        .catch(err => console.log(err));  
   

    /**
     * Configure both the Platform SDK and the Client App SDK
     */
    /*function setupGenesysClients(){
      platformClient = require('platformClient');
      const client = platformClient.ApiClient.instance;
      const usersApi = new platformClient.UsersApi();
      integrationsApi = new platformClient.IntegrationsApi();
      
      architectApi1 = new platformClient.ArchitectApi();
      const architectApi2 = new platformClient.ArchitectApi();
      //top.testArchitecApi = new platformClient.ArchitectApi();
	  architectApi = new platformClient.ArchitectApi();
      // Configure Client App
      let ClientApp = window.purecloud.apps.ClientApp;
      let myClientApp = new ClientApp({
          pcEnvironment: environment
      });

      // Configure and Authenticate Platform Client
      client.setPersistSettings(true, appName);
      client.setEnvironment(environment);

      console.log("loginImplicitGrant");

      return client.loginImplicitGrant(clientId, redirectUri)

        .then(data =>  usersApi.getUsersMe())
        .then(data => {
          userDetails = data;

          myClientApp.alerting.showToastPopup(
            `Hi ${userDetails.name}`, 
            'Never gonna give you up, never gonna let you down 😊');
        })
        .catch(err => console.log(err));  
    }*/

    /**
     * Assign the language and environment for the app first through
     * the query parameters. But if non-existent, attempt to get
     * it from localStorage. If none, use default values.
     */
    function assignConfiguration(){
      let url = new URL(window.location);
      let searchParams = new URLSearchParams(url.search);

      if(searchParams.has(qParamLanguage)){
        language = searchParams.get(qParamLanguage);
        localStorage.setItem(`${appName}_language`, language);
      } else {
        let local_lang = localStorage.getItem(`${appName}_language`);
        if(local_lang) language = local_lang;
      }

      if(searchParams.has(qParamEnvironment)){
        environment = searchParams.get(qParamEnvironment);
        localStorage.setItem(`${appName}_environment`, environment);
      } else {
        let local_env = localStorage.getItem(`${appName}_environment`);
        if(local_env) environment = local_env;
      }
    }

    // After page loads...
    /*window.addEventListener('load', (event) => {
      assignConfiguration();
      console.log(`environment: ${environment}`);
      console.log(`language: ${language}`);

      setupGenesysClients()
      //.then(() => { 
        // Display values to the page
      //  document.getElementById('span_environment').innerText = environment;
     //   document.getElementById('span_language').innerText = language;
     //   document.getElementById('span_name').innerText = userDetails.name;

      console.log('Finished setup.');
    //  })
    });*/

    function search(searchTerm){

      let actionId = "13a448c9-8c47-4ddd-992d-8aa2d3add55e"; // String | actionId
      let body = null; // {String: Object} | Map of parameters used for variable substitution.

      integrationsApi.postIntegrationsActionExecute(actionId, body)
        .then((data) => {
          console.log(`postIntegrationsActionExecute success! data: ${JSON.stringify(data, null, 2)}`);
        })
        .catch((err) => {
          console.log('There was a failure calling postIntegrationsActionExecute');
          console.error(err);
        });
    }
        
      function addRow(searchTerm){
      let datatableId = "13a448c9-8c47-4ddd-992d-8aa2d3add55e"; // String | id of datatable
      let dataTableRow = null; // {String: Object} | 
      let searchId = Date.now();

      console.log(searchId)
      console.log(searchTerm)

      dataTableRow = '{"search":"'+ searchTerm +'", "key": "'+ searchId +'"}';

      console.log(dataTableRow);

      // Create a new row entry for the datatable.
      //architectApi = new platformClient.ArchitectApi();
      architectApi.postFlowsDatatableRows(datatableId, dataTableRow)
        .then((data) => {
          console.log(`postFlowsDatatableRows success! data: ${JSON.stringify(data, null, 2)}`);
        })
        .catch((err) => {
          console.log("There was a failure calling postFlowsDatatableRows");
          console.error(err);
        });
      
    }
      
	//self.onmessage = function addSearchFromMain(msg) {
    self.addEventListener('message', function(e) {
	
	try{
		console.log("message from main received in worker:", e);
		console.log("message from main received in worker:", e.data);

		// send buf back to main and transfer the underlying ArrayBuffer
	  	//self.postMessage(bufTransferredFromMain, [bufTransferredFromMain]);
	  	// code to be run

		addRow(e.data);

	}catch(err){
		console.log(err.message);
	}

    var message = 'to myself!';
    self.postMessage(message);
	self.close();
});

    assignConfiguration();
      console.log(`environment: ${environment}`);
      console.log(`language: ${language}`);

      setupGenesysClients()
      //.then(() => { 
        // Display values to the page
      //  document.getElementById('span_environment').innerText = environment;
     //   document.getElementById('span_language').innerText = language;
     //   document.getElementById('span_name').innerText = userDetails.name;

      console.log('Finished setup.');