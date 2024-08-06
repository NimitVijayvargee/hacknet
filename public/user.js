
async function addPosts(username) {
  try {
    console.log("Scraping scrapbook scraps...");
    const response = await fetch(`https://scrapbook.hackclub.com/api/users/${username}`);

    if (!response.ok) {
      console.log(`HTTP error! status: ${response.status}`);
      return;
    }

    const data = await response.json();
    const posts = data.posts;
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
          ${post.attachments.length > 0 ? `<img class="thumbnail" src="${post.attachments[0]}" onerror="this.style.display='none'" />` : ''}
          <p class="content">${convertToAnchorTag(post.text)}</p>
          <div class="row tags">
            ${post.reactions.map(reaction => `
              <div class="col-2 tag">
                <img class="tag-img" src="${reaction.url}"  onerror="this.style.display='none'" />
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

addPosts(user);
last_theme();
