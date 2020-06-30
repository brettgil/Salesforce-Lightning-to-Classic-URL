# Salesforce-Lightning-to-Classic-URL
Allows Salesforce Classic only users to paste Lightning URLs and be properly redirected to the classic url.  

To test, you would need to login as a classic only user.  If you have lightning access, just switching to classic wont recreate the Access Denied page.
This extension works on any object as long as the URL as a SF 18 digit ID in it. 
Ex:   https://mydomain.lightning.force.com/lightning/r/Opportunity/0062G12345g8FK9QAM/view  will get redirected to https://mydomain.my.salesforce.com/0062G12345g8FK9QAM 

*NOTE: URLs that don't have an 18 digit ID like the Opportunities Homepage (https://mydomain.lightning.force.com/lightning/o/Opportunity/list?filterName=Recent) will still fail because the extension can't know what the correct url to go is: https://mydomain.my.salesforce.com/006?fcf=00B12345000uLr4  <-- Opportunities Recent list page   (No one should really be sharing these kinds of page links anyway but Im sure it happens)    

How to test: (before installing plugin (if already installed turn it off via the extensions chrome page - chrome://extensions/ )
 - Navigate to a specific lightning detail record page
 - Copy the lightning URL from the browser
 - Login as a classic only user 
 - Paste lightning URL > Enter
 - This should result in the Access Denied page
 - Install / turn on extension
 - Paste lightning URL > Enter
 - Should be redirected to Classic record page
