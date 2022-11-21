public with sharing class Wirepractice {
   
    @AuraEnabled(cacheable = true)
    public static List<Contact> getaccounts(){
        try {
            List<Contact> cnt = [select Id, Name, Email From contact];
            return cnt;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}