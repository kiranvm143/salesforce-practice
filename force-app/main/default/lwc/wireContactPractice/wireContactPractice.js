import { LightningElement, track, wire } from 'lwc';
import GET_CONTACTS from '@salesforce/apex/WireContactPractice.ContactPractice';
import {NavigationMixin} from 'lightning/navigation';
import { deleteRecord } from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';



export default class WireContactPractice extends NavigationMixin(LightningElement) {

    @track ContactHeader = [ 'Name', 'Phone', 'Title', 'Email', 'Action'];
    @track ContactItem = [];
     recordId;
    @track modal = false;
    storeResult;


    @wire(GET_CONTACTS)
    ContactPracticeWire (result) {
        
       
        if(result){
            this.storeResult = result;
            this.ContactItem = [];
            
            if(result.data){
               
                for (let con of result.data){
                    let copyItm = Object.assign({},con);
                    copyItm['url'] = '/lightning/r/Contact/'+con.Id+'/view';
                    this.ContactItem.push(copyItm);
        }

            }
            else if(result.error){
                console.log('Error log:', result.error);
            }
        }
    }


     newAction(){
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Contact',
                actionName: 'new'

            }
        })
    }

    closeModal(){
        this.modal= false;
    }
    
    eventHandler(event){
        let recorddetail= event.detail.Id;
        this.recordId = recorddetail;
        this.modal = true;

    }


    deleteContact(){
            this.closeModal();
            deleteRecord(this.recordId)
                .then(() => {
                    
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Record deleted',
                            variant: 'success'
                        })
                    );
                    refreshApex(this.storeResult);
                    
                })
                .catch(error => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error deleting record',
                            message: error.body.message,
                            variant: 'error'
                        })
                    );
                });

            
        

    }

    refeshData(){
        refreshApex(this.storeResult);
    }

    

    
}