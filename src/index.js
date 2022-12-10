import './css/styles.css';



const refs = {
    form: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    load: document.querySelector('.load-more'),
    quard: document.querySelector('.js-guard')
}

console.log(refs.form)
// refs.load.addEventListener('click', onLoadMore)
refs.form.addEventListener('submit', onFormSubmit);


let page = 1;
const perPage = 100;
let totalPage = 0;

let options = {
  root: null,
  rootMargin: '150px',
  threshold: 1.0,
};

let searchQuery = '';

function onFormSubmit(evt) { 
   evt.preventDefault();
    searchQuery = evt.currentTarget.elements.searchQuery.value.trim();
    console.log('searchQuery', searchQuery)
}


const observer = new IntersectionObserver(onLoad, options);

function photosApi(searchQuery, page) { 
    const API_KEY = '31885081-e3ce08364707c8044635d8ba7'
    const BASE_URL = 'https://pixabay.com/api/'
    const filters = `per_page=${perPage}&image_type=photo&orientation=horizontal&safesearch=true`
     return fetch(`${BASE_URL}?key=${API_KEY}&q=${searchQuery}&page=${page}&${filters}`).then(resp => { 
        if (!resp.ok){ 
            throw new Error()
        }
        return resp.json('')
    })
}

photosApi().then(data => { 
    refs.gallery.insertAdjacentHTML('beforeend', creatMarkup(data.hits))
    observer.observe(refs.quard)
}).catch(err=>console.log(err))


function creatMarkup(arr) { 
    return arr.map(({ webformatURL, tags, likes, views, comments, downloads }) => `
    <div class="photo-card">
<img src="${webformatURL}" alt="${tags}" loading="lazy"/>
<div class="info">
<p><b>Likes: </b>${likes}</p>
<p><b>Views: </b>${views}</p>
<p><b>Comments: </b>${comments}</p>
 <p><b>Downloads: </b>${downloads}</p>
  </div>
    </div>`).join('')
}

function onLoad(entries, observer) { 
    entries.forEach(entry => {
        if (entry.isIntersecting) { 
            console.log('I see you');
            page += 1;
            photosApi(page).then(data => { 
                refs.gallery.insertAdjacentHTML('beforeend', creatMarkup(data.hits));
                totalPage = Math.ceil(data.totalHits/perPage);
                if (page === totalPage) { 
observer.unobserve(refs.quard)
                }  
            })
        }
    });
    console.log(entries)
}
// function photosApi(page=1) { 
//     const API_KEY = '31885081-e3ce08364707c8044635d8ba7'
//     const BASE_URL = 'https://pixabay.com/api/'
//     const filters = `per_page=100&image_type=photo&orientation=horizontal&safesearch=true`
//      return fetch(`${BASE_URL}?key=${API_KEY}&q=cat&page=${page}&${filters}`).then(resp => { 
//         if (!resp.ok){ 
//             throw new Error()
//         }
//         return resp.json('')
//     })
// }

// photosApi().then(data => { 
// refs.gallery.insertAdjacentHTML('beforeend',creatMarkup(data.hits))
// }).catch(err=>console.log(err))

// function creatMarkup(arr) { 
//     return arr.map(({ webformatURL, tags, likes, views, comments, downloads }) => `
//     <div class="photo-card">
// <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
// <div class="info">
// <p><b>Likes: </b>${likes}</p>
// <p><b>Views: </b>${views}</p>
// <p><b>Comments: </b>${comments}</p>
//  <p><b>Downloads: </b>${downloads}</p>
//   </div>
//     </div>`).join('')
// }

// function onLoadMore() { 
//     page += 1;
// photosApi(page).then(data => { 
//     refs.gallery.insertAdjacentHTML('beforeend', creatMarkup(data.hits));
//     totalPage = Math.ceil(data.totalHits/perPage);
//     if (page === totalPage) {
// refs.load.setAttribute('hidden',true)
//      }
// }).catch(err=>console.log(err))
// }