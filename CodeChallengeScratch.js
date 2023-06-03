const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

async function loadList(url, key) {
  const res = await fetch(url);

  if (!res.ok) {
		throw new Error(`HTTP error! status: ${res.status}`);
	}

	const data = await res.json();
  //console.log(res);
  //console.log(data);
  //return data;
  search(data, key);

}

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

readline.question('Enter Clinic Name\n', name => {
  const clinicURL = "https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json";

  const clinicList = loadList(clinicURL, name).then();
  readline.close();
});
