theidentityhub-jquery
======================

The Identity Hub makes it easy to connect your app to all major identity providers like Microsoft, Facebook, Google, Twitter, Linked In and more. For more information visit [The Identity Hub](https://www.theidentityhub.com)

Getting Started
===============

Use The Identity Hub to provide sign-in for your JavaScript apps, using a variety of account providers. You will need an account at The Identity Hub. If you do not have an account sign up for a [free plan](https://www.theidentityhub.com/#pricing)

## Installation

Use bower to install the sdk in your project.

### Bower

````bash
bower install theidentityhub-jquery
````

## Configure your app

````js
$.identityService.config({
    baseUrl: "https://www.theidentityhub.com/{YOUR_URL_SEGMENT}",
    clientId: "[YOUR_CLIENT_ID]",
    redirectUri: "[YOUR_REDIRECT_PAGE]",
    popup: true
});
````

Using this configuration the user will be redirected to The Identity Hub to authenticate. After the user is authenticated The Identity Hub will redirect back to your app.

After sign-in you can use the identityService.principal object to get info on the current user.

