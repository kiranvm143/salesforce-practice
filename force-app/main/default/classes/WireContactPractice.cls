public with sharing class WireContactPractice {
    public WireContactPractice() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> ContactPractice(){
        try {
             List<Contact> cnt = [select Id, Name, Email, Phone,Title from contact];
            return cnt;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
     @AuraEnabled
    public static Bank_Account__c createBankAccount(Bank_Account__c acc) {
        system.debug('acc'+acc);
        insert acc;
        return acc;
    }

    
    
}