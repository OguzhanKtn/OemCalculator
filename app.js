// Storage Controller
const StorageController = (function(){

})();


// Product Controller
const ProductController =(function(){

    const Product = function(id,name,price){
        this.id = id;
        this.name = name;
        this.price = price;
    }

    const data = {
        products : [
        ],
        selectedProduct:null,
        totalPrice:0
    }

    return{
        getProducts : function(){
            return data.products;
        },
        getData : function(){
            return data;
        },
        addProduct : function(name,price){
           id = data.products.length + 1;

            const newProduct = new Product(id,name,parseFloat(price));
            data.products.push(newProduct);
            return newProduct;
        }
    }

})();

// UI Controller
const UIController =(function(){

    const Selectors = {
        productList : "#item-list",
        addButton : ".addBtn",
        productName : "#productName",
        productPrice : "#productPrice",
        productCard : "#productCard"
    }

    return{
        createProductList : function(products){
            let html ="";

            products.forEach(prd => {
                html += `
                    <tr>
                        <td>${prd.id}</td>
                        <td>${prd.name}</td>
                        <td>${prd.price} $</td>
                        <td class="text-right">
                            <button type="submit" class="btn btn-warning btn-sm">
                                <i class="far fa-edit"></i>
                            </button>
                        </td>
                    </tr>
                
                `;
            });

            document.querySelector(Selectors.productList).innerHTML = html;
        },
        getSelectors : function(){
            return Selectors;
        },
        addProduct : function(prd){
            document.querySelector(Selectors.productCard).style.display = "block";
            var item = `
                <tr>
                    <td>${prd.id}</td>
                    <td>${prd.name}</td>
                    <td>${prd.price} $</td>
                    <td class="text-right">
                    <button type="submit" class="btn btn-warning btn-sm">
                        <i class="far fa-edit"></i>
                    </button>
                     </td>
                 </tr>
            
            `;
            document.querySelector(Selectors.productList).innerHTML += item;
        },
        clearInputs : function(){
            document.querySelector(Selectors.productName).value = "";
            document.querySelector(Selectors.productPrice).value = "";
        },
        hideCard : function(){
            document.querySelector(Selectors.productCard).style.display="none";
        }
    }
})();

// App Controller
const App =(function(ProductCtrl,UICtrl){

    const UISelectors = UIController.getSelectors();

    // load event listeners
    const loadEventListeners = function(){
        
        // add product event
        document.querySelector(UISelectors.addButton).addEventListener("click",function(e){

            const productName = document.querySelector(UISelectors.productName).value;
            const productPrice = document.querySelector(UISelectors.productPrice).value;

            if(productName!=="" && productPrice!==""){
               const newProduct = ProductCtrl.addProduct(productName,productPrice);
               UIController.addProduct(newProduct);

               UIController.clearInputs();

            }

            e.preventDefault();

        })
    }

    return{
        init : function(){
            const products = ProductCtrl.getProducts();

            if(products.length == 0){
                UICtrl.hideCard();
            }else{
                UICtrl.createProductList(products);
            }
            loadEventListeners();
        }
    }

})(ProductController,UIController);

App.init();