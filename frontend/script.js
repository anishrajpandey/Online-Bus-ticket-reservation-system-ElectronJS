let searchButton = document.getElementById("searchButton");
searchButton.onclick = (e) => {
  let from = document.getElementById("from").value;
  let to = document.getElementById("to").value;
  let date = document.getElementById("date").value;
  let dateArray = date.split("/").reverse();
  let temp = dateArray[2];
  dateArray[2] = dateArray[1];
  dateArray[1] = temp;
  let dateStr = dateArray.join("/");

  let reservedDate = new Date(date);
  let todaysDate = new Date();
  let validated = false;
  if (reservedDate < todaysDate) {
    alert("Please Enter Upcoming Date");
  } else {
    validated = true;
  }
  if (validated) {
    window.location.href = `/busSearch.html?from=${from}&to=${to}&date=${dateStr}`;
  }
};

// set the default active slide to the first one
let slideIndex = 1;
showSlide(slideIndex);

// change slide with the prev/next button
function moveSlide(moveStep) {
  showSlide((slideIndex += moveStep));
}

// change slide with the dots
function currentSlide(n) {
  showSlide((slideIndex = n));
}

function showSlide(n) {
  let i;
  const slides = document.getElementsByClassName("slide");
  const dots = document.getElementsByClassName("dot");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  // hide all slides
  for (i = 0; i < slides.length; i++) {
    slides[i].classList?.add("hidden");
  }

  // remove active status from all dots
  for (i = 0; i < dots.length; i++) {
    dots[i].classList?.remove("bg-yellow-500");
    dots[i].classList?.add("bg-green-600");
  }

  // show the active slide
  slides[slideIndex - 1]?.classList?.remove("hidden");

  // highlight the active dot
  dots[slideIndex - 1]?.classList?.remove("bg-green-600");
  dots[slideIndex - 1]?.classList?.add("bg-yellow-500");
}
