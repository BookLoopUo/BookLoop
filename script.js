document.addEventListener("DOMContentLoaded", function () {

  // 1. Search bar (Home): check that something is typed
  var form = document.getElementById("search-form");
  if (form) {
    var input = document.getElementById("book-search");
    var message = document.getElementById("search-message");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var query = input.value.trim();

      if (query === "") {
        message.textContent = "Please type a title, an author or a course code.";
        input.focus();
        return;
      }
      message.textContent = 'Searching for "' + query + '". Search is coming soon.';
    });
  }

  // 2. Highlight the current page in the menu
  var currentPage = decodeURIComponent(window.location.pathname.split("/").pop());
  if (currentPage === "") {
    currentPage = "Home.html";
  }
  document.querySelectorAll(".main-nav a").forEach(function (link) {
    var href = decodeURIComponent(link.getAttribute("href"));
    if (href === currentPage) {
      link.setAttribute("aria-current", "page");
    }
  });

  // 3. Login and action links without a page yet: do not jump to the top
  document.querySelectorAll('a[href="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
    });
  });
  // 4. Home: rotating search hints
  var searchInput = document.getElementById("book-search");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (searchInput && !reduceMotion) {
    var hints = [
      "Search for a book",
      "Try a course code: MAT 1720",
      "Try a title: Dune",
      "Try an author: Orwell"
    ];
    var hintIndex = 0;
    var hintTimer = setInterval(function () {
      hintIndex = (hintIndex + 1) % hints.length;
      searchInput.placeholder = hints[hintIndex];
    }, 2500);

    // Stop changing once the visitor clicks in the bar
    searchInput.addEventListener("focus", function () {
      clearInterval(hintTimer);
      searchInput.placeholder = "Search for a book";
    });
  }
});
