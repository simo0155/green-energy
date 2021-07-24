// Load your images on page-load
function preloader() {
    const imagesPaths = [
        "images/intro/green-earth.jpg",
        "images/w2e/w2e_plant.png",
        "images/solar/solar.png",
        "images/water/water.png",
    ];
    const images = [];
    for (let i = 0; i < imagesPaths.length; i++) {
        images[i] = new Image();
        images[i].src = imagesPaths[i];
    }

    // Images ready to be used:
    console.log(`Preloaded images:\n\t${images[0].src}\n\t${images[1].src}\n\t${images[2].src}\n\t${images[3].src}`);
};
window.addEventListener("load", preloader());


// Return To Home Link
let home = document.getElementById('home');
home.onclick = function () {
    window.location.reload();
}


// Fetching JSON for Intro Text 
let promise = fetch('content/content.json');

promise
    .then((response) => response.json())
    .then((data) => {
        let markup = `<section class="card">
                      <div class="inner">
                    <h2>${data.intro.heading}</h2>
                    <p>${data.intro.bodyText}</p>
                    </div>
                    <img src="${data.intro.imageURL}" alt="" />
                    </section>`;

        $dc.innerHTML = markup;
    })



// Getting Referrence for Buttons
let $bttn = document.querySelectorAll('button');

// Getting Referrence for Dynamic Content DOM
let $dc = document.getElementById('dynamic-content');

// Handle Selection Function Start 

function handleSelection(ev) {

    // Setting Event Target 
    let target = ev.target;


    // Loop Through Buttons to see if Button has "ID" and Removing it 
    for (let k of $bttn) {
        if (k.hasAttribute('id')) {
            k.removeAttribute('id');
        }
    }

    // Setting active id to event target 
    target.setAttribute("id", "active")


    // Data query function to query and parse data from JSON
    function dataQuery(data) {

        if (target.className === 'w2e') {
            let markup = `<section class="card">
                      <div class="inner">
                      <h2>${data.w2e.heading}</h2>
                      <p>${data.w2e.bodyText}</p>
                      </div>
                      <img src="${data.w2e.imageURL}" alt="${data.w2e.imageAlt}"></img>
                        </section>`;

            $dc.innerHTML = markup;
        }
        if (target.className === 'solar') {
            let markup = `<section class="card">
                      <div class="inner">
                      <h2>${data.solar.heading}</h2>
                    <p>${data.solar.bodyText}</p>
                    </div>
                    <img src="${data.solar.imageURL}" alt="${data.solar.imageAlt}"></img>
                    </section>`;
            $dc.innerHTML = markup;
        }
        if (target.className === 'water') {
            let markup = `<section class="card">
                      <div class="inner">
                      <h2>${data.water.heading}</h2>
                      <p>${data.water.bodyText}</p>
                    </div>
                 <img src="${data.water.imageURL}" alt="${data.water.imageAlt}"></img>
                    </section>`;
            $dc.innerHTML = markup;
        }

    }

    // Fetch Content from JSON  
    let promise = fetch('content/content.json');

    // Parse Data Then Pass Data to Data Query Function 
    promise
        .then((response) => response.json())
        .then(function (data) {
            dataQuery(data)
        });


    // End of Handle Selection Function 
}


// Loop Through Buttons to add event listener on click 
for (let k of $bttn) {
    k.addEventListener('click', handleSelection);
}