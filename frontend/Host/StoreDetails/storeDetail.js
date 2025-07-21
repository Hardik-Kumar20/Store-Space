// const { createElement } = require("react");

// setting up address api
document.getElementById('btn').addEventListener('click' , coordinate);
async function coordinate() {
    const address = document.getElementById("address").value;
    const apiKey = process.env.apiKey;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}&limit=1`;

    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    
    // what i wanna do is first i wanna give him suggestions and then save his selected location and data in my backend 

    //giving suggestions


    // first check on the length of address
    if(address.length < 3){
        document.getElementById('suggestions').innerHTML = "";
        return;
    }


    // map all the suggestions provided by opencage api 
    const suggestions = data.results.map(result => result.formatted);



    // make the ul clear
    const suggestionList = document.getElementById("suggestions");
    suggestionList.innerHTML = "";





    // applying for each loop on all the mapped suggestions 
    suggestions.forEach(suggestion => {

        //made the list inside unordered list
        const li = document.createElement("li");


        //write al the suggestins inside the list 
        li.textContent = suggestion;

        // this function is used to fill the list value inside the address box 
        li.onclick = ()=>{
            document.getElementById('address').innerHTML = suggestion;

            //empty the list
            suggestionList.innerHTML = "";
        }

        suggestionList.appendChild(li);
    });

}