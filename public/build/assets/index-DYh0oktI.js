console.log("Register app loading...");
document.addEventListener("DOMContentLoaded", function() {
  console.log("Register app mounted");
  const submitButton = document.querySelector('button[type="submit"]');
  if (submitButton) {
    submitButton.disabled = true;
  }
  const termsButton = document.querySelector("[data-terms-button]");
  console.log("Terms button:", termsButton);
  if (termsButton) {
    termsButton.addEventListener("click", function(e) {
      e.preventDefault();
      console.log("Opening terms modal...");
      if (window.$ && window.$("#termsModal").length) {
        window.$("#termsModal").modal("show");
      } else {
        console.error("Modal jQuery not found");
      }
    });
  } else {
    console.warn("Terms button not found");
  }
});
window.handleTermsAccepted = function(data) {
  console.log("Terms accepted:", data);
  document.getElementById("privacy_policy_accepted").value = "1";
  document.getElementById("terms_conditions_accepted").value = "1";
  document.getElementById("privacy_policy_accepted_at").value = data.privacy_policy_accepted_at;
  document.getElementById("terms_conditions_accepted_at").value = data.terms_conditions_accepted_at;
  const submitButton = document.querySelector('button[type="submit"]');
  if (submitButton) {
    submitButton.disabled = false;
  }
  const warningMessage = document.getElementById("terms-warning");
  if (warningMessage) {
    warningMessage.style.display = "none";
  }
  if (window.$ && window.$("#termsModal").length) {
    window.$("#termsModal").modal("hide");
  }
};
console.log("Register app initialized");
//# sourceMappingURL=index-DYh0oktI.js.map
