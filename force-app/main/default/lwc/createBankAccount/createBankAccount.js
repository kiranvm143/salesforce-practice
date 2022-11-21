import { LightningElement, track, wire } from 'lwc';
import GET_BANKACCOUNTS from '@salesforce/apex/WireContactPractice.createBankAccount';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class CreateBankAccount extends LightningElement {
    
    obj1={
        Name:'kiran',
        Account_Type__c:'current',
        Active__c:true,
        Balance__c: 500

    }

    @track isSpinner = false;
    @track options=   [
            { label: 'Saving Account', value: 'Saving' },
            { label: 'Current Account', value: 'Current' },
            { label: 'CC Account', value: 'CC' },
            { label: 'Loan Account', value: 'Loan' }
        ];
    

    

    createBankAcc(){
        this.isSpinner=true;
        let objBankAccount={};

        let allInputs = this.template.querySelectorAll('lightning-input');

        let typeInput = this.template.querySelector('lightning-combobox');

        for(let inp of allInputs){
            if(inp.type=='checkbox'){
               objBankAccount[inp.name]=inp.checked; 

            }
            else{
                objBankAccount[inp.name]=inp.value;
            }
        }

        objBankAccount[typeInput.name]=typeInput.value;
       
        GET_BANKACCOUNTS({ acc : objBankAccount })
            .then(result => {
                //console.log(result);
                let toastEvent = new ShowToastEvent({
                    title: 'Success',
                    message: 'Bank account added successfully ID:'+ result.Id,
                    variant: 'success',

                });
                this.dispatchEvent(toastEvent);
                this.resetForm();
                this.isSpinner=false;
            }
            )
            .catch(error => {
                let errorToast = new ShowToastEvent({
                    title:'Error Occured...',
                    message: error.body.message,
                    variant:'error'
                });
                this.dispatchEvent(errorToast);
                this.isSpinner=false;
            })
            
            
            

       
        

    }

    resetForm(){
        this.template.querySelectorAll('lightning-input').forEach(inp =>{
 
         if(inp.type=='checkbox'){
             inp.checked = false;
 
          }
          else{
              inp.value=null;
          }
        });
         this.template.querySelector('lightning-combobox').value=false;
     }



    @wire(GET_BANKACCOUNTS, {})
    bankAccounts ({error, data}) {
        if (error) {
            // TODO: Error handling
        } else if (data) {
            // TODO: Data handling
        }
    }

    
    

}