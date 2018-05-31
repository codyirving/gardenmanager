
const plant = new Plant({"commonName":"Tomato", "daysToHarvest":"70"});
const notification = new Notification({"message":"Hi there!"});
const contact = new Contact({"phoneNumber":"619-555-1234","email":"mark@mark.com","address":"123 New York St. NY NY"});
const dateAcquired = "";
const note = new Note({"content":"buy new plants"});
const media = new Media({"title":"my animated gif","URL":"http://..","notes":"from last week"});
const soilLog = new SoilLog({"action":"added new soil and chicken manure to bed and turned whole bed over"});


const bedPos00 = new BedPosition({"occupied":true,"plantType":plant});
const bedPos01 = new BedPosition({"occupied":true,"plantType":plant});
const bedPos02 = new BedPosition({"occupied":true,"plantType":plant});
const bedPos03 = new BedPosition({"occupied":true,"plantType":plant});
const bedPos04 = new BedPosition({"occupied":true,"plantType":plant});

const bedPos10 = new BedPosition({"occupied":true,"plantType":plant});
const bedPos11 = new BedPosition({"occupied":true,"plantType":plant});
const bedPos12 = new BedPosition({"occupied":true,"plantType":plant});
const bedPos13 = new BedPosition({"occupied":true,"plantType":plant});
const bedPos14 = new BedPosition({"occupied":true,"plantType":plant});

const bedPos20 = new BedPosition({"occupied":true,"plantType":plant});
const bedPos21 = new BedPosition({"occupied":true,"plantType":plant});
const bedPos22 = new BedPosition({"occupied":true,"plantType":plant});
const bedPos23 = new BedPosition({"occupied":true,"plantType":plant});
const bedPos24 = new BedPosition({"occupied":true,"plantType":plant});

const bedPos30 = new BedPosition({"occupied":true,"plantType":plant});
const bedPos31 = new BedPosition({"occupied":true,"plantType":plant});
const bedPos32 = new BedPosition({"occupied":true,"plantType":plant});
const bedPos33 = new BedPosition({"occupied":true,"plantType":plant});
const bedPos34 = new BedPosition({"occupied":true,"plantType":plant});

const bedPos40 = new BedPosition({"occupied":true,"plantType":plant});
const bedPos41 = new BedPosition({"occupied":true,"plantType":plant});
const bedPos42 = new BedPosition({"occupied":true,"plantType":plant});
const bedPos43 = new BedPosition({"occupied":true,"plantType":plant});
const bedPos44 = new BedPosition({"occupied":true,"plantType":plant});

const bedPos50 = new BedPosition({"occupied":true,"plantType":plant});
const bedPos51 = new BedPosition({"occupied":true,"plantType":plant});
const bedPos52 = new BedPosition({"occupied":true,"plantType":plant});
const bedPos53 = new BedPosition({"occupied":true,"plantType":plant});
const bedPos54 = new BedPosition({"occupied":true,"plantType":plant});

const bedPos60 = new BedPosition({"occupied":true,"plantType":plant});
const bedPos61 = new BedPosition({"occupied":true,"plantType":plant});
const bedPos62 = new BedPosition({"occupied":true,"plantType":plant});
const bedPos63 = new BedPosition({"occupied":true,"plantType":plant});
const bedPos64 = new BedPosition({"occupied":true,"plantType":plant});

const bedPos70 = new BedPosition({"occupied":true,"plantType":plant});
const bedPos71 = new BedPosition({"occupied":true,"plantType":plant});
const bedPos72 = new BedPosition({"occupied":true,"plantType":plant});
const bedPos73 = new BedPosition({"occupied":true,"plantType":plant});
const bedPos74 = new BedPosition({"occupied":true,"plantType":plant});

const bedPos80 = new BedPosition({"occupied":true,"plantType":plant});
const bedPos81 = new BedPosition({"occupied":true,"plantType":plant});
const bedPos82 = new BedPosition({"occupied":true,"plantType":plant});
const bedPos83 = new BedPosition({"occupied":true,"plantType":plant});
const bedPos84 = new BedPosition({"occupied":true,"plantType":plant});

const bedPos90 = new BedPosition({"occupied":true,"plantType":plant});
const bedPos91 = new BedPosition({"occupied":true,"plantType":plant});
const bedPos92 = new BedPosition({"occupied":true,"plantType":plant});
const bedPos93 = new BedPosition({"occupied":true,"plantType":plant});
const bedPos94 = new BedPosition({"occupied":true,"plantType":plant});

const row0 = [bedPos00,bedPos01,bedPos02,bedPos03,bedPos04];
const row1 = [bedPos10,bedPos11,bedPos12,bedPos13,bedPos14];
const row2 = [bedPos20,bedPos21,bedPos22,bedPos23,bedPos24];
const row3 = [bedPos30,bedPos31,bedPos32,bedPos33,bedPos34];
const row4 = [bedPos40,bedPos41,bedPos42,bedPos43,bedPos44];
const row5 = [bedPos50,bedPos51,bedPos52,bedPos53,bedPos54];
const row6 = [bedPos60,bedPos61,bedPos62,bedPos63,bedPos64];
const row7 = [bedPos70,bedPos71,bedPos72,bedPos73,bedPos74];
const row8 = [bedPos80,bedPos81,bedPos82,bedPos83,bedPos84];
const row9 = [bedPos90,bedPos91,bedPos92,bedPos93,bedPos94];

const fullBed = [row0,row1,row2,row3,row4,row5,row6,row7,row8,row9];




//WORKING DUPE KEY VALIDATOR 

const bed1 = new Gardenbeds({"bedNumber":"1","owner":"Cody",contact,"notes":note,"bedPositions":fullBed,"media":media,"soilLog":soilLog,"notifications":notification});
const bed2 = new Gardenbeds({"bedNumber":"2","owner":"Cody",contact,"notes":note,"bedPositions":fullBed,"media":media,"soilLog":soilLog,"notifications":notification});
const bed3 = new Gardenbeds({"bedNumber":"3","owner":"Cody",contact,"notes":note,"bedPositions":fullBed,"media":media,"soilLog":soilLog,"notifications":notification});
const bed4 = new Gardenbeds({"bedNumber":"4","owner":"Cody",contact,"notes":note,"bedPositions":fullBed,"media":media,"soilLog":soilLog,"notifications":notification});
const bed5 = new Gardenbeds({"bedNumber":"5","owner":"Cody",contact,"notes":note,"bedPositions":fullBed,"media":media,"soilLog":soilLog,"notifications":notification});
const bed6 = new Gardenbeds({"bedNumber":"6","owner":"Cody",contact,"notes":note,"bedPositions":fullBed,"media":media,"soilLog":soilLog,"notifications":notification});
const bed7 = new Gardenbeds({"bedNumber":"7","owner":"Cody",contact,"notes":note,"bedPositions":fullBed,"media":media,"soilLog":soilLog,"notifications":notification});
const bed8 = new Gardenbeds({"bedNumber":"8","owner":"Cody",contact,"notes":note,"bedPositions":fullBed,"media":media,"soilLog":soilLog,"notifications":notification});
const bed9 = new Gardenbeds({"bedNumber":"9","owner":"Cody",contact,"notes":note,"bedPositions":fullBed,"media":media,"soilLog":soilLog,"notifications":notification});
const bed10 = new Gardenbeds({"bedNumber":"10","owner":"Cody",contact,"notes":note,"bedPositions":fullBed,"media":media,"soilLog":soilLog,"notifications":notification});
const bed11 = new Gardenbeds({"bedNumber":"11","owner":"Cody",contact,"notes":note,"bedPositions":fullBed,"media":media,"soilLog":soilLog,"notifications":notification});
const bed12 = new Gardenbeds({"bedNumber":"12","owner":"Cody",contact,"notes":note,"bedPositions":fullBed,"media":media,"soilLog":soilLog,"notifications":notification});
const bed13 = new Gardenbeds({"bedNumber":"13","owner":"Cody",contact,"notes":note,"bedPositions":fullBed,"media":media,"soilLog":soilLog,"notifications":notification});
const bed14 = new Gardenbeds({"bedNumber":"14","owner":"Cody",contact,"notes":note,"bedPositions":fullBed,"media":media,"soilLog":soilLog,"notifications":notification});
const bed15 = new Gardenbeds({"bedNumber":"15","owner":"Cody",contact,"notes":note,"bedPositions":fullBed,"media":media,"soilLog":soilLog,"notifications":notification});
const bed16 = new Gardenbeds({"bedNumber":"16","owner":"Cody",contact,"notes":note,"bedPositions":fullBed,"media":media,"soilLog":soilLog,"notifications":notification});


const bedsArray = [bed1,bed2,bed3,bed4,bed5,bed6,bed7,bed8,bed9,bed10,bed11,bed12,bed13,bed14,bed15,bed16];



// Gardenbeds.insertMany(bedToAdd,function(err) {
//   console.log("InsertError: " + err)
// });
// Gardenbeds.insertMany(bedsArray,function(err) {
//   console.log("InsertError: " + err);
// });

// Gardenbeds.findOneAndUpdate({"owner": "Cody"}, {$push:{"notifications":n}},
// function(error,success) {
//   if(error) {
//     console.log("pushERROR: " + error);
//   }else{
//     console.log("pushSUCCESS: " + success);
//   }
// }
// );


// Gardenbeds.findOneAndUpdate({"owner":"Cody"}, {"bedNumber": "3"},
//   function(error,success) {
//     if(error) {
//       console.log("ERROR: " + error);
//     }else{
//       console.log("SUCCESS: " + success);
//     }
//   });
  // requiredFields.forEach(function(field) {
  //   if(!(field in req.body)) {
  //     const message = `Missing \`${field}\` in request body`;
  //     console.error(message);
  //     //return not breaking 
  //     res.status(400).send(message);
  //     quit=true;
  //   }
  // });
  // if(quit) return;

  //const notification = new Notification({"message":req.body.message});

  console.log(`Adding notification to bed \`${req.params.id}\``);

  // Gardenbeds.findOneAndUpdate({"bedNumber": req.params.id}, {$push:{"notifications":notification}},
  //   function(error,success) {
  //     if(error) {
  //       console.log("ERROR: " + error);
  //       res.status(201).json(error);
  //     }else{
  //       console.log("SUCCESS: " + success);
  //       res.status(201).json(success);
  //     }
  //   }
  // );

 