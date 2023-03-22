
//self.addEventListener('message', function(e) {
self.onmessage = function handleMessageFromMain(msg) {
	console.log("message from main received in worker:", msg);
	console.log("message from main received in worker:", msg.data);

	// send buf back to main and transfer the underlying ArrayBuffer
  //self.postMessage(bufTransferredFromMain, [bufTransferredFromMain]);
  	// code to be run

	let datatableId = "13a448c9-8c47-4ddd-992d-8aa2d3add55e"; // String | id of datatable
	let dataTableRow = null; // {String: Object} | 
	  let searchId = Date.now();
	  let searchTerm = "hi there";

	  console.log(searchId);
	  console.log(searchTerm);

	  dataTableRow = '{"search":"'+ searchTerm +'", "key": "'+ searchId +'"}';
	  console.log(dataTableRow);

	  try{

	  	console.log('sending message2');

	  	msg.data.postFlowsDatatableRows(datatableId, dataTableRow)
	    .then((data) => {
	      console.log(`postFlowsDatatableRows success testArchitecApi! data: ${JSON.stringify(data, null, 2)}`);
	    })
	    .catch((err) => {
	      console.log("There was a failure calling postFlowsDatatableRows testArchitecApi");
	      console.error(err);
	    });
	}catch(err){
		console.log(err.message);
	}

	  try{// Create a new row entry for the datatable.
	  //architectApi = new platformClient.ArchitectApi();
	  	console.log(globalThis.foo);
	  window.architectApi.postFlowsDatatableRows(datatableId, dataTableRow)
	    .then((data) => {
	      console.log(`postFlowsDatatableRows success! data: ${JSON.stringify(data, null, 2)}`);
	    })
	    .catch((err) => {
	      console.log("There was a failure calling postFlowsDatatableRows");
	      console.error(err);
	    });
	}catch(err){
		console.log(err.message);
	}

	    var message = 'to myself!';
	    self.postMessage(message);
		self.close();

		


};
