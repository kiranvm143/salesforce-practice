import { LightningElement } from 'lwc';

export default class FirstLwcComponent extends LightningElement {
    myText="I'm Kiran ";

    propertyName(){
        return `${this.myText}`.toUpperCase();
    }
}