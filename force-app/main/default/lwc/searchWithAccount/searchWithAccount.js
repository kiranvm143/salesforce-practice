import { LightningElement, track } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
import searchContactByAccount from '@salesforce/apex/WireContactPractice.SearchByAccountName';
import { deleteRecord } from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class SearchWithAccount extends NavigationMixin(LightningElement) {

    columns= [
        {label:'edit', name:'edit'},
        {label:'delete', name:'delete'}
    ];
    @track lstColumns=[
        {label:'Name', fieldName:'Name'},
        {label:'Phone', fieldName:'Phone'},
        {label:'Email', fieldName:'Email'},
        {type:'action', 
        typeAttributes:{rowActions:this.columns}

        }
    ];

    @track lstData=[];

    searchAccount(event){
        let inputName= event.target.value;
        searchContactByAccount({Name: inputName })
        .then(result =>{
            this.lstData = result;
        })
        .catch(error =>{
            console.log(error.body.message);
        });

    }
    searchAction(event){
        let actionName= event.detail.action.name;
        let selectedId = event.detail.row.Id;

        if(actionName == 'edit'){
            this[NavigationMixin.Navigate]({
                type:'standard__recordPage',
                attributes:{
                    recordId:selectedId,
                    actionName:'edit',
                    objectApiName: 'Contact'
                }
            });
        }
        else if(actionName == 'delete'){
            deleteRecord(selectedId)
            .then(()=>{
                this.dispatchEvent(
                    new ShowToastEvent({
                        title:'Success',
                        message:'Record Deleted Successfully',
                        variant:'success'
    
                    })
                );

            })
            .catch(error =>{
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: 'deletion Unsuceessful',
                        variant: 'error'
                    })
                );

            })
        }
    }




}