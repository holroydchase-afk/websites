(function () {
  // Mobile menu
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Photos: show a labeled tile if a photo can't load.
  document.querySelectorAll(".photo__frame img").forEach(function (img) {
    var frame = img.parentNode;
    function missing() { frame.classList.add("is-missing"); }
    img.addEventListener("error", missing);
    if (img.complete && img.naturalWidth === 0 && img.currentSrc) missing();
  });

  // Contact form: preselect topic from ?topic=, then open the visitor's email app with the message filled in.
  var form = document.getElementById("contact-form");
  if (form) {
    var topic = new URLSearchParams(location.search).get("topic");
    var select = document.getElementById("f-topic");
    if (topic && select.querySelector('option[value="' + topic + '"]')) select.value = topic;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll("[required]").forEach(function (el) {
        var bad = !el.value.trim() || (el.type === "email" && !/^\S+@\S+\.\S+$/.test(el.value));
        el.setAttribute("aria-invalid", bad ? "true" : "false");
        if (bad) ok = false;
      });
      var status = document.getElementById("form-status");
      if (!ok) { status.textContent = "Please fill in your name, a valid email and a message."; return; }
      var d = new FormData(form);
      var subject = "Website message: " + select.options[select.selectedIndex].text;
      var body = d.get("message") + "\n\n" + d.get("first") + " " + d.get("last") + "\n" + d.get("email");
      location.href = "mailto:Foundationopenarms@gmail.com?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
      status.textContent = "Your email app should open with your message ready to send.";
    });
  }
})();
