const API_URL = 'http://localhost:3000';

// Register User
async function register() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await axios.post(`${API_URL}/api/register`, {
      name,
      email,
      password
    });
    alert(response.data.message);
  } catch (error) {
    alert(error.response.error);
  }
}

// Login User
async function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const response = await axios.post(`${API_URL}/api/login`, {
      email,
      password
    });
    alert('Login successful');
    localStorage.setItem('accessToken', response.data.token);
    fetchProducts();
  } catch (error) {
    alert(error.response.data.error);
  }
}

// Fetch Products
async function fetchProducts() {
  try {
    const response = await axios.get(`${API_URL}/api/allProducts`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    const products = response.data;
    const productList = document.getElementById('products');
    productList.innerHTML = '';
    products.forEach(product => {
      const productItem = document.createElement('li');
      productItem.className = 'list-group-item';
      productItem.textContent = `${product.name} - $${product.price}`;
      productList.appendChild(productItem);
    });
  } catch (error) {
    alert('Failed to fetch products');
  }
}
