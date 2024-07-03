alert('hi');
//Just to show you that javascript is working

document.addEventListener("DOMContentLoaded", function() {
  const menuItems = document.querySelectorAll('.menu-list-item');
  const movieItems = document.querySelectorAll('.navBar-tag');

  menuItems.forEach(item => {
      item.addEventListener('click', function() {
         
          menuItems.forEach(item => {
              item.classList.remove('active');
          });

          
          this.classList.add('active');

          
          const filterValue = this.getAttribute('data-filter');

         
          movieItems.forEach(movie => {
              const tags = movie.getAttribute('data-tags').toLowerCase().split(' ');
              if (filterValue === 'all' || tags.includes(filterValue.toLowerCase())) {
                  movie.style.display = 'block';
              } else {
                  movie.style.display = 'none';
              }
          });
      });
  });
});








//prompt when profile photo is clicked to ask users their name and birthday
document.addEventListener('DOMContentLoaded', function() {
  const profileContainer = document.querySelector('.profile-container');

  
  profileContainer.addEventListener('click', function() {
   
    const name = prompt('Please enter your name:');
    const birthday = prompt('Please enter your birthday (MM/DD/YYYY):');

   
    if (name && birthday) {
      alert(`Hello ${name}! Your birthday is ${birthday}.`);
    } else {
      alert('Invalid input or canceled.');
    }
  });
});






// JavaScript to display  addMovieForm
document.addEventListener('DOMContentLoaded', function() {
  const addMovieButton = document.getElementById('addMovieButton');
  const addMovieForm = document.getElementById('addMovieForm');

  addMovieButton.addEventListener('click', function() {
    addMovieForm.classList.toggle('show-form');
  });

  // Closure of form if user clicks outside of it
  document.addEventListener('click', function(event) {
    if (!addMovieForm.contains(event.target) && event.target !== addMovieButton) {
      addMovieForm.classList.remove('show-form');
    }
  });
});




let ascendingOrder = true; er

document.getElementById('sortToggle').addEventListener('click', function() {
  if (ascendingOrder) {
    sortMoviesAscending(); 
    document.getElementById('sortToggle').textContent = 'Sort Descending';
  } else {
    sortMoviesDescending(); 
    document.getElementById('sortToggle').textContent = 'Sort Ascending';
  }
  ascendingOrder = !ascendingOrder; 
});

// Function  for sorting 
function sortMoviesAscending() {
  //ascending order here
}

function sortMoviesDescending() {
  //for descending order here
}


// Get the movie list container
const movieList = document.getElementById('movieList');

// Function to sort movies by title in ascending order
function sortMoviesAscending() {
  const movies = Array.from(movieList.querySelectorAll('.movie-list-item'));

  movies.sort((a, b) => {
    const titleA = a.querySelector('.movie-title').innerText.toUpperCase();
    const titleB = b.querySelector('.movie-title').innerText.toUpperCase();
    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB) {
      return 1;
    }
    return 0;
  });

  // Clear the current list and append sorted movies
  movieList.innerHTML = '';
  movies.forEach(movie => {
    movieList.appendChild(movie);
  });
}

// How to sort movies by title in descending order
function sortMoviesDescending() {
  const movies = Array.from(movieList.querySelectorAll('.movie-list-item'));

  movies.sort((a, b) => {
    const titleA = a.querySelector('.movie-title').innerText.toUpperCase();
    const titleB = b.querySelector('.movie-title').innerText.toUpperCase();
    if (titleA > titleB) {
      return -1;
    }
    if (titleA < titleB) {
      return 1;
    }
    return 0;
  });

  // Clear displayed list and change sorted movies
  movieList.innerHTML = '';
  movies.forEach(movie => {
    movieList.appendChild(movie);
  });
}

// Event listeners attached to sorting buttons
document.getElementById('sortAscending').addEventListener('click', sortMoviesAscending);
document.getElementById('sortDescending').addEventListener('click', sortMoviesDescending);






// Fetch and render movies
async function fetchAndRenderMovies() {
  try {
    const response = await axios.get('/movies');
    const movies = response.data;
    
    movies.forEach(movie => {
      
    });
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}

// Add a new movie
async function addMovie(movieData) {
  try {
    const response = await axios.post('/movies', movieData);
    console.log(response.data); 

    fetchAndRenderMovies();
  } catch (error) {
    console.error('Error adding movie:', error);
  }
}

// Delete a movie
async function deleteMovie(movieId) {
  try {
    const response = await axios.delete(`/movies/${movieId}`);
    console.log(response.data); 

    fetchAndRenderMovies();
  } catch (error) {
    console.error('Error deleting movie:', error);
  }
}

axios.get('http://localhost:5000/api/movies')
  .then(response => {
    console.log(response.data); 
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });









//This code enables you use the search bar to search through movies even by just pressing enter after typing
function searchFunction() {
  
  let input, filter, ul, li, title, synopsis, i, txtValue;
  input = document.getElementById('searchInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("movieList");
  li = ul.getElementsByTagName('li');

  
  for (i = 0; i < li.length; i++) {
      title = li[i].getAttribute('data-title'); 
      synopsis = li[i].getElementsByClassName('movie-synopsis')[0];

      
      txtValue = title + synopsis.textContent || synopsis.innerText;

      if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = ""; 
      } else {
          li[i].style.display = "none"; 
      }
  }
}


//the code is below connects the search bar and the button so you can search , filter and display results onclick of search button
function searchOnClick() {
 
  let input, filter, ul, li, title, synopsis, i, txtValue;
  input = document.getElementById('searchInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("movieList");
  li = ul.getElementsByTagName('li');

  
  for (i = 0; i < li.length; i++) {
      title = li[i].getAttribute('data-title'); 
      synopsis = li[i].getElementsByClassName('movie-synopsis')[0]; 

      
      txtValue = title + synopsis.textContent || synopsis.innerText;

      if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = ""; 
      } else {
          li[i].style.display = "none"; 
      }
  }
}

//Below is code for filtering movies through NavBar menu items. I added data tags to each item in html for this.
document.addEventListener('DOMContentLoaded', function() {
  const menuItems = document.querySelectorAll('.menu-list-item');
  const movieItems = document.querySelectorAll('.navBar-tag');

  menuItems.forEach(item => {
    item.addEventListener('click', function() {
      const filter = item.getAttribute('data-filter');

      
      menuItems.forEach(menuItem => menuItem.classList.remove('active'));
      item.classList.add('active');

      
      movieItems.forEach(movieItem => {
        const tags = movieItem.getAttribute('data-tags').toLowerCase().split(' ');

        if (filter === 'all' || tags.includes(filter.toLowerCase())) {
          movieItem.style.display = 'block';
        } else {
          movieItem.style.display = 'none';
        }
      });
    });
  });
});



//for connecting with my back end
fetch('/movies') 
  .then(response => response.json())
  .then(data => {
    
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });



  const formData = {
    title: 'New Movie',
    synopsis: 'Synopsis of the new movie',
    imageUrl: 'image-url.jpg',
    genre: 'Action',
  };
  
  fetch('/addMovie', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to add movie');
    }
    return response.text();
  })
  .then(data => {
    console.log('Movie added successfully:', data);
   
  })
  .catch(error => {
    console.error('Error adding movie:', error);
    
  });
  












