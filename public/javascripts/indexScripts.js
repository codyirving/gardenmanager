const testvar = 'hi';




async function getBedsInformation() {


  return new Promise(function (resolve, reject) {

    var settings = {
      async: true,
      crossDomain: true,
      url: `http://localhost:3001/bed/`,
      method: "GET",
      dataType: "json",
      processData: false,
      contentType: false
    };
    let messages = "";
    $.ajax(settings).done(response => {
      resolve(response);
    });

  });
}








async function updateBedInformation(bedNumber, data) {

  console.log("Data:" + JSON.stringify(data));
  return new Promise(function (resolve, reject) {

    var settings = {
      async: true,
      crossDomain: true,
      url: `http://localhost:3001/bed/${bedNumber}`,
      method: "POST",
      dataType: "json",
      data: data

    };
   
    $.ajax(settings).done(response => {
      resolve(response);
    });

  });
}








async function generateBeds() {
  try {

    const numberOfBeds = 15;
    let row = 1;
    for (i = 1; i <= numberOfBeds; i++) {
      if (i % 4 === 0 && row !== 1) $("body").append(`</div>`);
      $(`.row${row}`).append(`
          <div class=\'col-3 bedNumber${i}\'>
            <a href=\"gardenbed/${i}\">
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
  if (ownerList === null) ownerList = await getBedOwners();
  console.log("Owner: " + ownerList);
  return new Promise(function (resolve, reject) {
    if (ownerList != null) resolve(JSON.stringify(ownerList[i].owner));
    else reject(Error("reejected"));
    // setTimeout(function() {
    //   console.log("resolving: " + ownerList);
    //   resolve(JSON.stringify(ownerList[i].owner));
    // }, 100);
  });
}

async function getBedOwners() {

  return new Promise(function (resolve, reject) {


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

      if (ownerList != undefined) resolve(ownerList);
      else reject(Error("reejected"));

    });



    // setTimeout(function() {
    //   console.log("resolving: " + ownerList);
    // resolve(ownerList);
    // }, 500);
  });
}


async function getBedNotifications(bedNumber) {


  return new Promise(function (resolve, reject) {

    var settings = {
      async: true,
      crossDomain: true,
      url: `http://localhost:3001/bed/${bedNumber}/notifications/`,
      method: "GET",
      dataType: "json",
      processData: false,
      contentType: false
    };
    let messages = "";
    $.ajax(settings).done(response => {
      messages = `Notifications for bed number ${bedNumber}: <br>`;

      Array.prototype.forEach.call(response.notifications, notification => {

        message = "<li>" + notification.message + "</li>";
        console.log("message: " + message);
        messages = messages + "\n" + message;
      });
      console.log(
        "typeofMessagesTotal: " +
        typeof messages +
        "  messages total: " +
        messages
      );
      console.log("resolving: " + messages);
      resolve(messages);
    });

  });
}











async function getBedNotes(bedNumber) {


  return new Promise(function (resolve, reject) {

    var settings = {
      async: true,
      crossDomain: true,
      url: `http://localhost:3001/bed/${bedNumber}/notes/`,
      method: "GET",
      dataType: "json",
      processData: false,
      contentType: false
    };
    let messages = "";
    $.ajax(settings).done(response => {
      messages = `Notes for bed number ${bedNumber}: <br>`;

      Array.prototype.forEach.call(response.notes, note => {

        message = "<li>" + note.content + "</li>";
        console.log("message: " + message);
        messages = messages + "\n" + message;
      });
      console.log(
        "typeofMessagesTotal: " +
        typeof messages +
        "  messages total: " +
        messages
      );
      console.log("resolving: " + messages);
      resolve(messages);
    });

  });
}



async function getBedSoilLog(bedNumber) {


  return new Promise(function (resolve, reject) {

    var settings = {
      async: true,
      crossDomain: true,
      url: `http://localhost:3001/bed/${bedNumber}/soilLog/`,
      method: "GET",
      dataType: "json",
      processData: false,
      contentType: false
    };
    let messages = "";
    $.ajax(settings).done(response => {
      messages = `SoilLog for bed number ${bedNumber}: <br>`;

      Array.prototype.forEach.call(response.soilLog, soilLog => {

        message = "<li>" + soilLog.action + "</li>";
        console.log("message: " + message);
        messages = messages + "\n" + message;
      });
      console.log(
        "typeofMessagesTotal: " +
        typeof messages +
        "  messages total: " +
        messages
      );
      console.log("resolving: " + messages);
      resolve(messages);
    });

  });
}




function generatePositions(bedNumber) {
  var settings = {
    async: true,
    crossDomain: true,
    url: `http://localhost:3001/bed/${bedNumber}/positions`,
    method: "GET",
    processData: false,
    contentType: false
  };
  $.ajax(settings).done(function (response) {
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
    //$("body").html("<div class='row'></div>");
    $(".row1").html(htmlResponse);
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
  $.ajax(settings).done(function (response) {
    console.log("getBedPositions response: " + response);
    return response;
  });
}

async function setOwner(bedNumber) {
  const owner = await getBedOwner(bedNumber);
  console.log("owner: " + owner);
  $('.owner').text(owner);
}
async function setNotifications(bedNumber) {
  const messages = await getBedNotifications(bedNumber);
  console.log("setNotifications to: " + messages);
  $('.notifications').html(messages);
}
async function setNotes(bedNumber) {
  const notes = await getBedNotes(bedNumber);
  $('.notes').html(notes);
}
async function setSoilLog(bedNumber) {
  const soilLog = await getBedSoilLog(bedNumber);
  $('.soil-log').html(soilLog);
}
async function setAdminEditor() {
  const fullList = await getBedsInformation();
  let html = "";
  console.log(fullList);
  fullList.forEach(bed => {
    console.log("FOREACH:" + bed);
    html = html + ` <form id="updateform-${bed.bedNumber}" action="javascript:updateDB(${bed.bedNumber})">
    <div class='row'>
   
      <div class='col-4 bedNumber'>
      
      ${bed.bedNumber}
      Owner:<input type="text" name="owner" value="${bed.owner}">
      </div>
      <div class='col-4'>
      Phone:<input type="text" name="phoneNumber" value="${bed.contact.phoneNumber}">
      </div>
      <div class='col-4'>
      E-mail:<input type="text" name="email" value="${bed.contact.email}">
      </div>
      </div>
      <div class='row'>
      <div class='col-4'>
      Address:<input type="text" name="address" value="${bed.contact.address}">
      </div>
      <div class='col-4'>
      Bed Length:<input type="text" name="length" maxwidth="2" size="2" value="${bed.length}">
      Bed Width:<input type="text" name="width" maxwidth="2" size="2" value="${bed.width}">
      </div>
      <div class='col-4'>
      Date Acquired:<input type="text" name="dateAcquired"  value="${bed.dateAcquired}">
      </div>
      </div>
      <div class='row'><input type="submit" name="submit" value="Update"></div>
      </form>
      <br>
      `;
      
  });
  console.log("HTML: " + html);
  $('body').html(html);
  
}



async function updateDB(bedNumber) {
  console.log("bed:" + bedNumber);
  const formID = `#updateform-${bedNumber}`;
  const formdata = $(formID).serializeArray();
 

  var form = new FormData(document.getElementById("updateform-"+bedNumber));
  var inputValue = form.get("owner");

  const submitJSON = {};




for(var pair of form.entries()) {
   console.log(pair[0]+ ', '+ pair[1]); 

    submitJSON[pair[0]]= pair[1];

}

let response = await updateBedInformation(bedNumber,submitJSON);

console.log(response);

  console.log("formdata: " + JSON.stringify(formdata));

   console.log("formedata2: " + inputValue);
  




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
