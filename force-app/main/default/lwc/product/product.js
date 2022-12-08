import { api, LightningElement, track } from 'lwc';

export default class Product extends LightningElement {

@api productDetails;
@track isDetails = false;
@track setDetails;

getDetails(event){
    this.isDetails = true;
    
    let productId =event.currentTarget.dataset.id;
    //console.log(this.setDetails);

    this.productDetails.forEach(product => {
        if(product.id == productId ){
            this.setDetails = product;
        }
        
    });

}

addToCart(event){
    
    let cartProductId= event.target.value;

    this.dispatchEvent(new CustomEvent('addtocart',{detail:cartProductId}));
    this.closeDetails();


}

closeDetails(){
    this.isDetails = false;
}




}