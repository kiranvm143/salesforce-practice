import { LightningElement, track, wire } from 'lwc';
import GET_CONTACTS from '@salesforce/apex/WireContactPractice.ContactPractice';

export default class DataTablePractice extends LightningElement {

 actions =[
    { label:'View', name:'view' },
    { label:'View', name:'view' },
    { label:'View', name:'view' }
];

@track columns =[
    { title:'Name', fieldName:'Name'},
    { title:'Email', fieldName:'Email'},
    { title:'Phone', fieldName:'Phone'},
    { title:'Title', fieldName:'Title'},
    { type:'action',
        typeAttributes:{ rowActions:this.actions}
    }
    
];

@wire(GET_CONTACTS)
contactWire (result) {
    if (result && result.data ) {
        // TODO: Error handling
    } else if (result && result.data) {
        // TODO: Data handling
    }
}



}