/* Selecting the page components */
const html = document.documentElement;
const body = document.body;
const toUpBtn = document.querySelector("#to-up-btn");
const mobileMenu = document.querySelector(".mobile-menu");
const navList = document.querySelector(".nav-mobile");
const navLinks = document.querySelectorAll(".nav-mobile .nav-item");
const forms = document.querySelectorAll(".needs-validation");
const inputImg = document.querySelector("#profile-picture");
const inputImgD = document.querySelector("#profile-picture-d");
const textArea = document.querySelector("#title");

/* Disabling form submissions if there are invalid fields */
if (forms) {
  /* Loop over them and prevent submission */
  forms.forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
}

/* Preview user profile picture - mobile device */
if (inputImg) {
  inputImg.addEventListener("change", (event) => {
    const target = event.target;
    const files = target.files;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      document.querySelector(
        "#preview-picture"
      ).style.backgroundImage = `url(${fileReader.result})`;
    };
    fileReader.readAsDataURL(files[0]);
  });
}
/* Preview user profile picture - Large screen device */
if (inputImgD) {
  inputImgD.addEventListener("change", (event) => {
    const target = event.target;
    const files = target.files;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      document.querySelector(
        "#preview-picture-d"
      ).style.backgroundImage = `url(${fileReader.result})`;
    };
    fileReader.readAsDataURL(files[0]);
  });
}

/* Limiting characters in the text area */
if (textArea) {
  const charQty = document.querySelector("#chars");
  const limit = textArea.maxLength;
  const inputLength = textArea.value.length;
  charQty.innerText = limit - inputLength;

  if (charQty.textContent == 0) {
    charQty.classList.add("text-danger");
    textArea.classList.add("is-invalid");
  }

  textArea.addEventListener("input", (event) => {
    const inputAtualLength = textArea.value.length;
    charQty.innerText = limit - inputAtualLength;
    if (charQty.textContent == 0) {
      charQty.classList.add("text-danger");
      textArea.classList.add("is-invalid");
      return;
    }
    charQty.classList.remove("text-danger");
    textArea.classList.remove("is-invalid");
  });
}

// Emojis
/* const emojiButtons = document.querySelectorAll(".btn-emoji");

emojiButtons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    let emoji = btn.outerText;
    // textArea.value += emoji;
    textArea.value += emoji;
    console.log(textArea);
  });
}); */

/* Detecting page scroll down */
const scrollFunction = () => {
  if (body.scrollTop > 50 || html.scrollTop > 50) {
    /* Showing the Go To Up button if scroll down */
    // toUpBtn.style.visibility = "visible";
    /* Hiding the navbar if scroll down */
    if (navList.classList.contains("active")) {
      toggleMobileMenu();
    }
    return;
  }
  /* Hiding go to up button if in the header */
  // toUpBtn.style.visibility = "hidden";
  return;
};
/* Assigning the window scroll function */
window.onscroll = () => scrollFunction();

/* mobile navbar animation */
const animateLinks = () => {
  /* Selecting all links in the navbar menu */
  navLinks.forEach((link, index) => {
    let time = (index / 7) * 0.8;
    /* Setting up the animation function for each link */
    link.style.animation
      ? (link.style.animation = "")
      : (link.style.animation = `navLinksFade 0.5s ease forwards ${time}s`);
  });
};

/* Open/Close the menu */
const toggleMobileMenu = (event) => {
  animateLinks();
  navList.classList.toggle("active");
  mobileMenu.classList.toggle("active");
};
/* Checking if the mobile menu is displaying */
if (mobileMenu) {
  /* Adding a click event to it */
  mobileMenu.addEventListener("click", toggleMobileMenu);
}
