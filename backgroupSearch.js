
self.addEventListener('message', function(e) {

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

	  top.testArchitecApi.postFlowsDatatableRows(datatableId, dataTableRow)
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

	    var message = e.data + 'to myself!';
	    self.postMessage(message);
		self.close();

		


}, false);
