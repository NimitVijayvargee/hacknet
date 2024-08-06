function back_to_top() {
    document.scrollY = 0;
  }
  
  function setMouseMoveListener(color1, color2) {
    function mouseMoveHandler(event) {
      var container = document.getElementById("container");
      var rect = container.getBoundingClientRect();
      var x = event.clientX - rect.left;
      var y = event.clientY - rect.top;
      container.style.background = `radial-gradient(circle at ${x}px ${y}px, ${color1} 20px, ${color2} 120px)`;
    }
    document.removeEventListener('mousemove', document.mouseMoveHandler);
    document.mouseMoveHandler = mouseMoveHandler;
    document.addEventListener('mousemove', mouseMoveHandler);
  }
  
  function dark_mode() {
    var html = document.documentElement;
    html.setAttribute("data-bs-theme", "dark");
    setMouseMoveListener('#343a40', '#212529');
    document.cookie = "theme=dark";
    console.log("Dark mode set");
    var logo = document.getElementsByClassName("logo")[0];
    logo.setAttribute("data-bs-theme", "dark");
  }
  
  function arcade_mode() {
    var html = document.documentElement;
    html.setAttribute("data-bs-theme", "arcade");
    var body = document.body;
    body.style.backgroundImage = `linear-gradient(rgba(250, 239, 214, 0.7), rgba(250, 239, 214, 0.7)), url(https://icons.hackclub.com/api/icons/0xD8A52D/glyph:rep.svg)`;
    setMouseMoveListener('rgba(132, 146, 166, 0)', 'rgba(250, 239, 214, 0.9)');
    document.cookie = "theme=arcade";
    console.log("Arcade mode set");
    var logo = document.getElementsByClassName("logo")[0];
    logo.setAttribute("data-bs-theme", "arcade");
  }
  
  function last_theme() {
    var theme = getCookie("theme");
    console.log("Retrieved theme from cookie: " + theme);
    if (theme === "dark") {
      dark_mode();
    } else if (theme === "arcade") {
      arcade_mode();
    } else {
      dark_mode();
    }
  }
  
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  window.addEventListener('load', function () {
    last_theme();
    addPosts();
  });

  
function convertToAnchorTag(inputString) {
    const urlRegex = /<([^>]+)>/g;
    return inputString.replace(urlRegex, function (match, url) {
      return `<a href="${url}">${url}</a>`;
    });
  }

  document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const input = document.getElementById('searchInput').value.trim();

    if (input.startsWith('@')) {
      const username = input.slice(1);
      window.location.href = `/users/${username}`;
    } else if (input.startsWith('#')) {
      const tag = input.slice(1);
      window.location.href = `/tags/${tag}`;
    } else {
      alert("Please start your search with '@' for users or '#' for tags.");
    }
  });