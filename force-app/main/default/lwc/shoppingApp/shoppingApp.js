import { LightningElement, track } from 'lwc';
import Product_Category  from '@salesforce/apex/ShoppingApp.GetCategory';
import productByCategory from '@salesforce/apex/ShoppingApp.GetProductsByCategory';

export default class ShoppingApp extends LightningElement {

@track lstCategory=[];
@track lstProducts=[];
@track productCount;
@track cartCount='Cart';
@track isSpinner= false;
@track cartProducts=[];
@track total;


connectedCallback(){
    
    this.getCategory();
}

spinnerActive(){
    this.isSpinner = !this.isSpinner;
}

getCategory(){
    this.spinnerActive();
    Product_Category()
    .then(result =>{
        
       this.lstCategory = JSON.parse(result);
       this.spinnerActive();
    })
    .catch(error =>{
        this.spinnerActive();
    });
}




getProduct(event){
    this.lstProducts=[];
    this.spinnerActive();
    let productCategory = event.target.value;
    productByCategory({Category : productCategory})
    .then(result =>{
         this.lstProducts = JSON.parse(result);
         this.productCount = 'Products ('+ this.lstProducts.length + ')'; 
         this.spinnerActive();
    })
    .catch(error => {
        this.spinnerActive();
    });
}

cartDetails(event){
    let getId= event.detail;
    console.log(getId);

    this.lstProducts.forEach(product => {

        if(product.id == getId ){
            this.cartProducts.push(product);
        }
        
    });
    this.totalAmount();

    this.cartCount = 'Cart ('+ this.cartProducts.length + ')';
    
}

totalAmount(){
    this.total =0;
    this.cartProducts.forEach(product => {
        
        this.total= parseFloat(this.total)+ parseFloat(product.price); 

        
    });
}



}