


// Fetch
fetch('https://striveschool-api.herokuapp.com/books')
    .then(response => response.json())
    .then(books => {
        // Inserisco i libri nel container
        const booksContainer = document.getElementById('books-container');



        // Ciclo foreach
        books.forEach(book => {
            // Creo la card
            const card = document.createElement('div');
            card.className = 'col-md-2 mb-2';

            // Creo img
            const img = document.createElement('img');
            img.className = 'card-img-top';
            img.src = book.img;
            img.alt = book.title;
            // Inserisco img nella card
            card.appendChild(img);

            // Creo il div per il card body
            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            // Creo titolo ed inserisco il testo
            const cardTitle = document.createElement('h5');
            cardTitle.className = 'card-title';
            cardTitle.textContent = book.title;
            // Lo inserisco nel card body
            cardBody.appendChild(cardTitle);

            // Creo il card text
            const cardText = document.createElement('p');
            cardText.className = 'card-text';
            cardText.textContent = book.category;

            //Creo bottone carrello
            const carrello = document.createElement("button");
            carrello.textContent = "Aggiungi al carrello";
            carrello.classList.add("btn", "btn-sm", "btn-outline-secondary");


            //Array vuoto per carrello
            const cartItems = [];
            carrello.addEventListener('click', () => {

                //Inserisco il libro in cartItems array vuoto
                cartItems.push(book);

                console.log('Aggiunto al carrello:', book.title);
                const cartItemsDiv = document.querySelector('#cart-container');
                cartItemsDiv.style.display = "flex";

                // Creo un nuovo elemento
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.style.backgroundColor = "aqua";
                cartItem.style.width = "200px";
                cartItem.style.display = "flex no-wrap";
                cartItem.style.margin = "3%";
                //Btn Elimina Carrello
                const elimina = document.createElement('button');
                elimina.innerText = "Svuota carrello";
                elimina.classList.add("btn", "btn-sm", "btn-outline-secondary");
                cartItemsDiv.appendChild(elimina);
                elimina.style.width = "10%";
                elimina.style.margin = "10%"
                //Svuota carrello
                elimina.onclick = event => hideElement(cartItem);

                // Aggiungo le info del libro
                cartItem.innerHTML = `
                  <img src="${book.img}" alt="${book.title}" class="cart-item-image img-fluid">
                  <ul class="cart-item-info">
                  <li>${book.title}</li>
                  <li>${book.price}</li>
                  <li>${book.category}</li>
                  <li>${book.asin}</li>
                  </ul>
                `;
                // Inserisco l'elemento nel div
                cartItemsDiv.appendChild(cartItem);


            });


            // Cambio colore ad aggiunta carrello

            carrello.addEventListener('click', () => {

                card.style.backgroundColor = "yellow";
            })

            //Salta
            const hideElement = (element) => {
                element.classList.add("d-none");
            }

            //Creo bottone salta
            let buttonHide = document.createElement("button");
            buttonHide.type = "button";
            buttonHide.innerText = "Nascondi";
            buttonHide.classList.add("btn", "btn-sm", "btn-outline-secondary");
            buttonHide.onclick = event => hideElement(card);



            // Lo inserisco nel card body
            cardBody.appendChild(cardText);

            // Inserisco il card body
            card.appendChild(cardBody);

            //inserisco il bottone carrello
            cardBody.appendChild(carrello)

            //Inserisco il bottone salta

            cardBody.appendChild(buttonHide)

            // Inserisco la card nel container
            booksContainer.appendChild(card);


        });
    })

    .catch(error => console.error(error));

//FILTER RICERCA//

// Creo 2 variabili per input e btn cerca
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('title-input');

// Aggiungo un avent listener al btn cerca
searchBtn.addEventListener('click', () => {
    // Creo una variabile dal campo input
    const searchQuery = searchInput.value.trim().toLowerCase();

    // Creo il container
    const booksContainer = document.getElementById('books-container');

    // Fetch 
    fetch('https://striveschool-api.herokuapp.com/books')
        .then(response => response.json())
        .then(books => {
            // Filter per i libri in base alla query
            const filteredBooks = books.filter(book => {
                return book.title.toLowerCase().includes(searchQuery);
            });

            // Cancello gli elementi dal container
            booksContainer.innerHTML = '';

            // Ciclo i libri filtrati e li aggiungo al container
            filteredBooks.forEach(book => {
                // Creo la card
                const card = createBookCard(book);

                // Aggiungo la card al container container
                booksContainer.appendChild(card);
            });
        })
        .catch(error => console.error(error));
});

// Creo la card
function createBookCard(book) {

    const card = document.createElement('div');
    card.className = 'col-md-2 mb-2';

    // Creo img nella card
    const img = document.createElement('img');
    img.className = 'card-img-top';
    img.src = book.img;
    img.alt = book.title;

    // Aggiungo img nella card
    card.appendChild(img);

    // Creo il card-body
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    // Creo il titolo
    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.textContent = book.title;

    // Aggiungo il titolo al card body
    cardBody.appendChild(cardTitle);

    // Creo il testo della card
    const cardText = document.createElement('p');
    cardText.className = 'card-text';
    cardText.textContent = book.category;

    // Aggiungo il testo al card-body
    cardBody.appendChild(cardText);

    // Creo il bottone aggiungi
    const addToCartBtn = document.createElement('button');
    addToCartBtn.className = 'btn btn-sm btn-outline-secondary';
    addToCartBtn.textContent = 'Add to Cart';

    // Event listener al btn aggiungi
    addToCartBtn.addEventListener('click', () => {
        console.log('Added to cart:', book.title);
    });

    // Aggiungo il bottone al card body
    cardBody.appendChild(addToCartBtn);

    // Aggiungo il card body alla card
    card.appendChild(cardBody);

    // "Ritorno" la card
    return card;
}

