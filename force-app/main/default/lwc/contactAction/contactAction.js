import { LightningElement, track, api } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';

export default class ContactAction extends NavigationMixin(LightningElement) {

    @track isOpen = false;
    @api record;
    @api objectname;

    cngaction(){
        this.isOpen = !this.isOpen;
    }

    viewAction(){

        this.cngaction();
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                objectApiName: this.objectname,
                actionName: 'view',
                recordId: this.record.Id
            }
        }
        )
        
    }

    editAction(){
        this.cngaction();
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                objectApiName: this.objectname,
                actionName: 'edit',
                recordId: this.record.Id
            }
        }
        )
        
    }

    deleteEvent(){
        this.isOpen = false;
        let cstmevnt = new CustomEvent('delete',{
            detail: this.record
        });

        this.dispatchEvent(cstmevnt);
        

    }

   
}