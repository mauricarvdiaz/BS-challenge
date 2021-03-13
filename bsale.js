const url = 'http://localhost:3900/api/';
let products = [];
let products_length;
let pageNumber = 1;
let pageSize = 12;

if ('loading' in HTMLImageElement.prototype) {
        console.log('Browser support `loading`...');
    } else { 
        console.log('Not supported');
}

//Selectores
const searchButton = document.querySelector('.btn-search');
searchButton.addEventListener('click', search);

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
    fetch(url+'productos')
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
//Se llama a la funcion cuando se inicia la app.
getProducts();


function search(event){
    event.preventDefault();
    console.log('buscando...')
    const productToSearch = document.querySelector('.input-search').value;
    console.log(productToSearch)
    if(productToSearch === ''){
        getProducts();
    }
    else{
        fetch(url+`search/${productToSearch}`)
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

}



function paginate(array, page_size, page_number){
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}

function numberPage(page) {
    pageNumber = page;
    showProducts();
}

function nextPage() {
    console.log('next');
    pageNumber++;
    showProducts();
}
function previusPage() {
    console.log('previus');
    pageNumber--;
    showProducts();
}

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

function showProducts() {
    const productContainer = document.querySelector('.product-container');
    const pagination = paginate(products, pageSize, pageNumber);
    pageCont = Math.ceil(products_length/pageSize);
    

    productContainer.innerHTML = "";
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
}



