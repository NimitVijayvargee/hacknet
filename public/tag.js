
async function addPosts(tag) {
  try {
    console.log(tag);
    console.log("scraping scrapbook scraps from scrapbook to scrapbook people's scraps...");
    console.log(`https://scrapbook.hackclub.com/api/r/${tag}`);
    const response = await fetch(`https://scrapbook.hackclub.com/api/r/${tag}`);
    console.log("scraped successfully; updating website...");
    const posts = await response.json();
    const postsContainer = document.getElementById('container');
    console.log(posts);
    posts.forEach(post => {
      const postElement = document.createElement("div");
      postElement.className = 'row';

      postElement.innerHTML = `
        <div class="blank col-lg-3 col-sm-0"></div>
        <div class="post col-lg-6 col-sm-12">
          <div class="user-info">
            <img class="avatar col-sm-2" src="${post.user.avatar}" alt="${post.user.username}'s avatar">
            <div class="name col-sm-6">
              <div class="displayname"><a href="/users/${post.user.username}/">${post.user.username}</a></div>
              <div class="smaller-text">${post.user.username}</div>
            </div>
            <div class="streak col-sm-4" style="font-size: 150%; text-align: right; vertical-align: middle;">${post.user.streakCount}</div>
          </div>
          ${post.attachments.length > 0 ? `<img class="thumbnail" src="${post.attachments[0]}" onerror="this.style.display='none'" />` : ''}
          <p class="content">${convertToAnchorTag(post.text)}</p>
          <div class="row tags">
            ${post.reactions.map(reaction => `
              <div class="col-2 tag">
                <img class="tag-img" src="${reaction.url}"  onerror="this.style.display='none'"  />
                <div class="smaller-text">#${reaction.name}</div>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="blank col-lg-3 col-sm-0"></div>
      `;
      postsContainer.appendChild(postElement);
    });
    console.log("scraps are now visible on site, close the console nerd");
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}
addPosts(tag);
last_theme();