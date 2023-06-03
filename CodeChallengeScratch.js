//Used to get the user's input
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

//async function to fetch the endpoint
//Paramaters are the user's input to search the JSON and the url
async function loadList(url, key) {
  const res = await fetch(url);
	
  //If there is an error with the connection an error is thrown	
  if (!res.ok) {
		throw new Error(`HTTP error! status: ${res.status}`);
	}

  const data = await res.json();

  //Search the JSON object with the user's input 	
  search(data, key);

}

//The search function for the JSON object
function search(data, key){
if (typeof data !== "object" || data === null) {
      return data === key ? data : undefined;
  }
  for (const [k, v] of Object.entries(data)) {
      const result = search(v, key);
      if (result !== undefined) {
          console.log(result);
      }
      return undefined;
  }
}

//Asks the user for their input 
readline.question('Enter Clinic Name\n', name => {
  const clinicURL = "https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json";

  const clinicList = loadList(clinicURL, name).then();
  readline.close();
});
