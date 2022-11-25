import { LightningElement, track, wire } from 'lwc';
import GET_CONTACTS from '@salesforce/apex/WireContactPractice.ContactPractice';
import DELETECON from '@salesforce/apex/WireContactPractice.DeleteContacts';
import {NavigationMixin} from 'lightning/navigation';
import {deleteRecord} from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';



export default class DataTablePractice extends NavigationMixin(LightningElement) {
    @track displayOnchage=false;
    @track multipleSelected=false;
    @track spinner=false;
    resultRefresh;
    selectedId;
    isModal=false;
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
       this.resultRefresh = result;
       
       this.data=[];
        if (result && result.data ) {
        this.data = result.data;
        } else if (result && result.error) {
        // TODO: error handling
        }
    }
    onChange(){
        let rowSelected = this.template.querySelector('lightning-datatable').getSelectedRows();
        if(rowSelected.length >0){
            this.displayOnchage=true;
        }else{
            this.displayOnchage=false;
        }
    }
    deleteSelected(){
        let rowSelected = this.template.querySelector('lightning-datatable').getSelectedRows();
        if(rowSelected.length >0){
            DELETECON({con : rowSelected})
            .then(result =>{
                this.dispatchEvent(
                    new ShowToastEvent ({
                        title : 'Record Deleted',
                        message: "Recored Successfully deleted.",
                        variant: "success"
                    })
                );
                refreshApex(this.resultRefresh); 

            })
            .catch(error =>{
                this.dispatchEvent(
                    new ShowToastEvent({
                        title : 'Error',
                        message: error.body.message,
                        variant: 'error'
                    })
                );

            });

        }
    }

    rowActionEvent(event){
        console.log({...event.detail.row});
        let actionName= event.detail.action.name;
        
        let Id =event.detail.row.Id;
       this.selectedId = Id;


       if(actionName== 'view' || actionName == 'edit'){
            this.navigationMixinAction(actionName,Id);
        }
        else if(actionName == 'delete'){
        this.confirmDelete();
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

    deleteRecord(){
        this.closeModal();
        this.spinner=true;
        deleteRecord(this.selectedId)
        .then(()=>{

            this.dispatchEvent(
                new ShowToastEvent({
                    title:'Success',
                    message:'Record Deleted Successfully',
                    variant:'success'

                })
            );
            this.spinner=false;
                      
            refreshApex(this.resultRefresh); 

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
            this.spinner=false;

        });
    }

    confirmDelete(){
        this.isModal=true;
    }

    closeModal(){
        this.isModal=false;
    }



}