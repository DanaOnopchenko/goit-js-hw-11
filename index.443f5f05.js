const e={form:document.querySelector("#search-form"),gallery:document.querySelector(".gallery"),load:document.querySelector(".load-more"),quard:document.querySelector(".js-guard")};console.log(e.form),e.form.addEventListener("submit",(function(e){e.preventDefault(),r=e.currentTarget.elements.searchQuery.value.trim(),console.log("searchQuery",r)}));let o=1;let n=0,r="";const t=new IntersectionObserver((function(r,t){r.forEach((r=>{r.isIntersecting&&(console.log("I see you"),o+=1,a(o).then((r=>{e.gallery.insertAdjacentHTML("beforeend",s(r.hits)),n=Math.ceil(r.totalHits/100),o===n&&t.unobserve(e.quard)})))})),console.log(r)}),{root:null,rootMargin:"150px",threshold:1});function a(e,o){return fetch(`https://pixabay.com/api/?key=31885081-e3ce08364707c8044635d8ba7&q=${e}&page=${o}&per_page=100&image_type=photo&orientation=horizontal&safesearch=true`).then((e=>{if(!e.ok)throw new Error;return e.json("")}))}function s(e){return e.map((({webformatURL:e,tags:o,likes:n,views:r,comments:t,downloads:a})=>`\n    <div class="photo-card">\n<img src="${e}" alt="${o}" loading="lazy"/>\n<div class="info">\n<p><b>Likes: </b>${n}</p>\n<p><b>Views: </b>${r}</p>\n<p><b>Comments: </b>${t}</p>\n <p><b>Downloads: </b>${a}</p>\n  </div>\n    </div>`)).join("")}a().then((o=>{e.gallery.insertAdjacentHTML("beforeend",s(o.hits)),t.observe(e.quard)})).catch((e=>console.log(e)));
//# sourceMappingURL=index.443f5f05.js.map