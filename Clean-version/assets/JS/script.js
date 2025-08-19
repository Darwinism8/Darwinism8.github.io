// Note: For a real project, you would split this into separate CSS and JS files
// to keep your code organized. For example:
// <link rel="stylesheet" href="styles.css">
// <script src="app.js"></script>

// 1. DATA-DRIVEN PRODUCT LIST
const products = [
  {
    category: "Floor Cleaner",
    items: [
      "Floor Cleaner - White Flower Scent",
      "Floor Cleaner - Sahara Scent",
      "Floor Cleaner - Anti-Bacterial",
      "Floor Cleaner - Ocean Scent",
      "Floor Cleaner - Rose Scent",
      "Floor Cleaner - Ceramic Special",
      "Floor Cleaner - Marble & Granite Special",
      "Floor Cleaner - Flower Garden Scent",
    ],
  },
  {
    category: "Sanibon",
    items: [
      "Sanibon - Ocean Scent",
      "Sanibon - Lavender Scent",
      "Sanibon - Rose Scent",
      "Sanibon - Pine Scent",
      "Sanibon - Black",
    ],
  },
  {
    category: "Soda",
    items: [
      "Blue Soda",
      "Lavender Soda",
      "Rose Soda",
      "Bleach Soda",
    ],
  },
  {
    category: "Dishwashing Liquid",
    items: [
      "Dishwashing Liquid 650 ml Promo",
      "Dishwashing Liquid 650 ml Yellow Lemon",
      "Dishwashing Liquid 650 ml Green Lemon",
      "Dishwashing Liquid 3L Yellow Lemon",
      "Dishwashing Liquid 3L Green Lemon",
    ],
  },
  {
    category: "Bleach",
    items: [
      "Bleach 920 ML",
      "Bleach 2L",
      "Bleach 4L",
    ],
  },
  {
    category: "Bleach Gel",
    items: [
      "Bleach Gel 920 ML Promo",
      "Bleach Gel 2L",
      "Bleach Gel 4L",
    ],
  },
  {
    category: "Laundry Gel",
    items: [
      "Laundry Gel Promo",
      "Laundry Gel - Marseille Soap 1L",
      "Laundry Gel - Marseille Soap 2.5L",
      "Laundry Gel - FORCE 1L",
    ],
  },
  {
    category: "Window & Multi-Surface Cleaner",
    items: [
      "Multi-Surface Cleaner",
      "Window Cleaner",
    ],
  },
  {
    category: "Liquid Soap",
    items: [
      "Liquid Soap Anti-Bacterial 600 ML",
      "Liquid Soap - Marseille Soap 600 ML",
    ],
  },
];

// 2. DOM ELEMENTS & EVENT LISTENERS
document.addEventListener("DOMContentLoaded", () => {
  const productListDiv = document.getElementById("product-list");
  const searchBar = document.getElementById("search-bar");
  const btnFillDemo = document.getElementById("btnFillDemo");
  const btnReset = document.getElementById("btnReset");
  const btnSave = document.getElementById("btnSave");
  const generalInfoInputs = document.querySelectorAll('#shopName, #phone, #location, #orderDate');
  
  let isSaving = false;

  // Function to render the product list from the data array
  function renderProducts() {
    productListDiv.innerHTML = "";
    products.forEach(cat => {
      const catTitle = document.createElement("h3");
      catTitle.className = "section-title";
      catTitle.textContent = cat.category;
      productListDiv.appendChild(catTitle);

      cat.items.forEach(item => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.dataset.name = item;
        
        const span = document.createElement("span");
        span.textContent = item;

        const quantity = document.createElement("input");
        quantity.type = "number";
        quantity.min = "0";
        quantity.placeholder = "Quantity";
        quantity.id = `qty-${item.replace(/[^a-zA-Z0-9]/g, '-')}`;

        productDiv.appendChild(checkbox);
        productDiv.appendChild(span);
        productDiv.appendChild(quantity);
        productListDiv.appendChild(productDiv);
      });
    });
    
    // Add event listeners to dynamically created inputs
    const allProductInputs = productListDiv.querySelectorAll('input[type="checkbox"], input[type="number"]');
    allProductInputs.forEach(input => {
      if (input.type === 'number') {
        input.addEventListener('input', (e) => {
          if (e.target.value.trim() !== '') {
            const checkbox = e.target.closest('.product').querySelector('input[type="checkbox"]');
            checkbox.checked = true;
          }
          saveToLocalStorage();
        });
      }
      if (input.type === 'checkbox') {
        input.addEventListener('change', saveToLocalStorage);
      }
    });
  }

  // 3. LOCAL STORAGE FUNCTIONS
  function saveToLocalStorage() {
    const formData = {
      shopName: document.getElementById("shopName").value,
      phone: document.getElementById("phone").value,
      location: document.getElementById("location").value,
      orderDate: document.getElementById("orderDate").value,
      products: {},
    };
    document.querySelectorAll('.product input[type="checkbox"]').forEach(cb => {
      if (cb.checked) {
        const qtyInput = cb.closest('.product').querySelector('input[type="number"]');
        const qty = qtyInput.value;
        if (qty) {
          formData.products[cb.dataset.name] = Number(qty);
        }
      }
    });
    localStorage.setItem("orderForm", JSON.stringify(formData));
  }

  function loadFromLocalStorage() {
    const savedData = localStorage.getItem("orderForm");
    if (savedData) {
      const data = JSON.parse(savedData);
      document.getElementById("shopName").value = data.shopName || '';
      document.getElementById("phone").value = data.phone || '';
      document.getElementById("location").value = data.location || '';
      document.getElementById("orderDate").value = data.orderDate || '';

      if (data.products) {
        for (const name in data.products) {
          const productElement = productListDiv.querySelector(`input[data-name="${name}"]`);
          if (productElement) {
            productElement.checked = true;
            const qtyInput = productElement.closest('.product').querySelector('input[type="number"]');
            if (qtyInput) {
              qtyInput.value = data.products[name];
            }
          }
        }
      }
    }
  }

  // 4. SEARCH & FILTER
  searchBar.addEventListener('input', () => {
    const query = searchBar.value.toLowerCase();
    document.querySelectorAll('.product').forEach(productDiv => {
      const productName = productDiv.querySelector('span').textContent.toLowerCase();
      if (productName.includes(query)) {
        productDiv.style.display = 'grid';
      } else {
        productDiv.style.display = 'none';
      }
    });
  });

  // 5. BUTTON ACTIONS
  btnFillDemo.addEventListener('click', () => {
    document.getElementById('shopName').value = 'Sunrise Market';
    document.getElementById('phone').value = '+1 234 567 890';
    document.getElementById('location').value = 'North Side, across from the park';

    document.querySelectorAll('.product input').forEach(input => {
      if (input.type === 'checkbox') input.checked = false;
      if (input.type === 'number') input.value = '';
    });

    const demoProducts = {
      "Floor Cleaner - Ocean Scent": 12,
      "Dishwashing Liquid 650 ml Promo": 11,
      "Bleach 2L": 20
    };

    for (const name in demoProducts) {
      const productElement = productListDiv.querySelector(`input[data-name="${name}"]`);
      if (productElement) {
        productElement.checked = true;
        const qtyInput = productElement.closest('.product').querySelector('input[type="number"]');
        if (qtyInput) {
          qtyInput.value = demoProducts[name];
        }
      }
    }
    saveToLocalStorage();
  });

  btnReset.addEventListener('click', () => {
    generalInfoInputs.forEach(input => input.value = '');
    document.getElementById('orderDate').value = new Date().toISOString().slice(0, 10);
    document.querySelectorAll('.product input').forEach(input => {
      if (input.type === 'checkbox') input.checked = false;
      if (input.type === 'number') input.value = '';
    });
    localStorage.removeItem("orderForm");
  });

  btnSave.addEventListener('click', async () => {
    if (isSaving) return;
    isSaving = true;
    btnSave.textContent = 'Generating PDF...';
    btnSave.disabled = true;

    const shopName = document.getElementById('shopName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const location = document.getElementById('location').value.trim();
    const orderDate = document.getElementById('orderDate').value.trim();
    const summary = document.getElementById('summary');

    const selected = [];
    document.querySelectorAll('.product').forEach(p => {
      const cb = p.querySelector('input[type="checkbox"]');
      const qty = p.querySelector('input[type="number"]').value.trim();
      if (cb.checked && qty && Number(qty) > 0) {
        selected.push({ name: cb.dataset.name, qty: Number(qty) });
      }
    });

    if (selected.length === 0) {
      summary.innerHTML = '<strong>No products have been selected.</strong>';
    } else {
      const rows = selected.map(item => `<tr><td>${item.name}</td><td style="width:120px;text-align:center">${item.qty}</td></tr>`).join('');
      summary.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;">
          <div>
            <h2>New Order</h2>
            <small>${orderDate}</small>
          </div>
          <div style="text-align:right">
            <div><strong>Shop Name:</strong> ${shopName || '-'}</div>
            <div><strong>Phone:</strong> ${phone || '-'}</div>
            ${location ? `<div><strong>Location:</strong> ${location}</div>` : ''}
          </div>
        </div>
        <table>
          <thead>
            <tr><th>Product</th><th>Quantity</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      `;
    }

    summary.style.display = 'block';
    await new Promise(r => setTimeout(r));

    const canvas = await html2canvas(summary, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new window.jspdf.jsPDF('p', 'mm', 'a4');

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    const imgWidth = pageWidth - margin * 2;
    const imgHeight = canvas.height * imgWidth / canvas.width;

    let heightLeft = imgHeight;
    let position = margin;

    pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
    heightLeft -= (pageHeight - margin * 2);

    while (heightLeft > 0) {
      pdf.addPage();
      position = margin - (imgHeight - heightLeft);
      pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
      heightLeft -= (pageHeight - margin * 2);
    }

    const filename = (shopName ? shopName.replace(/\s+/g, '_') : 'Order') + '.pdf';
    pdf.save(filename);

    summary.style.display = 'none';
    isSaving = false;
    btnSave.textContent = 'Save Order as PDF';
    btnSave.disabled = false;
  });
  
  // Initial page load setup
  renderProducts();
  loadFromLocalStorage();
  document.getElementById('orderDate').value = new Date().toISOString().slice(0, 10);
  generalInfoInputs.forEach(input => input.addEventListener('input', saveToLocalStorage));
});
