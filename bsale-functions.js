const url = 'http://localhost:3900/api/';
let products = [];
let products_length = 0;
let pageNumber = 1;
let pageSize = 12;

if ('loading' in HTMLImageElement.prototype) {
        console.log('Browser support `loading`...');
    } else { 
        console.log('Not supported');
}

//Selectores
//const searchButton = document.querySelector('.btn-search');
//searchButton.addEventListener('click', search);

/**Funcion que controla el boton activo de las categorias */
function categoryActive(category) {
    const listCategories = document.querySelector('#categories');
    listCategories.childNodes.forEach(node => {
        if(node.firstChild){
            if(node.firstChild.classList.contains('active')){
                /**remover clase active */
                node.firstChild.classList = []
            }
            if(node.firstChild.innerHTML === 'Todo' && category === 'todo'){
                node.firstChild.classList.add('active');
            }
            else if(node.firstChild.innerHTML === 'Cervezas' && category === 'cerveza'){
                node.firstChild.classList.add('active');
            }
            else if(node.firstChild.innerHTML === 'Pisco' && category === 'pisco'){
                node.firstChild.classList.add('active');
            }
            else if(node.firstChild.innerHTML === 'Vodka' && category === 'vodka'){
                node.firstChild.classList.add('active');
            }
            else if(node.firstChild.innerHTML === 'Ron' && category === 'ron'){
                node.firstChild.classList.add('active');
            }
            else if(node.firstChild.innerHTML === 'Bebidas' && category === 'bebida'){
                node.firstChild.classList.add('active');
            }
            else if(node.firstChild.innerHTML === 'Energeticas' && category === 'bebida energetica'){
                node.firstChild.classList.add('active');
            }
            else if(node.firstChild.innerHTML === 'Snacks' && category === 'snack'){
                node.firstChild.classList.add('active');
            }
        }
    });
}

//Funcion que realiza una consulta a la api, obtiene los productos de una categoria.
function getProductosCategory(category) {
    categoryActive(category);
    starStopLoader(true);
    fetch(url + 'filterCategory/'+category)
        .then(response => response.json())
        .catch(error => {
            console.log('Un error ha ocurrido 1' + error.message);
        })
        .then(data => {
            products = data;
            products_length = data.length;
            pageNumber = 1;
            showProducts();
        })
        .catch(error => {
            console.log('Un error ha ocurrido 2' + error.message);
        });
}

//Funcion que realiza una consulta a la apiRest, obtiene todos los productos.
function getProducts() {
    categoryActive('todo')
    starStopLoader(true);
    fetch(url+'productos')
        .then(response => response.json())
        .catch(error => {
            //console.log('Un error ha ocurrido 1' + error.message);
            starStopLoader(false);
            showAlert(true, 'error');
        })
        .then(data => {
            if(data) {
                products = data;
                products_length = data.length;
            }
            pageNumber = 1;
            showProducts();
        })
        .catch(error => {
            console.log('Un error ha ocurrido 2' + error.message);
            showAlert(true, 'error');
        });
}

/**Funcion que consulta a la Api para realizar la busqueda de productos. */
function search(){
    showAlert(false, '');
    const productToSearch = document.querySelector('.input-search').value;
    console.log(productToSearch)
    if(productToSearch !== ''){
        starStopLoader(true);
        fetch(url+`search/${productToSearch}`)
        .then(response => response.json())
        .catch(error => {
            console.log('Un error ha ocurrido 1' + error.message);
            showAlert(true, 'error');
        })
        .then(data => {
            products = data;
            products_length = data.length;
            pageNumber = 1;
            showProducts();
        })
        .catch(error => {
            console.log('Un error ha ocurrido 2' + error.message);
            showAlert(true, 'error');
        });
    }
}

/**Funcion para crear una paginación de los productos */
function paginate(array, page_size, page_number){
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}

/**Funcion que cambia a una pagina seleccionada en la paginación.*/
function numberPage(page) {
    pageNumber = page;
    showProducts();
}

/**Funcion que avanza una pagina de la paginación de los productos. */
function nextPage() {
    console.log('next');
    pageNumber++;
    showProducts();
}

/**Funcion que retrocede una pagina de la paginación de los productos. */
function previusPage() {
    console.log('previus');
    pageNumber--;
    showProducts();
}

/**Funcion que agrega los botones de la paginación en la vista. Se crea a partir de la cantidad de paginas que tiene la paginación.*/
function createPagination(pageCont) {
    let paginationButtons = '';
    const pagination = document.querySelector('.pagination');
    paginationButtons += pageNumber > 1 ? `<button class="btn-pagination" onclick="previusPage()">
                                                <span class="material-icons">chevron_left</span>Anterior
                                            </button>` : '';
    
    for(let i = 0; i < pageCont; i++){
        if(pageNumber === i+1) paginationButtons += `<button onclick="numberPage(${i+1})" class="btn-pagination active-pag">${i+1}</button>`
        else paginationButtons += `<button onclick="numberPage(${i+1})" class="btn-pagination">${i+1}</button>`
    }

    paginationButtons += pageNumber < pageCont ?    `<button class="btn-pagination" onclick="nextPage()">Siguiente
                                                        <span s class="material-icons">chevron_right</span>
                                                    </button>` : '';
    pagination.innerHTML = '';
    pagination.innerHTML = paginationButtons;
}

/**Funcion que mustra los productos en la vista. Se crean los elementos necesarios que muestran el titulo, imagen, precio, etc. de los productos */
function showProducts() {
    showAlert(false, '')
    const productContainer = document.querySelector('.product-container');
    const pagination = paginate(products, pageSize, pageNumber);
    pageCont = Math.ceil(products_length/pageSize);
    
    productContainer.innerHTML = "";

    if(products_length === 0) {
        showAlert(true, 'empty');
    }

    pagination.forEach(product => {
        const card = document.createElement('div');

        if(product.discount > 0){
            const discount = document.createElement('div');
            discount.classList.add('discount');
            discount.innerHTML = product.discount + '%';
            card.appendChild(discount);
        }
        
        const image = document.createElement('img');
        const title = document.createElement('label');
        const price = document.createElement('label');
        const button = document.createElement('button');

        card.classList.add('card');
        image.classList.add('image');
        title.classList.add('card-title');
        price.classList.add('card-price');
        button.classList.add('btn-card');
        image.src = "https://gearsource.com/wp-content/uploads/2020/08/placeholder-768x768.jpg";
        image.loading = "lazy";
        image.alt = product.name;
        if(product.url_image){
            image.src = product.url_image;
        }
        
        title.innerHTML = product.name;
        price.innerHTML = '$' + product.price;
        button.innerHTML = 'Agregar al carro';
      
        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(button);
    
        productContainer.appendChild(card);
        createPagination(pageCont);
    })

    starStopLoader(false);
}

/**Funcion que ordena los productos de acuerdo a la opción seleccionada en el select. */
function ordenProducts() {
    const optionSelect = document.querySelector('#orden');
 
    /**Ordenar por nombre */
    if(optionSelect.selectedIndex === 0){
        products.sort((a, b) => {
            if(a.name > b.name) return 1;
            if(a.name < b.name) return -1;
            return 0;
        })
    }
    /**Precio de menor a mayor */
    else if(optionSelect.selectedIndex === 1){
        products.sort((a, b) => {
            if(a.price > b.price) return 1;
            if(a.price < b.price) return -1;
            return 0;
        })
    }
    /**Precio de mayor a menor */
    else if(optionSelect.selectedIndex === 2){
        products.sort((a, b) => {
            if(a.price < b.price) return 1;
            if(a.price > b.price) return -1;
            return 0;
        })
    }
    /**Mayor a menor descuento */
    else {
        products.sort((a, b) => {
            if(a.discount < b.discount) return 1;
            if(a.discount > b.discount) return -1;
            return 0;
        })
    }
    showProducts();
}

/**Funcion que activa o desactiva el loader */
function starStopLoader(val) {
    const loader = document.querySelector('.lds-dual-ring');
    /**Si val es true se activa el loader, si es false se oculta. */
    val ? loader.style.display = 'block' : loader.style.display = 'none';     
}

/**Funcion que activa o desactiva la alerta */
function showAlert(val, status) {
    const alert = document.querySelector('.alert');
    console.log(alert);
    val ? alert.style.display = 'block' : alert.style.display = 'none';
    if(status === 'empty')  alert.lastElementChild.innerHTML = innerHTML = 'Lo sentimos, no hay productos para mostrar.';
    else alert.lastElementChild.innerHTML = innerHTML = 'Ha ocurrido un error, vuelve a intentarlo más tarde.';
}


getProducts();