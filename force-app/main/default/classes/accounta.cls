public class accounta {

    public static void test(){
         List<Sobject> act = new List<Sobject>();
        act = [select Id, (select Id, name from Contacts), Phone from account];
        System.debug(act);
    }
}