
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import './css/styles.css';
import { fetchJpegApi } from './js/fetchJpegApi';
import { Notify } from 'notiflix/build/notiflix-notify-aio';



const refs = {
    form: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    load: document.querySelector('.load-more'),
    quard: document.querySelector('.js-guard'),
   }

// console.dir(refs.form)
// refs.load.addEventListener('click', onLoadMore)

refs.form.addEventListener("submit", onFormSubmit);
// let searchQuery = '';

const simpleligthbox = new SimpleLightbox('.gallery a');

let options = {
  root: null,
  rootMargin: '200px',
  threshold: 1.0,
};

let page = 1;
let totalImage = 0;
let searchQuery = '';


const observer = new IntersectionObserver(onLoad, options);

function onFormSubmit(evt) { 
    evt.preventDefault();
    searchQuery = evt.currentTarget.elements.searchQuery.value.trim();
    clearMarkupgallery()
    page = 1;
    totalImage = 0;
    // console.log(searchQuery)
    if (!searchQuery) { 
         clearMarkupgallery();
        Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
        return;
        
    };
     
    fetchJpegApi(searchQuery,page)
        .then(data => { 
            console.log(data)
            if (!data.totalHits) {
                console.log(data.totalHits)
                clearMarkupgallery();
                   Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
                return
            }
            totalImage += data.hits.length;
             Notify.info(`Hooray! We found ${totalImage} images.`)
            refs.gallery.insertAdjacentHTML('beforeend', creatMarkup(data.hits))
            observer.observe(refs.quard);
            simpleligthbox.refresh();
        }
           
        ).catch(err => console.log(err))
}








// function onFormSubmit(evt) { 
//    evt.preventDefault();
//     searchQuery = evt.currentTarget.elements.searchQuery.value.trim();
//     console.log('searchQuery', searchQuery);
//     if (!searchQuery) { 
//         alert('Sorry, there are no images matching your search query. Please try again.')
//         return
//     }
//     // photosApi(searchQuery)
// }





// photosApi().then(data => { 
//     refs.gallery.insertAdjacentHTML('beforeend', creatMarkup(data.hits))
//     observer.observe(refs.quard)
// }).catch(err=>console.log(err))


function creatMarkup(arr) { 
    return arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads
    }) => `<div class="photo-card">
         <div class="photo-thumb">
        <a class="gallery__item"  href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
        </a>
      </div>
      <div class="info">
        <p class="info-item"><b>Likes: </b>${likes}</p>
        <p class="info-item"><b>Views: </b>${views}</p>
        <p class="info-item"><b>Comments: </b>${comments}</p>
        <p class="info-item"><b>Downloads: </b>${downloads}</p>
      </div>
    </div>
    `).join('')
}

function onLoad(entries, observer) { 
    entries.forEach(entry => {
        if (entry.isIntersecting) { 
            console.log('I see you');
            page += 1;
            // let searchQuery = evt.currentTarget.elements.searchQuery.value.trim();
            fetchJpegApi(searchQuery, page).then(data => { 
                totalImage += data.hits.length;
              Notify.info(`Hooray! We found ${totalImage} images.`)
                refs.gallery.insertAdjacentHTML('beforeend', creatMarkup(data.hits));
                  
                if (totalImage >= data.totalHits) { 
                    observer.unobserve(refs.quard)
                    Notify.info(`We're sorry, but you've reached the end of search results.`);
                }  
            }).catch(err => console.log(err))
        }
    });
    console.log(entries)
}

function clearMarkupgallery() { 
    refs.gallery.innerHTML=''
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