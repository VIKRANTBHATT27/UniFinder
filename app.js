let darkMode = document.querySelector("#darkmode-toggle");

darkMode.addEventListener("click", () => {

     let rows = document.querySelectorAll("tr");


     if (darkMode.checked == true) {
          document.querySelector("body").style.background = "#242424";
          document.querySelector("body").style.transition = "0.3s";
          
          // console.log(rows);
          rows.forEach((row,index) => {
               if (index%2 == 1) {
                    rows[index].style.color = "#fafafa";
                    rows[index].style.backgroundColor = "#9394a5";
               }
               else {
                    rows[index].style.color = "#242424";
                    rows[index].style.backgroundColor = "#d2d3db";
               }
          });

          let headingTable = document.querySelectorAll("th");
          headingTable.forEach(el => {
               el.style.backgroundColor = "#484b6a";
          });

          document.querySelector("table").style.borderColor = "hsl(0,0%,75%)";
     }
     else {
          document.querySelector("body").style.background = "hsl(0, 0%, 95%)";
          document.querySelector("body").style.transition = "0.3s";

          // console.log(rows);
          rows.forEach((row,index) => {
               if (index%2 == 1) {
                    rows[index].style.color = "#242424";
                    rows[index].style.backgroundColor = "hsl(0, 0%, 80%)";
               }
               else {
                    rows[index].style.color = "#242424";
                    rows[index].style.backgroundColor = "hsl(0,0%,90%)";
               }
          });

          let headingTable = document.querySelectorAll("th");
          headingTable.forEach(el => {
               el.style.backgroundColor = "hsl(0,0%,45%)";
          });

          document.querySelector("table").style.borderColor = "hsl(0,0%,0%)";
     }
});

let input = document.querySelector("#collegeName");
let btn = document.querySelector("#searchIcon");

// console.dir(input);

async function dataFetchingFunc () {
     // console.log(input.value);

     let url = "http://universities.hipolabs.com/search?name=";
     let cName = input.value;
     let fullUrl = url + cName;

     let result = await fetch(fullUrl);
     // console.log(result);
     let freshFormat = await result.json();
     // console.log(freshFormat);
     
     for (col of freshFormat) {
          // console.log(col["state-province"]);
          if (col["state-province"] == null) {
               col["state-province"] = '-';
          }
     }

     dataInsertionFunc(freshFormat);
}

async function dataInsertionFunc (allData) {
     let chart = document.querySelector(".table1");
     // console.log(allData.length);

     chart.innerHTML = "<table class='table1'><thead><tr><th>Country</th><th>College Name</th><th>State</th><th>Website</th></tr></thead></table>";
     
     let test = document.querySelector("#test");
     // console.dir(test);     

     for (let i=0; i<allData.length; i++) {
          //each value of i create a table row

          let tableRow = document.createElement("tr");

          let country = document.createElement("td");
          let CollegeName = document.createElement("td");
          let State = document.createElement("td");
          let webpageLink = document.createElement("td");

          //insert values 
          let countryName = allData[i].country;
          let countryCode = allData[i].alpha_two_code;

          country.innerText = `${countryName} (${countryCode})`;
          country.style.textAlign = "center";
          // console.log(country);



          CollegeName.innerText = `${allData[i].name}`;
          CollegeName.style.textAlign = "center";
          // console.log(CollegeName);
          
          State.innerText = `${allData[i]["state-province"]}`;
          State.style.textAlign = "center";
          // console.log(State);
          // console.dir(State);

          webpageLink.innerHTML = `<a href=${allData[i].web_pages[0]}>` + "Link" + "</a>";
          webpageLink.style.textAlign = "center";
          // console.log(webpageLink);

          // console.log(`\n`);

          //append that row as a child
          tableRow.appendChild(country);
          tableRow.appendChild(CollegeName);
          tableRow.appendChild(State);
          tableRow.appendChild(webpageLink);

          chart.appendChild(tableRow);
     }
     
     window.scroll ({
          top: 550,
          behavior: "smooth",
     });
}

btn.addEventListener("click", async () => {
     // window.scrollBy({
     //      top: 550,
     //      behavior: "smooth"
     // });
     
     btn.style.marginTop = "15em";
     btn.style.transition = "0.5s";
     // input.style.top = "15em";
     input.style.marginTop = "3em";
     input.style.transition = "0.5s";

     await dataFetchingFunc();
});
input.addEventListener("keypress", async (e) => {
     if (e.code == "Enter") {

          // window.onload = () => {
          //      window.scrollBy({
          //           top: 300,
          //           behavior: "smooth"
          //      });
          // }

          btn.style.marginTop = "15em";
          btn.style.transition = "0.5s";
          // input.style.top = "15em";
          input.style.marginTop = "3em";
          input.style.transition = "0.5s";

          await dataFetchingFunc();
     };
});


// document.getElementById("searchIcon").addEventListener("click", () => {
//     window.scrollBy({
//         top: 550,
//         behavior: "smooth"
//     });
// });
