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

})();

// UI Controller
const UIController =(function(){

})();

// App Controller
const AppController =(function(ProductCtrl,UICtrl){

    

})(ProductController,UIController);