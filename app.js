/// <reference path="Scripts/_references.js" />

"use strict";

var app = (function () {
    return {
        run: function () {
            ko.applyBindings(viewmodel);

            // register routes
            window.addEventListener("hashchange", function () {
                var route = window.location.hash.substring(1);
                if (route) {
                    if (route === "courses") {
                        viewmodel.getCourses();
                    }
                    else if (route === "flights") {
                        viewmodel.getFlights();
                    }
                    else if (route === "buddies") {
                        viewmodel.getBuddies();
                    }
                    else if (route === "account") {
                        viewmodel.getAccounts();
                    }
                    else {
                        window.location.hash = "courses";
                    }

                    viewmodel.currentView(route);
                }
            });

            $.identityService.config({
                baseUrl: "https://www.theidentityhub.com/[YOUR_URL_SEGMENT]/",
                clientId: "[YOUR_CLIENT_ID]",
                redirectUri: "[YOUR_REDIRECT_URI]",
                popup: true,
                manualSignIn: true
            }).then(function () {
                viewmodel.init();
            });
        }
    };
})();