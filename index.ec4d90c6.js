!function(){var n={gallery:document.querySelector(".gallery"),load:document.querySelector(".load-more")};n.load.addEventListener("click",(function(){o(t+=1).then((function(o){n.gallery.insertAdjacentHTML("beforeend",c(o.hits)),e=Math.ceil(o.totalHits/100),t===e&&n.load.setAttribute("hidden",!0)})).catch((function(n){return console.log(n)}))}));var t=1,e=0;function o(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t="31885081-e3ce08364707c8044635d8ba7",e="https://pixabay.com/api/",o="per_page=100&image_type=photo&orientation=horizontal&safesearch=true";return fetch("".concat(e,"?key=").concat(t,"&q=cat&page=").concat(n,"&").concat(o)).then((function(n){if(!n.ok)throw new Error;return n.json("")}))}function c(n){return n.map((function(n){var t=n.webformatURL,e=n.tags,o=n.likes,c=n.views,a=n.comments,r=n.downloads;return'\n    <div class="photo-card">\n<img src="'.concat(t,'" alt="').concat(e,'" loading="lazy"/>\n<div class="info">\n<p><b>Likes: </b>').concat(o,"</p>\n<p><b>Views: </b>").concat(c,"</p>\n<p><b>Comments: </b>").concat(a,"</p>\n <p><b>Downloads: </b>").concat(r,"</p>\n  </div>\n    </div>")})).join("")}o().then((function(t){n.gallery.insertAdjacentHTML("beforeend",c(t.hits))})).catch((function(n){return console.log(n)}))}();
//# sourceMappingURL=index.ec4d90c6.js.map