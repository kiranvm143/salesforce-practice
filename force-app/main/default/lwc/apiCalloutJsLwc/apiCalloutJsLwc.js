import { LightningElement, track } from 'lwc';

export default class ApiCalloutJsLwc extends LightningElement {

    @track fact;
    
    connectedCallback(){
        fetch('https://catfact.ninja/fact',{method: "GET"})
        .then(response => response.json())
        .then(data => {
            this.fact = data.fact;
        });
    }
}