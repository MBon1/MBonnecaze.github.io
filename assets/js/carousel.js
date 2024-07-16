var indices = new Object();
var manualCycle = false;

function setCarouselItem(carousel, items, buttons, i) {
    // un-select all items
    items.forEach(item => {
        // Find the videos in the item and pause and restart them
        const videos = item.querySelectorAll("video");
        videos.forEach(video => {
            video.pause();
            video.currentTime = 0;
            video.volume = 1.0;
            video.muted = false;
            video.playbackRate = 1.0;
        });

        // Remove the selected attribute from the item if the item has it
        item.classList.remove("carousel_item-selected");
    });
    buttons.forEach(button => button.classList.remove("carousel_button-selected"));

    items[i].classList.add("carousel_item-selected");
    buttons[i].classList.add("carousel_button-selected");
    indices[carousel] = i;
}

/* 
    Set up each carousel 
*/
document.querySelectorAll(".carousel").forEach(carousel => {
    // Add a new entry to the "hash table" of carousels
    indices[carousel] = 0;
    const items = carousel.querySelectorAll(".carousel_item");

    // Disable picture-in-picture for all videos
    items.forEach(item => {
        const videos = item.querySelectorAll("video");
        videos.forEach(video => {
            video.disablePictureInPicture = true;
            video.controlsList = "nodownload";
        });
    });
    
    // Populate the carousel navigation bar with the buttons
    const leftButtonHtml = `<span class="carousel_arrow left">&#129076;</span>`;
    const rightButtonHtml = `<span class="carousel_arrow right">&#129078;</span>`;
    const buttonsHtml = Array.from(items, (item) => {
        const images = item.querySelectorAll("img");
        
        if (images.length == 0)
            return `<span class="carousel_button"></span>`;
        
        return `<img src="` + images[0].src + `" width="20px" class="carousel_button"></image>`;
    });
    
    carousel.insertAdjacentHTML("beforeend", `
        <div class="carousel_nav">
            ${ leftButtonHtml }
            ${ buttonsHtml.join("") }
            ${ rightButtonHtml }
        </div>
    `);


    const buttons = carousel.querySelectorAll(".carousel_button");
    
    const leftArrow = document.querySelector(".left");
    leftArrow.addEventListener("click", function() {
        if (--indices[carousel] < 0)
            indices[carousel] = buttons.length - 1;
        setCarouselItem(carousel, items, buttons, indices[carousel]);
        manualCycle = true;
    });

    const rightArrow = carousel.querySelector(".right");
    rightArrow.addEventListener("click", function() {
        if (++indices[carousel] >= buttons.length)
            indices[carousel] = 0;
        setCarouselItem(carousel, items, buttons, indices[carousel]);
        manualCycle = true;
    });
    
    
    buttons.forEach((button, i) => {
        button.addEventListener("click", () => {
            setCarouselItem(carousel, items, buttons, i);
            manualCycle = true;
        });
    });
    
    // Select the first item on page load
    setCarouselItem(carousel, items, buttons, 0);
    //setCarouselItem(carousel, items, buttons, (randomize(items)));
});

// Randomizer
function randomize(elements) {
    return Math.floor(Math.random() * elements.length);
}


// Carousel : youtube.com/watch?=XtFlpgaLbZ4
// Hide Video UI : https://stackoverflow.com/questions/23279899/hide-video-controls-until-user-hover-over-video

const delayInMilliseconds = 5000; // 2-second delay

function advanceAutoCycle() {
    setTimeout(function() {
        if (manualCycle)
            return;

        document.querySelectorAll(".carousel").forEach(carousel => {
            const items = carousel.querySelectorAll(".carousel_item");
            const buttons = carousel.querySelectorAll(".carousel_button");

            if (++indices[carousel] >= buttons.length)
                indices[carousel] = 0;
            setCarouselItem(carousel, items, buttons, indices[carousel]);
        });
        
        if (!manualCycle)
            advanceAutoCycle();
    }, delayInMilliseconds);
}

//advanceAutoCycle();
