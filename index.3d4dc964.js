const e={gallery:document.querySelector(".gallery"),load:document.querySelector(".load-more")};e.load.addEventListener("click",(function(){t+=1,o(t).then((o=>{e.gallery.insertAdjacentHTML("beforeend",a(o.hits)),n=Math.ceil(o.totalHits/100),t===n&&e.load.setAttribute("hidden",!0)})).catch((e=>console.log(e)))}));let t=1;let n=0;function o(e=1){return fetch(`https://pixabay.com/api/?key=31885081-e3ce08364707c8044635d8ba7&q=cat&page=${e}&per_page=100&image_type=photo&orientation=horizontal&safesearch=true`).then((e=>{if(!e.ok)throw new Error;return e.json("")}))}function a(e){return e.map((({webformatURL:e,tags:t,likes:n,views:o,comments:a,downloads:r})=>`\n    <div class="photo-card">\n<img src="${e}" alt="${t}" loading="lazy"/>\n<div class="info">\n<p><b>Likes: </b>${n}</p>\n<p><b>Views: </b>${o}</p>\n<p><b>Comments: </b>${a}</p>\n <p><b>Downloads: </b>${r}</p>\n  </div>\n    </div>`)).join("")}o().then((t=>{e.gallery.insertAdjacentHTML("beforeend",a(t.hits))})).catch((e=>console.log(e)));
//# sourceMappingURL=index.3d4dc964.js.map
