theidentityhub-jquery-demo
===========================

Demo jQuery Application for The Identity Hub. The Identity Hub makes it easy to connect your app to all major identity providers like Microsoft, Facebook, Google, Twitter, Linked In and more. For more information see https://www.theidentityhub.com

Getting Started
===============

Download or Clone the repository. 

Find the app.js file in the root folder and locate the following code fragment:

````js
$identityService.config({
    baseUrl: "https://www.theidentityhub.com/[YOUR URL SEGMENT]",
    clientId: "[YOUR CLIENT ID]",
    redirectUri: "[YOUR APP BASE URL]/callback.html",
    popup: true,
    manualSignIn: true
});
````

Change the configuration as follows

1. Replace [YOUR CLIENT ID] with the client id from your App configured in The Identity Hub.
2. Replace [YOUR BASE URL] with the url of your tenant on The Identity Hub.
3. Replace [YOUR APP BASE URL] with the base url of your site. Configure the redirect uri in your OAUth 2.0 App parameters at The Identity Hub.
4. Navigate to [YOUR APP BASE URL] the index.html page

If you do not have already created an App see https://docs.theidentityhub.com/doc/Apps/Create-an-App.html.



