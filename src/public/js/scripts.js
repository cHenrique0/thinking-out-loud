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
