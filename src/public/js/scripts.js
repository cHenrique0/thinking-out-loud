// Disabling form submissions if there are invalid fields
const forms = document.querySelectorAll(".needs-validation");
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

// Preview user profile image
const inputImg = document.querySelector("#profile-image");

inputImg.addEventListener("change", (event) => {
  const target = event.target;
  const files = target.files;
  const fileReader = new FileReader();
  fileReader.onload = () => {
    document.querySelector("#preview-image").src = fileReader.result;
  };
  fileReader.readAsDataURL(files[0]);
});
