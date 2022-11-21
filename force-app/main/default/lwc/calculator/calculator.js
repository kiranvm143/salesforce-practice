import { LightningElement, track } from 'lwc';

export default class Calculator extends LightningElement {

    no1;
    no2;
    @track Result;
    handleevent(event){
        let eventname = event.target.name;
        let value = parseFloat(event.target.value);

        if(eventname=="fno"){
            this.no1=value;
        }
        else{
            this.no2 = value;
        }
    }

    add(){
        this.Result = this.no1 + this.no2;
    }
    sub(){
        this.Result = this.no1 - this.no2;
    }
    mul(){
        this.Result = this.no1 * this.no2;
    }
    div(){
        this.Result = this.no1 / this.no2;
    }

}