import './css/styles.css';

const BASE_URL = 'https://pixabay.com/api/'
const filters = `per_page=40&image_type=photo&orientation=horizontal&safesearch=true`

const refs = {
    gallery: document.querySelector('.gallery')
}
console.log(refs.gallery)

function photosApi(name, page=1) { 
    const API_KEY = '31885081-e3ce08364707c8044635d8ba7'
    
        return fetch(`${BASE_URL}?key=${API_KEY}&q=${name}&page=${page}&${filters}`
    ).then(resp => { 
        if (!resp.ok) { 
            throw new Error()
        }
        return resp.json()
    })
}
photosApi("cat").then(photo => { 
    refs.gallery.insertAdjacentHTML('beforeend', creatMarkup(photo))
})

function creatMarkup(arr) { 
return arr.map(({webformatURL,
        largeImageURL,
        tags,likes,views,comments,downloads,
}) => 
      `<div class="photo-card">
     
      <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
    
      <div class="info">
        <p class="info-item"><b>Likes: </b>${likes}</p>
        <p class="info-item"><b>Views: </b>${views}</p>
        <p class="info-item"><b>Comments: </b>${comments}</p>
        <p class="info-item"><b>Downloads: </b>${downloads}</p>
      </div>
    </div>`
    )
    .join('');
    
}