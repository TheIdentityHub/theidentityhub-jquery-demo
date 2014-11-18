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
                baseUrl: "https://www.theidentityhub.com/[YOUR URL SEGMENT]/",
                clientId: "[YOUR CLIENT ID]",
                redirectUri: "[YOUR APP BASE URL]/callback.html",
                popup: true,
                manualSignIn: true
            }).then(function () {
                viewmodel.init();
            });
        }
    };
})();