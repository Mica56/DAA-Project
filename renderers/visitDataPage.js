/*
  This file contains all the javascript codes for the visit data page
*/

/*
    *   @clar:add --> display all the visit data to the table
    *       Tasks:
    *           @clar: 1. call the .ready method to ensure that the DOM is ready before trying to access it
    *               work on inside its function parameter
    *               @micaela:add --> emit an event just before clar iterate through the data,
    *                                    it would be an event that asks for the visit data;
    *                                       use the ipcRenderer.invoke and check the documentation 
    *                                       for that to check its syntax (it have a good example there)
    *                               Store the data in a variable 
    * 
    *           @clar: 2. Use the dummy data below and display them on the table: (headers and data)
    *                       and store it in a variable
    *           Note: duplicate the data in the array to ensure that they are added 
    *                   row by row and not go in a horizontal way
    *               [
                        {
                            _id: 60b66aa4b13db43de4d86e20,
                            establishment: 60b64d198873311ec41b43f3,
                            visitor: 60b655e296f43737186a8fa8,
                            entered: 2021-06-01T17:13:08.640Z,
                            __v: 0,
                            exited: 2021-06-01T17:31:08.962Z
                        }
                    ]

*/

  $('visit.ejs').ready(async function(event){
    let msg = "requesting visit data..";
    let result = await ipcRenderer.invoke('reqVisitData', msg);

    
    let dataArr = JSON.parse(result);
    // add the headers for the table
    for(const key of Object.keys(dataArr[0])){
      let addHeaders = `<th>${key}</th>`;
      $('#visitTBL thead th:last-child').after(addHeaders);
    }

  
    let counter = 1;
    for (const obj of Object.values(dataArr)) { // add rows 
      let addNewRow;
      let id = obj._id;
      addNewRow = `<tr id=${obj._id}></tr>`
      $('#visitTBL > tbody').append(addNewRow);

      addNewColumn = `<td>${counter++}</td>`
      $(`#visitTBL tbody tr#${id}`).append(addNewColumn);

      // add the columns
      for(const value of Object.values(obj)){
        // console.log(obj[key]);
        addNewColumn = `<td>${value}</td>`
        $(`#visitTBL tbody tr#${id}`).append(addNewColumn);
      }
    }

  });


  $('button#searchBtn').click( function () {
    let input = $('input#searchInput').val();
    
    $(`tbody tr:not(:contains('${input}'))`).hide();
    $(`tbody tr:contains('${input}')`).show();
  });

  $('#searchInput').keyup( function () {
    let input = $('input#searchInput').val();
    
    $(`tbody tr:not(:contains('${input}'))`).hide();
    $(`tbody tr:contains('${input}')`).show();
  });