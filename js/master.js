// Check If There's Local Storage Color Option
let mainColors = localStorage.getItem("color_option");

if(mainColors !== null){
    //console.log('Local Storage It Not Empty You Can Set It On Root Now');
    //console.log(mainColors);

    document.documentElement.style.setProperty('--main-color', mainColors);

    // Remove Active Class From All Colors List Item
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");

        // Add Active Class On Element With Data-color === Local Storage Item
        if(element.dataset.color === mainColors){
            // Add Active Class
            element.classList.add('active');
        }
    });
}

// Random Background Option
let backgroundOption = true;

// Variable To Control The Batckground Interval
let backgroundInterval;

// Check If There's Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background_option");

// Check If Random Background Local Storage Is Not Empty
if(backgroundLocalItem !== null) {

    if(backgroundLocalItem === 'true'){
        backgroundOption = true;
    }else{
        backgroundOption = false;
    }

    // Remove Active Class From Spans
    document.querySelectorAll(".random-backgrounds span").forEach (element => {
        element.classList.remove("active");
    });

    if (backgroundLocalItem === 'true'){
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    } else{
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }
}




// Toggle Spin Class On Icon
document.querySelector(".toggle-settings .fa-gear").onclick = function(){
    // Toggle Class Fa-spin For Rotation On Self
    this.classList.toggle("fa-spin");

    // Toggle Class Open On Main Setteings Box
    document.querySelector(".settings-box").classList.toggle("open");
}


// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");
// Loop On All List Items
colorsLi.forEach(li => {
    // Click On Every List Items
    li.addEventListener("click", (e) => {
        // Set Color On Root
        document.documentElement.style.setProperty("--main-color",e.target.dataset.color);
        // Set Color On Local Storage
        localStorage.setItem("color_option", e.target.dataset.color);

        /*// Remove Active Class From All Childrens
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
        });
        // Add Active Class On Self
        e.target.classList.add("active");*/
        handleActive(e);
    });
});




// Switch Random Background Option
const randomBackEl = document.querySelectorAll(".random-backgrounds span");
// Loop On All Spans
randomBackEl.forEach(span => {
    // Click On Every Span
    span.addEventListener("click", (e) => {

        /*// Remove Active Class From All Spans
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
        });
        // Add Active Class On Self
        e.target.classList.add("active");*/
        handleActive(e);

        if(e.target.dataset.background === 'yes'){
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background_option", true);
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }
    });
});





// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");
// Get Array Of Imgs
let imgsArray = ["header1.jpg", "header5.jpg", "header6.png", "header7.jpg", "header8.jpg", "header10.jpg"];


// Function To Randomize Imgs
function randomizeImgs() {
    if(backgroundOption === true) {
        backgroundInterval = setInterval(() => {
            // Get Random Number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            //console.log(randomNumber);
        
            // Change Bakchground Image Url
            landingPage.style.backgroundImage = 'url("imgs/'+ imgsArray[randomNumber] +'")';
            landingPage.style.transition = 'all 0.5s';
        }, 8000)
    }
}
randomizeImgs();



// Select Skills Selector
let OurSkills = document.querySelector(".skills");

window.onscroll = function(){
    
    // Skills Offset Top
    let skillsOffsetTop = OurSkills.offsetTop;

    // Skills Outer Height
    //let skillsOuterHeight = OurSkills.offsetHeight;

    // Window Height
    //let windowHeight = this.innerHeight;

    // Window ScrollTop
    let windowScrollTop = this.pageYOffset;

    if(windowScrollTop > skillsOffsetTop - 200){
        
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

        allSkills.forEach(skill => {

            skill.style.width = skill.dataset.progress;

        });
    }
}


// Create Popup With The Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

    img.addEventListener('click', (e) => {

        // Create Overlay Element
        let overlay = document.createElement("div");

        // Add CLass To Overlay
        overlay.className = 'popup-overlay';

        // Append Overlay To The Body
        document.body.appendChild(overlay);

        // Create The Popup Box
        let popupBox = document.createElement("div");

        // Add Class To The Popup Box
        popupBox.className = 'popup-box';

        if(img.alt !== null) {

            // Create Heading
            let imgHeading = document.createElement("h3");

            // Create Text For Heading
            let imgText = document.createTextNode(img.alt);

            // Append The Text To The Heading
            imgHeading.appendChild(imgText);

            // Append the Heading To The Popup Box
            popupBox.appendChild(imgHeading);
        }

        // Create The Image
        let popupImage = document.createElement("img");

        // Set Image Source
        popupImage.src = img.src;

        // Add Image To Popup Box
        popupBox.appendChild(popupImage);

        // Add Popup Box To Body
        document.body.appendChild(popupBox);

        // Create The Close Span
        let closeButton = document.createElement("span");

        // Create The Close Button Span
        let closeButtonText = document.createTextNode("X");

        // Append Text To Close Button
        closeButton.appendChild(closeButtonText);

        // Add Class To Close Button
        closeButton.className = 'close-button';

        // Add Close Button To The Popup Box
        popupBox.appendChild(closeButton);

    });
});

// Close Popup
document.addEventListener("click", function (e){

    if(e.target.className == 'close-button'){
        
        // Remove The Current Popup
        e.target.parentNode.remove();

        // Remove Overlay
        document.querySelector(".popup-overlay").remove();
    }
});



// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

/*allBullets.forEach(bullet => {

  bullet.addEventListener("click", (e) => {

    document.querySelector(e.target.dataset.section).scrollIntoView({

        behavior: 'smooth'

    });

  });

});*/

// Select All Links
const allLinks = document.querySelectorAll(".links a");

/*allLinks.forEach(link => {

  link.addEventListener("click", (e) => {

    e.preventDefault();
    
    document.querySelector(e.target.dataset.section).scrollIntoView({

        behavior: 'smooth'

    });

  });

});*/

function scrollToSomewhere (elements){

    elements.forEach(ele => {

        ele.addEventListener("click", (e) => {
      
          e.preventDefault();
          
          document.querySelector(e.target.dataset.section).scrollIntoView({
      
            behavior: 'smooth'
      
          });
      
        });
      
    });
}

scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);


// Handle Active State
function handleActive(ev){
    // Remove Active Class From All Childrens
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    // Add Active Class On Self
    ev.target.classList.add("active");    
}




let bulletSpan = document.querySelectorAll(".bullets-option span");

let bulletContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if(bulletLocalItem !== null) {

    bulletSpan.forEach(span => {

        span.classList.remove("active");

    });

    if (bulletLocalItem === 'block') {

        bulletContainer.style.display = 'block';

        document.querySelector(".bullets-option .yes").classList.add('active');

    } else {

        bulletContainer.style.display = 'none'

        document.querySelector(".bullets-option .no").classList.add('active');

    }
}

bulletSpan.forEach(span => {

    span.addEventListener("click", (e) => {

        if(span.dataset.display === 'show'){

            bulletContainer.style.display = 'block';

            localStorage.setItem("bullets_option", "block");

        } else {

            bulletContainer.style.display = 'none';

            localStorage.setItem("bullets_option", "none");

        }

        handleActive(e);

    });

});


// Reset Button

document.querySelector(".reset-options").onclick = function() {

    //localStorage.clear();
    localStorage.removeItem("bullets_option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("color_option");

    // Reload Window
    window.location.reload();
}


// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function(e) {

    // Stop Propagation
    e.stopPropagation(); // #Video 34

    // Toggle Class "menu-active" On Button
    this.classList.toggle("menu-active");

    // Toggle Class "open" On Links
    tLinks.classList.toggle("open");

}

// Click Anywhere Outside Menu And Toggle Button
document.addEventListener("click", (e) => {

    if(e.target !== toggleBtn && e.target !== tLinks) {

        // Check If The Menu Is Open
        if(tLinks.classList.contains("open")) {

            toggleBtn.classList.toggle("menu-active");

            tLinks.classList.toggle("open");

        }

    }

});

// Stop Propagation On Menu

tLinks.onclick = function (e) {
    e.stopPropagation();
}