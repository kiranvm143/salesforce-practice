import { LightningElement } from 'lwc';

export default class Child extends LightningElement {

    eventFire(){
        let customevent = new CustomEvent('testing', {
            detail: 'this is child Event'
        });
        this.dispatchEvent(customevent);
    }

}