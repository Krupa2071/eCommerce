let cartCount = 0;
let cartBooks = [
    { 'id': 1, 'pic': '/static/img/b1.jpg', 'price': 19.99, 'quantity': 5, 'inCart': 0 },
    { 'id': 2, 'pic': '/static/img/b2.jpg', 'price': 24.99, 'quantity': 3, 'inCart': 0 },
    { 'id': 3, 'pic': '/static/img/b3.jpg', 'price': 14.99, 'quantity': 0, 'inCart': 0 },
    { 'id': 4, 'pic': '/static/img/b4.jpg', 'price': 29.99, 'quantity': 2, 'inCart': 0 },
]
let initialvalue = JSON.parse(localStorage.getItem('initialvalue')) || [0, 0, 0, 0];
let localBooks = JSON.parse(localStorage.getItem('localBooks')) || [0, 0, 0, 0];
let totalBooks = JSON.parse(localStorage.getItem('totalBooks')) || [0, 0, 0, 0];
function addToCart(bookId) {

    const bookElement = document.getElementById(`book-${bookId}`);
    let quantityElement = bookElement.querySelector('.quantity');
    const addButton = bookElement.querySelector('.add-to-cart');
    // Get the current book quantity from the HTML element
    let bookQuantity = parseInt(quantityElement.innerText);
    cartBooks[bookId - 1].inCart++;
    initialvalue[bookId - 1]++;
    localStorage.setItem('initialvalue', JSON.stringify(initialvalue));
    console.log("cartBooks[bookId - 1].inCart", cartBooks[bookId - 1].inCart);
    // Check if the book is in stock
    if (bookQuantity > 0) {
        cartCount += 1;
        document.getElementById('cartCount').innerText = cartCount;
        quantityElement.innerText = bookQuantity - 1;
        bookQuantity--;


        // Check if the count exceeds the original book quantity
        if (bookQuantity == 0) {
            addButton.removeAttribute('onclick');
            addButton.style.pointerEvents = 'none';
            addButton.style.opacity = '0.65';
            addButton.innerText = 'Out of Stock';

        }

        console.log(`Book ${bookId} added to the cart.`);
    } else {
        console.log(`Book ${bookId} is out of stock.`);
    }
}

function cartInput() {
    let storedInitialValue = JSON.parse(localStorage.getItem('initialvalue'));
    let cartTotalItems = document.getElementById("cartTotalItems");
    let totalPrice1 = document.getElementById("sub1");
    let sum = 0;
    let totalPrice = 0;
    let cartprice = document.querySelectorAll("#cartprice");

    console.log("test1", cartprice.length);
    if (storedInitialValue == null) {
        let test2 = document.getElementById("test2");
        test2.innerHTML = "No items in your Cart.";
        let bookCarts = document.querySelectorAll("#bookCard");
        for (var i = 0; i < cartprice.length; i++) {
            bookCarts[i].style.display = 'none';
            bookCarts[i].classList = [];
        }
        let summary = document.getElementById("summary");
        summary.style.display = 'none';
        cartTotalItems.innerHTML = "Items: 0";
        totalPrice1.innerHTML = "$ 0";
        let buynow = document.getElementById("buynow");
        let buyNowLink = document.getElementById("buyNowLink");
        buyNowLink.removeAttribute('href');
        buynow.removeAttribute('onclick');
        buynow.style.pointerEvents = 'none';
        buynow.style.opacity = '0.65';

    }
    // let bookImage = document.querySelectorAll("#bookImage");
    for (var i = 0; i < cartprice.length; i++) {
        console.log("cartprice", cartprice[i], storedInitialValue[i]);
        cartprice[i].textContent = storedInitialValue[i].toString();
        let bookCarts = document.querySelectorAll("#bookCard");
        // bookImage[i].src = cartBooks[i].pic;
        if (storedInitialValue[i] == 0) {
            bookCarts[i].style.display = 'none';
            bookCarts[i].classList = [];
        }
        console.log('hi', bookCarts);
        sum += Number(storedInitialValue[i]);
        totalPrice += Number(storedInitialValue[i]) * cartBooks[i].price;
    }
    console.log("image", cartBooks.pic);
    cartTotalItems.innerHTML = "Items: " + sum.toString();
    totalPrice1.innerHTML = "$ " + totalPrice.toFixed(2).toString();
}

function onloadHome() {
    let initialvalue = JSON.parse(localStorage.getItem('initialvalue'));
    let localBooks = JSON.parse(localStorage.getItem('localBooks'));
    let totalBooks = JSON.parse(localStorage.getItem('totalBooks'));
    let sum = localBooks.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    if (localStorage.getItem('initialvalue') == undefined) {
        sum = 0;
    }
    document.getElementById("cartCount").innerText = sum;
    var availBooks = document.querySelectorAll('.quantity');
    for (let j = 0; j < availBooks.length; j++) {
        let current = cartBooks[j].quantity - totalBooks[j];
        availBooks[j].innerText = JSON.stringify(current);
    }
    // console.log()
}

function buyNow() {
    console.log("OPPPPPPPPP");
    localStorage.setItem('localBooks', JSON.stringify(initialvalue));
    localStorage.removeItem('initialvalue');
    for (var i = 0; i < totalBooks.length; i++)
        totalBooks[i] += initialvalue[i];
    localStorage.setItem('totalBooks', JSON.stringify(totalBooks));

}