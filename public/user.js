
window.onload = last_theme;
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
});

async function addPosts(username) {
  try {
    console.log("Scraping scrapbook scraps...");
    const response = await fetch(`https://scrapbook.hackclub.com/api/users/${username}`);

    if (!response.ok) {
      console.log(`HTTP error! status: ${response.status}`);
      return;
    }

    const data = await response.json();
    console.log("API Response:", data); // Log the entire API response

    const posts = data.posts; // Access the posts array
    if (!posts) {
      console.error("No posts found in API response");
      return;
    }

    const postsContainer = document.getElementById('container');
    posts.forEach(post => {
      const postElement = document.createElement("div");
      postElement.className = 'row';

      postElement.innerHTML = `
        <div class="blank col-lg-3 col-sm-0"></div>
        <div class="post col-lg-6 col-sm-12">
          <div class="user-info">
            <img class="avatar col-sm-2" src="${data.profile.avatar}" alt="${data.profile.username}'s avatar">
            <div class="name col-sm-6">
              <div class="displayname"><a href="/users/${data.profile.username}/">${data.profile.username}</a></div>
              <div class="smaller-text">${data.profile.username}</div>
            </div>
            <div class="streak col-sm-4" style="font-size: 150%; text-align: right; vertical-align: middle;">
              ${data.profile.streakCount}
            </div>
          </div>
          ${post.attachments.length > 0 ? `<img class="thumbnail" src="${post.attachments[0]}" alt="Post thumbnail">` : ''}
          <p class="content">${convertToAnchorTag(post.text)}</p>
          <div class="row tags">
            ${post.reactions.map(reaction => `
              <div class="col-2 tag">
                <img class="tag-img" src="${reaction.url}" alt="${reaction.name}">
                <div class="smaller-text">#${reaction.name}</div>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="blank col-lg-3 col-sm-0"></div>
      `;

      postsContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }
}

function convertToAnchorTag(inputString) {
  const urlRegex = /<([^>]+)>/g;
  return inputString.replace(urlRegex, function (match, url) {
    return `<a href="${url}">${url}</a>`;
  });
}

addPosts(user);
last_theme();
console.log("user.js is loaded");