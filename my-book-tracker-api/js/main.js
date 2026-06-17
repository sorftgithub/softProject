// // //Example fetch using book-tracker api
// document.querySelector('button').addEventListener('click', getFetch)

// document.querySelector('h2').innerText = localStorage.getItem('books')

// function getFetch(){
//   const choice = document.querySelector('input').value.trim()
//   const url = `https://openlibrary.org/isbn/${choice}.json`

//   if(!choice){
//           alert('Input an ISBN')
//           return;
//         }

//   fetch(url)
//       .then(res => res.json()) // parse response as JSON
//       .then(data => {
//         console.log(data.title)
//         if(!data.title){
//           alert('Book title not found for this ISBN')
//           return;
//         }
//         if(!localStorage.getItem('books')){
//           localStorage.setItem('books', data.title)
//         }else {
//           let books = localStorage.getItem('books') + " ; " + data.title
//           localStorage.setItem('books', books)
//         }
//         document.querySelector('h2').innerText = localStorage.getItem('books')
//       })
//       .catch(err => {
//           console.log(`error ${err}`)
//       });
// }

// 0385472579, 9780141901251

/*---------------------Trying The code again and turning each title into a list----------------- */ 


document.querySelector('button').addEventListener('click', getFetch)

// Run this immediately when the page loads to display any previously saved books
renderBooks()

function getFetch(){
  const choice = document.querySelector('input').value.trim()
  const url = `https://openlibrary.org/isbn/${choice}.json`

  if (!choice) {
    alert('Please input an ISBN!')
    return 
  }

  fetch(url)
      .then(res => res.json()) 
      .then(data => {
        console.log(data.title)
        
        if (!data.title) {
          alert('Book title not found for this ISBN.')
          return
        }

        // 1. Get the current list of books from localStorage, or start a new empty array []
        let currentBooks = JSON.parse(localStorage.getItem('books')) || []
        
        // 2. Add the new book title to our array
        currentBooks.push(data.title)
        
        // 3. Save the updated array back to localStorage as a string
        localStorage.setItem('books', JSON.stringify(currentBooks))
        
        // 4. Update the DOM list
        renderBooks()

        // let currentBooks = JSON.parse(localStorage.getItem('books')) || []
        // currentBooks.push(data.title)
        // localStorage.setItem('books', JSON.stringify(currentBooks))
        // renderBooks()
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

// Helper function to clear the <ul> and rebuild the <li> tags from localStorage
function renderBooks() {
    const bookListUl = document.getElementById('book-list')
    if (!bookListUl) return // Safety check in case the element isn't in HTML yet
    
    // Clear the current list so we don't duplicate items
    bookListUl.innerHTML = ""
    
    // Grab books array from local storage
    const currentBooks = JSON.parse(localStorage.getItem('books')) || []
    
    // Loop through each book title and create an <li> for it
    currentBooks.forEach(bookTitle => {
        const li = document.createElement('li')
        li.textContent = bookTitle
        bookListUl.appendChild(li)
    })
}