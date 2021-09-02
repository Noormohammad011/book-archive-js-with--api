/*
 * Title: Book App
 * Description: Assignment Six Play With Api
 * Author: Noormohammad
 * Date: 02/09/2021
 *
 */

// variable declaration
const searchElement = document.getElementById('searchElement')
const btnHandler = document.getElementById('btnHandler')
const resultFound = document.getElementById('resultFound')
const error = document.getElementById('error')
const displayContainer = document.getElementById('displayContainer')
const spinner = document.getElementById('spinner')

// globally declear
resultFound.innerText = 0

//Data Fetching From Api
const fetchData = async (value = 'javascript') => {
  try {
    const res = await fetch(`http://openlibrary.org/search.json?q=${value}`)
    const data = await res.json()

    if (data) {
      resultFound.innerText = Number(data.numFound)
    } else {
      resultFound.innerText = 0
    }
    displayBooks(data.docs)
  } catch (err) {
    console.log(err)
  }
}

//Click Event Handler
btnHandler.addEventListener('click', (e) => {
  e.preventDefault()
  console.log()
  const BookSearch = searchElement.value

  // Check for empty
  if (BookSearch.trim()) {
    //display spinner
    spinner.classList.remove('d-none')
    displayContainer.classList.add('d-none')
    fetchData(searchElement.value)
    searchElement.value = ''
  } else {
    alert('Please enter a search with book name')
  }
})

//Display Books
const displayBooks = (data) => {
  if (data.status === '404' || data.length === 0) {
    error.textContent = 'Result Not Found ✖'
    searchElement.value = ''
    setTimeout(function () {
      error.textContent = ''
      spinner.classList.add('d-none')
    }, 3000)
  } else {
    /*
     * Display
     * image
     * title
     * authors
     *publishers
     *first Publishing date
     */
    displayContainer.innerHTML = ''
    data.slice(0, 10).forEach((item) => {
      displayContainer.innerHTML += `
          <div class="col mb-3">
                <div class="card h-100">
                
                    <img src="https://covers.openlibrary.org/b/id/${
                      item.cover_i && item.cover_i
                    }-M.jpg" class="card-img-top img-fluid img_size" 
                     alt="${item.title ? item.title : ''}">
                    <div class="card-body">
                        <h5 class="card-title">
             
                        Book Name:${item.title ? item.title : ''}
                        </h5>
                        <br />
                        <h5 class="card-text">
                        Auther Name:
                        <h6>
             
                        ${authorName(item.author_name && item.author_name)},
                        </h6>
                        </h5>
                        <br />
                        <h5 class="card-text">
                        Publisher:
                        <h6>
            
                        ${publisherName(item.publisher && item.publisher)},
                        </h6>
                        </h5>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">
              
                        First Published:
                        ${
                          item.first_publish_year ? item.first_publish_year : ''
                        }
                        </small>
                    </div>
                </div>
            </div>
        `
    })

    spinner.classList.add('d-none')
    displayContainer.classList.remove('d-none')
  }
}
//author name
const authorName = (auhterArray) => {
  const authorName = []

  auhterArray.forEach((value) => {
    authorName.push(value)
  })

  return authorName
}

//publisher name
const publisherName = (auhterArray) => {
  const publisherName = []

  auhterArray.forEach((value) => {
    publisherName.push(value)
  })

  return publisherName
}
