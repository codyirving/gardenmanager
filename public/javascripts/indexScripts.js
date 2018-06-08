const testvar = 'hi';

async function generateBeds() {
  try {
   
    const numberOfBeds = 15;
    let row = 1;
    for (i = 1; i <= numberOfBeds; i++) {
      if (i % 4 === 0 && row !== 1) $("body").append(`</div>`);
      $(`.row${row}`).append(`
          <div class=\'col-3 bedNumber${i}\'>
            <a href=\"bed/${i}\">
              <svg width=\"100%\">
                <rect width=\"100%\" height=\"100%\" fill=\"green\" />
                <text x=\"20\" y=\"60\" font-family=\"Verdana\" font-size=\"55\" fill=\"white\" stroke=\"black\" stroke-width=\"2\">
                  Bed ${i}
                </text>
                <text x=\"20\" y=\"100\" font-family=\"Verdana\" font-size=\"20\" fill=\"white\" stroke=\"black\" stroke-width=\"0\">
                Owner: ${await getBedOwner(i)}                
                </text>
              </svg>
            </a>
          </div>
        `);
      if (i % 4 === 0)
        $("body").append(`<div class=\'row rowpadding row${++row}\'>`);
    }
  } catch (error) {
    console.log("generate beds error: " + error);
    return null;
  }
}

let ownerList = null;

async function getBedOwner(i) {
  if(ownerList === null) ownerList = await getBedOwners();
    console.log("Owner: " + ownerList);
    return new Promise(function(resolve, reject) {
      if(ownerList != null) resolve(JSON.stringify(ownerList[i].owner));
      else reject(Error("reejected"));
    // setTimeout(function() {
    //   console.log("resolving: " + ownerList);
    //   resolve(JSON.stringify(ownerList[i].owner));
    // }, 100);
  });
}

async function getBedOwners() {
  
  return new Promise(function(resolve, reject) {


    var settings = {
      async: true,
      crossDomain: true,
      url: `http://localhost:3001/gardeners/`,
      method: "GET",
      dataType: "json",
      processData: false,
      contentType: false
    };
    let ownerList = "";
    $.ajax(settings).done(response => {
      
      console.log("response typeof: " + typeof response);
      ownerList = response;
      
      Array.prototype.forEach.call(response, bed => {
       //blank
      });
      console.log(
        "typeofMessagesTotal: " +
          typeof ownerList +
          "  messages total: " +
          ownerList
      );

      if(ownerList != undefined) resolve(ownerList);
      else reject(Error("reejected"));

    });



    // setTimeout(function() {
    //   console.log("resolving: " + ownerList);
    // resolve(ownerList);
    // }, 500);
  });
}


function getBedNotifications(bedNumber) {
  var settings = {
    async: true,
    crossDomain: true,
    url: `http://localhost:3001/notifications/${bedNumber}`,
    method: "GET",
    dataType: "json",
    processData: false,
    contentType: false
  };
  let messages = "";
  $.ajax(settings).done(response => {
    messages = `Notifications for bed number ${bedNumber}: `;
    console.log("response typeof: " + typeof response);
    Array.prototype.forEach.call(response, notification => {
      console.log("notification: " + JSON.stringify(notification));
      console.log("notification typeof: " + typeof notification);
      notification = notification.notifications;
      Array.prototype.forEach.call(notification, message => {
        console.log("message: " + message);
        messages = messages + "\n" + message.message;
      });
    });
    console.log(
      "typeofMessagesTotal: " +
        typeof messages +
        "  messages total: " +
        messages
    );
  });
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      console.log("resolving: " + messages);
      resolve(messages);
    }, 100);
  });
}
function generatePositions(bedNumber) {
  var settings = {
    async: true,
    crossDomain: true,
    url: `http://localhost:3001/bedpositions/${bedNumber}`,
    method: "GET",
    processData: false,
    contentType: false
  };
  $.ajax(settings).done(function(response) {
    let title = `Positions for bed number ${bedNumber}: `;
    let htmlResponse = "";
    console.log("response typeof: " + typeof response);
    Array.prototype.forEach.call(response, (row, index1) => {
      console.log("index: " + index1);
      console.log("notification: " + JSON.stringify(row));
      console.log("notification typeof: " + typeof row);

      Array.prototype.forEach.call(row, (position, index2) => {
        htmlResponse += `<div class=\'col-2point4 plant-position\'>
          ${position.plantType.commonName}<br>
          [ ${index1},${index2} ]
          </div>`;
      });
      console.log("htmlResponse: " + htmlResponse);
      console.log(response);
    });
    $("body").html("<div class='row'></div>");
    $(".row").html(htmlResponse);
  });
}
function getBedPositions(bedNumber) {
  var settings = {
    async: true,
    crossDomain: true,
    url: `http://localhost:3001/bedpositions/${bedNumber}`,
    method: "GET",
    processData: false,
    contentType: false
  };
  $.ajax(settings).done(function(response) {
    console.log("getBedPositions response: " + response);
    return response;
  });
}



///edit table
// $('.plant-position').click(function(){
//   var name = $(this).text();
//   $(this).html('');
//   $('<input></input>')
//       .attr({
//           'type': 'text',
//           'name': 'fname',
//           'id': 'txt_fullname',
//           'size': '20',
//           'value': name
//       })
//       .appendTo('.plant-position');
//   $('#txt_fullname').focus();
// });

// $(document).on('blur','#txt_fullname', function(){
//   var name = $(this).val();
//   const position = $(this).parent().data('position-index');
//   $.ajax({
//     type: 'post',
//     url: 'change-name.xhr?name=' + name + "," + position,
//     success: function(){
//       $('#fullname').text(name);
//     }
//   });
// });
///end edit table

// $(document).ready(function() {
//   $('.plant-position').editable({
//     url: '/post',
//     type: 'text',
//     pk: 1,
//     name: 'testdiv',
//     title: 'Enter username'
// });

// });
