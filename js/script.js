// init Isotope
var $grid = $('.collection-list').isotope({
  // options
});
// filter items on button click
$('.filter-button-group').on( 'click', 'button', function() {
  var filterValue = $(this).attr('data-filter');
  resetFilterBtns();
  $(this).addClass('active-filter-btn');
  $grid.isotope({ filter: filterValue });
});


var filterBtns = $('.filter-button-group').find('button');
function resetFilterBtns(){
  filterBtns.each(function(){
    $(this).removeClass('active-filter-btn');
  });
}

function addToCart(productName, productPrice, productImage) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingItem = cart.find(item => item.name === productName);

  if (existingItem) {
      existingItem.quantity += 1;
      existingItem.total = existingItem.price * existingItem.quantity;
  } else {
      const newItem = {
          name: productName,
          price: productPrice,
          image: productImage,
          quantity: 1,
          total: productPrice
      };
      cart.push(newItem);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${productName} has been added to your cart!`);

  updateCartBadge();
}
function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  console.log('Cart contents:', cart); // Log the cart contents for debugging
  const totalItems = cart.reduce((total, item) => total + (Number(item.quantity) || 0), 0); // Ensure quantity is treated as a number
  const badge = document.querySelector('#cartButton .badge');

  if (badge) {
      badge.textContent = totalItems; // Update the badge text
  } else {
      console.error('Badge element not found');
  }
}

window.onload = function () {
  updateCartBadge(); // Update badge count on page load
};

document.getElementById('cartButton').addEventListener('click', function () {
  window.location.href = 'ShoppingCart.html'; // Redirect to ShoppingCart page
});