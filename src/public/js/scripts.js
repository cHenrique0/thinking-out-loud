// Disabling form submissions if there are invalid fields
const forms = document.querySelectorAll(".needs-validation");
if (forms) {
  // Loop over them and prevent submission
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

// Preview user profile picture
const inputImg = document.querySelector("#profile-picture");
if (inputImg) {
  inputImg.addEventListener("change", (event) => {
    const target = event.target;
    const files = target.files;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      // document.querySelector("#preview-picture").src = fileReader.result;
      document.querySelector(
        "#preview-picture"
      ).style.backgroundImage = `url(${fileReader.result})`;
      console.log(fileReader.result);
    };
    fileReader.readAsDataURL(files[0]);
  });
}

// Limiting characters in the text area
const textArea = document.querySelector("#title");
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
