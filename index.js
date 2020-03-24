const express = require("express");
const bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 80;
const BASE_PATH = "/api/v1";
app.use(bodyParser.json());
var electricityProduced = [];

// GET electricityProduced/loadInitialData
app.get(BASE_PATH + "/electricity-produced-stats/loadInitialData", (req, res)=> {
	var electricityProducedInitial = [
		{"country": "EEUU", 
 		"state": "Alabama", 
		"year": 2018,
 		"hydro": 11142139,
 		"solar": 357252,
 		"coal": 3177520
		}, 
		{"country": "EEUU", 
		 "state": "Arkansas",
		 "year": 2018,
		 "hydro": 3008775,
 		"solar": 203413,
 		"coal": 29996101
		}
		];
	electricityProduced= electricityProducedInitial;
	res.send(JSON.stringify(electricityProducedInitial, null, 2));
});

//GET electricityProduced
app.get(BASE_PATH+ "/electricity-produced-stats", (req, res) =>{
	res.send(JSON.stringify(electricityProduced, null, 2));
});

// POST electricity-produced-stats 
app.post(BASE_PATH + "/electricity-produced-stats", (req, res) =>{
	var newStat= req.body;
	if(newStat == {} || (newStat.country == null || newStat.country== "")
	  || (newStat.state == null || newStat.state== "")
	  || (newStat.year == null || newStat.year== "")
	  || (newStat.hydro == null || newStat.hydro== "")
	  || (newStat.solar == null || newStat.solar== "")
	  || (newStat.coal == null || newStat.coal== "")){
		res.sendStatus(400, "BAD REQUEST");
	}else{
		electricityProduced.push(newStat);
		res.sendStatus(201, "New stat created");
	}
});

//DELETE electicity-produced-stats 
app.delete(BASE_PATH + "/electricity-produced-stats", (req, res)=>{
	electricityProduced= [];
	res.sendStatus(200, "Data deleted");
});

//PUT NOT ALLOWED ON THE ENTIRE ARRAY

app.put(BASE_PATH + "/electricity-produced-stats", (req, res) =>{
	res.sendStatus(405, "YOU FUCKING DONKEY, THIS IS NOT ALLOWED");
});


// GET /electricity-produced-stats/:country/:state
app.get(BASE_PATH + "/electricity-produced-stats/:country/:state", (req, res)=>{
	var country= req.params.country;
	var state = req.params.state;
	var filteredData= electricityProduced.filter((e) =>{
		return (e.country == country) && (e.state == state);
	});
	if(filteredData.length >= 1){
		res.send(filteredData[0]);
	}else{
		res.send(404, "Data not Found");
	}
});

//GET /electricity-produced-stats/:params
/* app.get(BASE_PATH + "/electricity-produced-stats/:param", (req, res) => {
	var param = req.params.param;
	var filteredDataByParam= electricityProduced.filter((e) =>{
		return ((e.country == param) || (e.state == param) || (e.year == param) || (e.hydro == param) || (e.solar == param) || (e.coal == param));
	});
	if(filteredDataByParam.length >= 1){
		res.send(filteredDataByParam[0]);
	}else{
		res.sendStatus(404, "Data not Found");
	}
	
});
*/

// DELETE /electricity-produced-stats/:country/:state

app.delete(BASE_PATH + "/electricity-produced-stats/:state", (req, res) =>{
	var state = req.params.state;
	var filteredDataForDelete= electricityProduced.filter((e)=>{
		return (e.state != state);
	});
	if(filteredDataForDelete.length< electricityProduced.length){
		electricityProduced= filteredDataForDelete;
		res.sendStatus(200, "Data deleted");
	}else{
		res.sendStatus(404, "Data not pressent");
	};
});

//PUT /electricity-produced-stats/:country/:state
app.put(BASE_PATH + "/electricity-produced-stats/:country/:state", (req, res)=>{
	var country= req.params.country;
	var state: req.params.state;
	var body= req.body;
	
	var updatedData= electricityProduced.map((e)=>{
		var updData=e;
		if(e.country == country && e.state == state){
			for(var p in body){
				updData[p]= body[p];
			}
		}
		return (updData);
	});
	
});

app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");







/*
/ GET CONTACTS

app.get(BASE_API_URL+"/contacts", (req,res) =>{
	res.send(JSON.stringify(contacts,null,2));
	console.log("Data sent:"+JSON.stringify(contacts,null,2));
});


// POST CONTACTS

app.post(BASE_API_URL+"/contacts",(req,res) =>{
	
	var newContact = req.body;
	
	if((newContact == "") || (newContact.name == null)){
		res.sendStatus(400,"BAD REQUEST");
	} else {
		contacts.push(newContact); 	
		res.sendStatus(201,"CREATED");
	}
});

// DELETE CONTACTS

app.delete(BASE_API_URL+"/contacts",(req,res) =>{
	
	var newContact = req.body;
	 if(newContact== ""){
		contacts== newContact; 	
		res.sendStatus(201,"Contacts deleted");
	 };
});
// GET CONTACT/XXX

app.get(BASE_API_URL+"/contacts/:name", (req,res)=>{
	
	var name = req.params.name;
	
	var filteredContacts = contacts.filter((c) => {
		return (c.name == name);
	});
	
	
	if(filteredContacts.length >= 1){
		res.send(filteredContacts[0]);
	}else{
		res.sendStatus(404,"CONTACT NOT FOUND");
	}
});

// PUT CONTACT/XXX
app.put(BASE_API_URL+"/contacts/:name/:phone", (req,res)=>{
	
	var name = req.params.name;
	var phone = req.params.phone;
	var updatedContact= req.body;
	
	var filteredContacts = contacts.filter((c) => {
		return (c.name == name && c.phone== phone);
	});
		if(filteredContacts.length>0){
			contacts.name=updatedContact.name;
			contacts.phone= updatedContact.phone;
			res.sendStatus(200,"contacto cambiado");
		}
	
});
// DELETE CONTACT/XXX
app.delete(BASE_API_URL+"/contacts/:name", (req, res)=>{
	var name = rep.params.name;
	var filteredContacts= contacts.filter((c)=> {
		return (c.name != name);
	})
	if(contacts.length > filteredContacts.length){
		contacts=filteredContacts;
		res.sendStatus(200, "Contact deleted correctly");
	}else{
		res.sendStatus(404, "Contact not found");
	}
	*/
