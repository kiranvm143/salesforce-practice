import { LightningElement, track, wire} from 'lwc';
import User_ID from '@salesforce/user/Id';
import AccountMessage from '@salesforce/label/c.AccountMessage';
import test from '@salesforce/label/c.testLabel';
import img from '@salesforce/resourceUrl/img1';
import Get_User from '@salesforce/apex/wireContactPractice.UserInformation';


export default class CustomLabelPractice extends LightningElement {

    @track labels={AccountMessage, test};
    @track image = img;
    @track userId=User_ID;

    @track userDetails={};
    
    @wire(Get_User, { userId: '$userId' } )
    getUserDetails ({error, data}) {
        if (error) {
            // TODO: Error handling
        } else if (data) {
            this.userDetails = data;
        }
    }

}