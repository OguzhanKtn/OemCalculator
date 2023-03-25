// Storage Controller
const StorageController = (function () {})();

// Product Controller
const ProductController = (function () {
  const Product = function (id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  };

  const data = {
    products: [],
    selectedProduct: null,
    totalPrice: 0,
  };

  return {
    getProducts: function () {
      return data.products;
    },
    getData: function () {
      return data;
    },
    addProduct: function (name, price) {
      id = data.products.length + 1;

      const newProduct = new Product(id, name, parseFloat(price));
      data.products.push(newProduct);
      return newProduct;
    },
    getTotal: function () {
      let total = 0;

      data.products.forEach(function (item) {
        total += item.price;
      });
      data.totalPrice = total;
      return data.totalPrice;
    },
    getProductById: function (id) {
      let product = null;

      data.products.forEach((prd) => {
        if (prd.id == id) {
          product = prd;
        }
      });

      return product;
    },
    getCurrentProduct: function () {
      return data.selectedProduct;
    },
    setCurrentProduct: function (product) {
      data.selectedProduct = product;
    },
    updateProduct: function (prdName, prdPrice) {
      let product = null;

      data.products.forEach((prd) => {
        if (prd.id == data.selectedProduct.id) {
          prd.name = prdName;
          prd.price = parseFloat(prdPrice);
          product = prd;
        }
      });
      return product;
    },
    deleteProduct: function(prd){
        data.products.forEach((element,index) => {
            if(element.id == prd.id){
                data.products.splice(index,1);
            }
        });
    }
  };
})();

// UI Controller
const UIController = (function () {
  const Selectors = {
    productList: "#item-list",
    productListItems: "#item-list tr",
    productName: "#productName",
    productPrice: "#productPrice",
    productCard: "#productCard",
    totalTl: "#total-tl",
    totalDolar: "#total-dolar",
    addButton: ".addBtn",
    updateButton: ".updateBtn",
    deleteButton: ".deleteBtn",
    cancelButton: ".cancelBtn",
  };

  return {
    // createProductList : function(products){
    //     let html ="";

    //     products.forEach(prd => {
    //         html += `
    //             <tr>
    //                 <td>${prd.id}</td>
    //                 <td>${prd.name}</td>
    //                 <td>${prd.price} $</td>
    //                 <td class="text-right">
    //                     <i class="far fa-edit"></i>
    //                 </td>
    //             </tr>

    //         `;
    //     });

    //     document.querySelector(Selectors.productList).innerHTML = html;
    // },
    getSelectors: function () {
      return Selectors;
    },
    addProduct: function (prd) {
      document.querySelector(Selectors.productCard).style.display = "block";
      var item = `
                <tr>
                    <td>${prd.id}</td>
                    <td>${prd.name}</td>
                    <td>${prd.price} $</td>
                    <td class="text-right">
                        <i class="far fa-edit"></i>
                     </td>
                 </tr>
            
            `;
      document.querySelector(Selectors.productList).innerHTML += item;
    },
    deleteProduct: function(){
        let items = document.querySelectorAll(Selectors.productListItems);
        items.forEach((item)=>{
            if(item.classList.contains("bg-warning")){
                item.remove();
            }
        })
        UIController.clearInputs();
        UIController.showTotal(ProductController.getTotal());
    },
    updateProduct: function (prd) {
      let updatedItem = null;

      let items = document.querySelectorAll(Selectors.productListItems);

      items.forEach((item) => {
        if (item.classList.contains("bg-warning")) {
          item.children[1].textContent = prd.name;
          item.children[2].textContent = prd.price + " $";
          updatedItem = item;
        }
      });

      return updatedItem;
    },
    clearInputs: function () {
      document.querySelector(Selectors.productName).value = "";
      document.querySelector(Selectors.productPrice).value = "";
    },
    clearWarnings: function () {
      const items = document.querySelectorAll(Selectors.productListItems);
      items.forEach((item) => {
        if (item.classList.contains("bg-warning")) {
          item.classList.remove("bg-warning");
        }
      });
    },
    hideCard: function () {
      document.querySelector(Selectors.productCard).style.display = "none";
    },
    showTotal: function (total) {
      document.querySelector(Selectors.totalDolar).textContent = total;
      document.querySelector(Selectors.totalTl).textContent = total * 18;
    },
    addProductToForm: function () {
      const selectedProduct = ProductController.getCurrentProduct();
      document.querySelector(Selectors.productName).value =
        selectedProduct.name;
      document.querySelector(Selectors.productPrice).value =
        selectedProduct.price;
    },
    addingState: function () {
      UIController.clearWarnings();
      UIController.clearInputs();
      document.querySelector(Selectors.addButton).style.display = "inline";
      document.querySelector(Selectors.updateButton).style.display = "none";
      document.querySelector(Selectors.deleteButton).style.display = "none";
      document.querySelector(Selectors.cancelButton).style.display = "none";
    },
    editState: function (tr) {
      tr.classList.add("bg-warning");
      document.querySelector(Selectors.addButton).style.display = "none";
      document.querySelector(Selectors.updateButton).style.display = "inline";
      document.querySelector(Selectors.deleteButton).style.display = "inline";
      document.querySelector(Selectors.cancelButton).style.display = "inline";
    },
  };
})();

// App Controller
const App = (function (ProductCtrl, UICtrl) {
  const UISelectors = UICtrl.getSelectors();

  // load event listeners
  const loadEventListeners = function () {
    // add product event
    document
      .querySelector(UISelectors.addButton)
      .addEventListener("click", productAddSubmit);

    // edit product click
    document
      .querySelector(UISelectors.productList)
      .addEventListener("click", productEditClick);

    // edit product submit
    document
      .querySelector(UISelectors.updateButton)
      .addEventListener("click", editProductSubmit);

    // cancel button click
    document
      .querySelector(UISelectors.cancelButton)
      .addEventListener("click", cancelUpdate);
    
    // delete button click
    document
    .querySelector(UISelectors.deleteButton)
    .addEventListener("click",deleteProduct);
  };

  const productAddSubmit = function (e) {
    const productName = document.querySelector(UISelectors.productName).value;
    const productPrice = document.querySelector(UISelectors.productPrice).value;

    if (productName !== "" && productPrice !== "") {
      // Add product
      const newProduct = ProductCtrl.addProduct(productName, productPrice);

      // add item to list
      UIController.addProduct(newProduct);

      // get total
      const total = ProductCtrl.getTotal();

      // show total
      UICtrl.showTotal(total);

      // clear inputs
      UIController.clearInputs();
    }

    e.preventDefault();
  };

  const productEditClick = function (e) {
    if (e.target.classList.contains("fa-edit")) {
      const id =
        e.target.parentNode.previousElementSibling.previousElementSibling
          .previousElementSibling.textContent;

      // get selected product
      const product = ProductCtrl.getProductById(id);

      // set current product
      ProductCtrl.setCurrentProduct(product);

      // add product to UI
      UICtrl.addProductToForm();

      UICtrl.editState(e.target.parentNode.parentNode);
    }

    e.preventDefault();
  };

  const editProductSubmit = function (e) {
    const productName = document.querySelector(UISelectors.productName).value;
    const productPrice = document.querySelector(UISelectors.productPrice).value;

    if (productName !== "" && productPrice !== "") {
      // update product
      const updatedProduct = ProductCtrl.updateProduct(
        productName,
        productPrice
      );

      // update ui
      let item = UICtrl.updateProduct(updatedProduct);

      // get total
      const total = ProductCtrl.getTotal();

      // show total
      UICtrl.showTotal(total);

      UICtrl.addingState();
    }

    e.preventDefault();
  };

  const cancelUpdate = function (e) {
    UICtrl.addingState();
    e.preventDefault();
  };

  const deleteProduct = function(e){
    const selectedProduct = ProductCtrl.getCurrentProduct();
    ProductCtrl.deleteProduct(selectedProduct);

    // delete from ui
    UICtrl.deleteProduct();

    // hide card
    const productNumbers = ProductCtrl.getProducts();
    if(productNumbers.length == 0){
        UICtrl.hideCard();
        UICtrl.addingState();
    }
    e.preventDefault();
  }

  return {
    init: function () {
      UICtrl.addingState();

      const products = ProductCtrl.getProducts();

      if (products.length == 0) {
        UICtrl.hideCard();
      }
      loadEventListeners();
    },
  };
})(ProductController, UIController);

App.init();
