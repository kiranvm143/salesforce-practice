import { LightningElement, track, wire } from 'lwc';
import GET_CONTACTS from '@salesforce/apex/WireContactPractice.ContactPractice';
import {NavigationMixin} from 'lightning/navigation';
//import {deleteRecord} from 'lightning/uiRecordApi';
//import {ShowToastEvent} from 'lightning/platformShowToastEvent';


export default class DataTablePractice extends NavigationMixin(LightningElement) {
    
   // selectedId;
    //isModal=false;
    @track data;
    actions =[
        { label:'View', name:'view' },
        { label:'Edit', name:'edit' },
        { label:'Delete', name:'delete' }
        ];

    @track columns =[
        { label:'Name', fieldName:'Name'},
        { label:'Email', fieldName:'Email'},
        { label:'Phone', fieldName:'Phone'},
        { label:'Title', fieldName:'Title'},
        { type:'action',
        typeAttributes:{ rowActions:this.actions}
        }
    
    ];

    @wire(GET_CONTACTS)
    contactWire (result) {
       
       
        if (result && result.data ) {
        this.data = result.data;
        } else if (result && result.error) {
        // TODO: error handling
        }
    }

    rowActionEvent(event){
        console.log({...event.detail.row});
        let actionName= event.detail.action.name;
        
        let Id =event.detail.row.Id;
       //this.selectedId = Id;


       if(actionName== 'view' || actionName == 'edit'){
            this.navigationMixinAction(actionName,Id);
        }
        else if(actionName == 'delete'){
           // this.confirmDelete();
        }


    }

    navigationMixinAction(action, Id){
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage',
            attributes:{
                recordId:Id,
                actionName:action,
                objectApiName: 'Contact'

            },
        });
    }

   /* deleteRecord(){
        this.closeModal();
        deleteRecord(this.selectedId)
        .then(()=>{
            this.dispatchEvent(
                new ShowToastEvent({
                    title:'Success',
                    message:'Record Deleted Successfully',
                    variant:'success'

                })
            );
           


        }
        )
        .catch(error =>{
            this.dispatchEvent(
                new ShowToastEvent(
                    {
                        title:'Error',
                        message: error.body.message,
                        variant: 'error'

                    }
                )
            );

        });
    }

    confirmDelete(){
        this.isModal=true;
    }

    closeModal(){
        this.isModal=false;
    }
*/



}