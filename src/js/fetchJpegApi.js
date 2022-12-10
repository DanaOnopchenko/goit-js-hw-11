import axios from 'axios';


const API_KEY = '31885081-e3ce08364707c8044635d8ba7'
    const BASE_URL = 'https://pixabay.com/api/'
export const fetchJpegApi = async (searchQuery, page = "1") => {

  const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${searchQuery}&orientation=horizontal&safesearch=true&image_type=photo&per_page=40&page=${page}`)
  return response.data
};






// function photosApi(searchQuery) { 

//     const filters = `per_page=40&image_type=photo&orientation=horizontal&safesearch=true`
//      return fetch(`${BASE_URL}?key=${API_KEY}&q=${searchQuery}&page=${page}&${filters}`).then(resp => { 
//         if (!resp.ok){ 
//             throw new Error()
//         }
//         return resp.json('')
//     })