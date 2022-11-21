import { LightningElement, track } from 'lwc';

export default class Parent extends LightningElement {

@track message;

    eventHandle(event){
        let msg = event.detail;
        this.message = msg;
    }
  
}