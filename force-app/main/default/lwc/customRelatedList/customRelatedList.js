import { api, LightningElement, track, wire } from 'lwc';
import GET_CONTACTS from '@salesforce/apex/WireContactPractice.GetContactById';


export default class CustomRelatedList extends LightningElement {
    @api recordId;
    @track columns =[
        {label: 'Name' , fieldName : 'Name'},
        {label: 'Email' , fieldName : 'Email'},
        {label: 'Phone' , fieldName : 'Phone'}
    ];

    @track data=[];

    @wire(GET_CONTACTS, {recordId: '$recordId'})
    fetchContacts ({error, data}) {
        if (error) {
            // TODO: Error handling
        } else if (data) {
            this.data = data;
        }
    }

}