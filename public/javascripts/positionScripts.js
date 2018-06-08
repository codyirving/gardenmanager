$(document).ready(function() {
//     console.log("window location: " + window.location.pathname);
//     $.fn.editable.defaults.ajaxOptions = {type: "POST"};
  
//     $('.info').editable(
//         {
//             success: function(response) {
//                         console.log("response:" + response);
//                         }}).submit(
//                             {
//                             url:"/",
//                             data: {"occupied":"false"}
        
//     });


  
    $('.info').editable({
    url: "http://localhost:3001" + window.location.pathname,
    type: 'text',
    dataType: 'json',
    params: function(params) {
        //originally params contain pk, name and value
        console.log("function:" + params);
        params.occupied= false;
        return params;
    },
    success: function(response, anyValue, value2) {


        console.log("response:" + response + " val:" + anyValue + " val2: " + value2);
    },
    error: function(response) {
        console.log("error response: " + response);
    }
  });
});

function updateDB(url, value) {
var settings = {
    async: true,
    crossDomain: true,
    url: `http://localhost:3001/window.location.pathname/${bedNumber}`,
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
}