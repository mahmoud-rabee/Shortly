// -------------mobile navigation-----------------
let navIcon = document.querySelector('.barsicon');

navIcon.onclick = function () {
    document.querySelector('.nav').classList.toggle('h');
}
/////////////////////////////////////////////////////////

// ---------------get a shorten link---------------------------
let input = document.getElementById('shorten');
let submit = document.getElementById('submit');
let error = document.getElementById('error');

let divs = [];
divs = JSON.parse(localStorage.getItem('divs'));
if(divs == null) {
    divs = []
} else {
    divs = JSON.parse(localStorage.getItem('divs'));
}

function fill() {
    document.querySelector('.result .container.two').innerHTML = '';
    for(let i = 0; i < divs.length; i++) {
    document.querySelector('.container.two').innerHTML += 
    `
       <div class="u">
           <span>${divs[i].original}</span>
           <div class="yarab">
              <span>${divs[i].ct}</span>
              <span class='copy'>${divs[i].copy}</span>
              <span onclick="deleteLink(${i})" class='delete'>Delete</span>
           </div>
       </div>
   `
    }

    // create button to copy the shorted link
    let copyButton = document.querySelectorAll('.copy');

    copyButton.forEach(function(btn) {
        btn.onclick = function() {
            let text = btn.previousElementSibling.innerHTML;
            navigator.clipboard.writeText(text);
            btn.innerHTML = 'Copied!';
            btn.style.backgroundColor = 'hsl(257, 27%, 26%)';
            btn.style.opacity = '1';
        }
    })
    //////////////////////////////////////////
}
fill();

function crateShortLink() {
    fetch(`https://api.shrtco.de/v2/shorten?url=${input.value}`).then(function(response) {
        let data = response.json();
        return data;
     }).then(function(response2) {
        let div = {
            original : response2.result.original_link,
            ct : response2.result.short_link,
            copy : 'Copy',
        }
        divs.push(div);
        let savedDiv = JSON.stringify(divs);
        localStorage.setItem('divs', savedDiv);
        fill();
     })
}

submit.addEventListener('click', function() {
    if(input.value === "") {
        // Create a red outline on the input filed when the `form` is submitted if:
            // - The `input` field is empty
        input.style.outlineWidth = '2px';
        input.style.outlineColor = 'hsl(0, 87%, 67%)';
        input.style.outlineStyle = 'solid';
        ////////////////////////////////////////////////
        // Receive an error message when the `form` is submitted if:
            // - The `input` field is empty
        setTimeout(function() {
            error.innerHTML = 'Please add a link';
        },200)
        ////////////////////////////////////////////
    } else {
        crateShortLink();
        input.value = "";
    }
})
 
//Remove the error message and the red outline when the user focus on the input filed to write a valid url
input.onfocus = function() {
    input.style.outline = 'none';
    error.innerHTML = '';
}
////////////////////////////////////
// Add a new button to delete the shorted link that The user did not need it
let deleteLink = function(i) {
  divs.splice(i, 1);
  localStorage.divs = JSON.stringify(divs);
  fill();
}
