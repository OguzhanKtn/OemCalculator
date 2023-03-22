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
            {id:1, name:"Monitör",price:100},
            {id:2, name:"Ram",price:30},
            {id:3, name:"Klavye",price:10}
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
        }
    }

})();

// UI Controller
const UIController =(function(){

    const Selectors = {
        productList : "#item-list",
        addButton : ".addBtn",
        productName : "#productName",
        productPrice : "#productPrice"
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
        }
    }
})();

// App Controller
const App =(function(ProductCtrl,UICtrl){

    const UISelectors = UIController.getSelectors();

    return{
        init : function(){
            const products = ProductCtrl.getProducts();

            UICtrl.createProductList(products);
        }
    }

})(ProductController,UIController);

App.init();