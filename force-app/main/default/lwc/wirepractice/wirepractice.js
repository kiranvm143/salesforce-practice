import { LightningElement, track, wire } from 'lwc';
import GET_ACCOUNTS from '@salesforce/apex/Wirepractice.getaccounts';
export default class Wirepractice extends LightningElement {


@track lstAccounts = [];

@wire(GET_ACCOUNTS)
callWireAccounts(result){
    if(result){
        if(result.data){
            this.lstAccounts = result.data;
            
    }else if(result.error){
        console.log('Error log:', result.error);

        
    }

}
}
}