const testvar = "hi";
//!add auth
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
  console.log("authToken: " + document.cookie.authToken);
  return new Promise(function (resolve, reject) {
    var settings = {
      async: true,
      beforeSend: function (xhr) {
        xhr.setRequestHeader(
          "Authorization",
          `Bearer ${document.cookie.authToken}`
        );
      },
      url: `http://localhost:3001/bed/${bedNumber}`,
      method: "POST",
      dataType: "json",
      data: data
    };

    $.ajax(settings).done(function (data, textStatus, jqXHR) {
      console.log(jqXHR.statusText);
      alert(JSON.stringify(jqXHR.statusText));
      resolve(textStatus);
    }).fail(function () {
      console.log("FAILED");
      alert("Update Failed");
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
    if (ownerList != null) resolve(ownerList[i - 1].owner);
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
      messages;
      console.log("RESPONSE!: " + JSON.stringify(response.notifications));
      resolve(response.notifications);
      // Array.prototype.forEach.call(response.notifications, notification => {
      //   notification.message



      //   //   message = `<li class="item"> <span class="content">
      //   //   <i class="icon"></i> ${
      //   //     notification.message
      //   //     }</span>  </li>`;
      //   //   console.log("message: " + message);
      //   //   messages = messages + "\n" + message;
      //   // });



      //   console.log("resolving: " + messages);


      //   //resolve(response.notifications);

      // });
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
      messages;

      resolve(response.notes);
      // Array.prototype.forEach.call(response.notes, note => {
      //   message = `<li class="item"> <span class="content">
      //   <i class="icon"></i> ${
      //     note.content
      //     }</span>  </li>`;
      //   console.log("message: " + message);
      //   messages = messages + "\n" + message;
      // });
      // console.log(
      //   "typeofMessagesTotal: " +
      //   typeof messages +
      //   "  messages total: " +
      //   messages
      // );
      // console.log("resolving: " + messages);
      // // messages = messages +
      // //   `<button class="button">
      // //   <i class="material-icons">add</i>
      // //   </button>`;
      // resolve(messages);
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
    let i = 0;
    $.ajax(settings).done(response => {
      messages;

      Array.prototype.forEach.call(response.soilLog, soilLog => {
        message = `<li class="item"> <span class="content">
        <i class="icon">#${++i}</i> ${
          soilLog.action
          }</span>  </li>`;
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
      // messages = messages +
      //   `<button class="button">
      //   <i class="material-icons">add</i>
      //   </button>`;
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
    let htmlResponse = "";
    console.log("response typeof: " + typeof response);

    //Iterate through matrix array of bed positions by row
    Array.prototype.forEach.call(response, (row, index1) => {
      console.log("index: " + index1);
      console.log("notification: " + JSON.stringify(row));
      console.log("notification typeof: " + typeof row);
      //Iterate through matrix array of bed positions by column/position
      Array.prototype.forEach.call(row, (position, index2) => {
        htmlResponse += `<div class='${
          position.occupied ? "occupied" : "unoccupied"
          } col-2point4 plant-position p'>
         
        <div class="title">
        <h2 class="title-text">${position.plantType.commonName}</h2>
        </div>
        <div class="position-edit-text">
          <a class="button" href="/gardener/${bedNumber}/edit/${index1},${index2}"><i class="material-icons">edit</i></a>
        </div>
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
  $(".owner").text(owner);
}
async function setNotifications(bedNumber) {
  const notifications = await getBedNotifications(bedNumber);
  
  Array.prototype.forEach.call(notifications, notification => {


    $('.notifications').append(`
          
          <div class='notification-message row'> ${notification.message} </div>
    
       
         
       
          `);

  });



  
}
async function setNotes(bedNumber) {
  const notes = await getBedNotes(bedNumber);
  Array.prototype.forEach.call(notes, note => {


    $('.notes').append(`
          
          <div class='notes-message row'> ${note.content} </div>
    
       
         
       
          `);

  });
}
async function setSoilLog(bedNumber) {
  const soilLog = await getBedSoilLog(bedNumber);
  $(".soil-log").html(soilLog);
}
async function setAdminEditor() {
  const fullList = await getBedsInformation();
  let html = "";
  console.log(fullList);
  fullList.forEach(bed => {
    console.log("FOREACH:" + bed);
    html =
      html +
      ` <form class="row" id="updateform-${
      bed.bedNumber
      }" action="javascript:updateDB(${bed.bedNumber})">
    <div class="col-12 ">
    <div class="title">
    <h2 class="title-text">Bed #${bed.bedNumber}</h2>
  </div>
  <div class="row">
    <div class='col-6 support-text'>
    
      <div class='row'>
      Owner:
    
      <input class="input" type="text" name="owner" id="owner" value="${
      bed.owner
      }">
      
          
      </div>
      <div class='row'>
      Phone:
      <input class="input" type="text" name="phoneNumber" id="phoneNumber" value="${
      bed.contact.phoneNumber
      }">
      </div>
      <div class='row'>
      Email:
      <input class="input" type="text" name="email" value="${
      bed.contact.email
      }">
      </div>

    </div>

    <div class='col-6 support-text'>
      <div class='row'>
      Address:
      <input class="input" type="text" name="address" value="${
      bed.contact.address
      }">
      </div>
      <div class='row'>
      Length:
      <input type="text" class="input" name="length" maxwidth="2" size="2" value="${
      bed.length
      }">
      Width:
      <input type="text" class="input" name="width" maxwidth="2" size="2" value="${
      bed.width
      }">
      </div>
      <div class='row'>
      Date Acquired:
     <input class="input" type="text" name="dateAcquired"  value="${
      bed.dateAcquired
      }">
      </div>
      </div>
      <div class='row'>
      <input class="button" type="submit" name="submit" value="Update">
      </div>
    

     
      <br>
      </div>
      </div>
      </form>
      <div class='row'>
      <div class='col-2 send-notification-button'>
      <button onclick="javascript:viewNotifications(${bed.bedNumber});" class="button">Send Notification</button>
      <button onclick="javascript:viewBed(${bed.bedNumber});" class="button">View Bed</button>
      </div>


      </div>
      <br>
      `;
  });
  console.log("HTML: " + html);
  $("body").html(html);
}

function viewBed(bedNumber) {
  window.location.assign(`/gardener/${bedNumber}`);
}
function viewNotifications(bedNumber) {
  window.location.assign(`/admin/notifications/${bedNumber}`);
}
async function sendNotification(bedNumber) {
  let form = new FormData(document.getElementById("notification-form"));

  //let message = form.get("notification");
  if (form.get('message').length < 1) {
    alert("Message empty!");
    return;
    //$(this).parents('p').addClass('warning');
  }

  //let form = new FormData(document.getElementById("notification-form"));

  //let message = form.get("notification");
  const submitJSON = {};
  for (var pair of form.entries()) {
    console.log(pair[0] + ", " + pair[1]);
    submitJSON[pair[0]] = pair[1];
  }
  let response = await sendBedNotification(bedNumber, submitJSON);
  console.log(response);
}


async function sendBedNotification(bedNumber, data) {
  console.log("Data:" + JSON.stringify(data));
  console.log("authToken: " + document.cookie.authToken);
  return new Promise(function (resolve, reject) {
    var settings = {
      async: true,
      beforeSend: function (xhr) {
        xhr.setRequestHeader(
          "Authorization",
          `Bearer ${document.cookie.authToken}`
        );
      },
      url: `http://localhost:3001/bed/${bedNumber}/notifications`,
      method: "POST",
      dataType: "json",
      data: data
    };

    $.ajax(settings).done(function (data, textStatus, jqXHR) {
      console.log(jqXHR.statusText);
      alert(JSON.stringify(jqXHR.statusText));
      resolve(textStatus);
    }).fail(function () {
      console.log("FAILED");
      alert("Update Failed");
    });
  });
}








async function updateDB(bedNumber) {
  console.log("bed:" + bedNumber);
  //const formID = `#updateform-${bedNumber}`;
  //const formdata = $(formID).serializeArray();

  var form = new FormData(document.getElementById("updateform-" + bedNumber));
  var inputValue = form.get("owner");

  const submitJSON = {};

  for (var pair of form.entries()) {
    console.log(pair[0] + ", " + pair[1]);
    submitJSON[pair[0]] = pair[1];
  }

  let response = await updateBedInformation(bedNumber, submitJSON);

  console.log(response);

}

async function login() {
  const formID = `loginform`;
  formData = new FormData(document.getElementById(formID));

  const submitJSON = {};

  for (var pair of formData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
    submitJSON[pair[0]] = pair[1];
  }
  //sets cookie
  const token = await getToken(submitJSON);
  console.log("TOKEN: " + token);
  window.location.href = "/admin/dashboard/";
}

function loadAdmin(token) {
  $.ajax({
    url: "/admin/dashboard",
    type: "GET",
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    },
    data: {},
    error: function () { }
  }).done(response => {
    jQuery("body").html(response);
  });
}

async function getToken(data) {
  console.log("Data:" + JSON.stringify(data));
  return new Promise(function (resolve, reject) {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    var settings = {
      mode: "same-origin",
      redirect: "follow",
      crossDomain: true,
      credentials: "include",
      withCredentials: true,
      url: `http://localhost:3001/api/auth/login`,
      headers: headers,
      method: "POST",
      dataType: "json",
      data: data
    };

    $.ajax(settings).done(response => {
      resolve(response);
    });
  });
}

function getPositionInfo(bedNumber, posX, posY) {
  return new Promise(function (resolve, reject) {
    var settings = {
      async: true,
      beforeSend: function (xhr) {
        xhr.setRequestHeader(
          "Authorization",
          `Bearer ${document.cookie.authToken}`
        );
      },
      url: `http://localhost:3001/bed/${bedNumber}/${posX},${posY}`,
      method: "GET",
      dataType: "json"
    };

    $.ajax(settings).done(response => {
      console.log("GET POSITION response: " + response);
      resolve(response);
    });
  });
}

async function setEditPosition(bedNumber, posX, posY) {
  const positionInfo = await getPositionInfo(bedNumber, posX, posY);
  console.log("pos info " + positionInfo);

  let html = ` <form class="row" id="editposition-${bedNumber}" action="javascript:updatePOS(${bedNumber},${posX},${posY})">
  <div class="col-12">
  <div class="title">
  <h2 class="title-text">Bed #${bedNumber} </h2>
</div>
<div class="row">
  <div class='col-6 support-text'>
  
    <div class='row'>
    
    
    Start Date:<input class="input" type="text" name="startDate" value="${
    moment(positionInfo.startDate)
    }">
    </div><br>
    <div class='row'>
    Harvest Date:<input class="input" type="text" name="harvestDate" value="${
    moment(positionInfo.harvestDate)
    }">
    </div><br>
    <div class='row'>
    Occupied:<input class="radio-button" type="radio" id="true" name="occupied" value="true"><label for="true">TRUE</label><input class="radio-button" type="radio" id="false" name="occupied" value="false"><label for="false">FALSE</label>
    </div>
    </div>

  <div class='col-6 support-text'>
    <div class='row common-name'>
    Plant:<input class="input" type="text" name="plantType.commonName" value="${
    positionInfo.plantType.commonName
    }">
    </div>
    <br>
    <div class ='row image-urls'>
    Image URLs:
    </div>
    </div>
    
    <div class='col-12 update-button'><input class="submit-button" type="submit" name="submit" value="Update"></div>
    <br>
    </div>
    </div>
    </form>
    <br>
    `;

  $(".position").html(html);
  if (positionInfo.occupied === true) {
    $("#true").prop("checked", true);
  } else $("#false").prop("checked", true);
  console.log("URLS LENGTH: " + positionInfo.plantType.imgURLs.length);
  if (positionInfo.plantType.imgURLs.length === 0)
    $(".image-urls").append(`<input type='text' name='imageURL-0' value=''>`);
  for (const i = 0; i < positionInfo.plantType.imgURLs.length; i++) {
    $(".image-urls").append(
      `<input type='text' name='imageURL-${i}' value='${
      positionInfo.plantType.imgURLs[i]
      }'`
    );
  }
}

async function updatePOS(bedNumber, posX, posY) {
  console.log("bed:" + bedNumber);

  //const formID = `#editposition-${bedNumber}`;
  //const formdata = $(formID).serializeArray();

  var form = new FormData(document.getElementById("editposition-" + bedNumber));
  var inputValue = form.get("owner");
  console.log("inputValue" + inputValue);
  const submitJSON = {};

  for (var pair of form.entries()) {
    console.log(pair[0] + ", " + pair[1]);
    submitJSON[pair[0]] = pair[1];
  }

  let response = await updatePositionInformation(
    bedNumber,
    submitJSON,
    posX,
    posY
  );

  console.log(response);
}

function updatePositionInformation(bedNumber, data, posX, posY) {
  console.log("Data:" + JSON.stringify(data));
  console.log("authToken: " + document.cookie.authToken);
  return new Promise(function (resolve, reject) {
    var settings = {
      async: true,
      beforeSend: function (xhr) {
        xhr.setRequestHeader(
          "Authorization",
          `Bearer ${document.cookie.authToken}`
        );
      },
      url: `http://localhost:3001/bed/${bedNumber}/${posX},${posY}`,
      method: "POST",
      dataType: "json",
      data: data
    };

    $.ajax(settings).done(function (data, textStatus, jqXHR) {
      alert(textStatus);
      console.log("response: " + textStatus);
      resolve(textStatus);
    });
  });
}


async function setEditNotifications(bedNumber) {


  const notifications = await getBedNotifications(bedNumber);
  Array.prototype.forEach.call(notifications, notification => {
    moment().format('MMMM Do YYYY, h:mm:ss');
    let formattedDate = moment(notification.date);

    $('.notifications-list').append(`
          <div class='row'>
          <div class='notification-message col-4'> ${notification.message} </div>
          <div class='notification-date col-4'>${formattedDate}</div>
          <div class='notification-id'>${notification._id}</div>
          <div class='col-4'><button id='notification-delete-button'>Delete</button></div>
          </div>
          `);

  });

}
async function setEditNotes(bedNumber) {


  const notes = await getBedNotes(bedNumber);
  Array.prototype.forEach.call(notes, note => {
    let formattedDate = moment(note.date);

    $('.notes-list').append(`
          <div class='row'>
          <div class='note-message col-4'> ${note.content} </div>
          <div class='note-date col-4'>${formattedDate}</div>
          <div class='note-id'>${note._id}</div>
          <div class='col-4'><button id='note-delete-button'>Delete</button></div>
          </div>
          `);

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
