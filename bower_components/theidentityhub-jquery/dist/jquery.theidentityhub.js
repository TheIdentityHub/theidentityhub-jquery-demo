(function ($) {
    var service = {
        oauthParameters: {
            clientId: "",
            baseUrl: "",
            redirectUri: "",
            scopes: "",
            manualSignIn: true,
            popup: false
        },
        principal: {
            isAuthenticated: false,
            isVerified: false,
            token: null,
            identity: null
        }
    };

    service.config = function (parameters) {
        service.oauthParameters = $.extend(service.oauthParameters, parameters);
        var baseUrl = service.oauthParameters.baseUrl;
        if (typeof baseUrl !== "string") {
            throw { error: "The baseUrl is required." };
        }

        baseUrl = baseUrl.trim();
        if (baseUrl[baseUrl.length - 1] === '/') {
            baseUrl = baseUrl.substring(0, baseUrl.length - 1);
        }

        service.oauthParameters.baseUrl = baseUrl;

        var promise = parseResponse().then(function () {
            if (!service.principal.isAuthenticated && !service.oauthParameters.manualSignIn) {
                service.signIn();
            }
        });

        return promise;
    };

    service.signIn = function (state) {
        var deferred = new $.Deferred();
        var url = service.oauthParameters.baseUrl + "/oauth2/v1/auth?response_type=token"
            + "&client_id=" + encodeURIComponent(service.oauthParameters.clientId)
            + "&redirect_uri=" + encodeURIComponent(service.oauthParameters.redirectUri);

        if (service.oauthParameters.scopes !== undefined) {
            url += "&scope=" + encodeURIComponent(service.oauthParameters.scopes);
        }

        if (state && state !== "") {
            url += "&state=" + encodeURIComponent(state);
        } else {
            url += "&state=" + encodeURIComponent(window.location.hash);
        }

        if (service.oauthParameters.popup) {
            authenticationBroker({
                "url": url,
                "redirectUri": service.oauthParameters.redirectUri,
                "width": 600,
                "height": 500
            }).then(function (response) {
                parseResponse(response.hash).then(function () {
                    deferred.resolve();
                });
            });
        } else {
            window.location.href = url;
        }

        return deferred.promise();
    };

    service.signOut = function () {
        var deferred = new $.Deferred();
        var token = getToken();

        sessionStorage.removeItem("access_token");
        service.principal.isAuthenticated = false;
        service.principal.isVerified = false;
        service.principal.identity = null;

        $.ajax({
            type: "POST",
            url: service.oauthParameters.baseUrl + "/oauth2/v1/revoke",
            data: $.param({
                "token": token.access_token,
                "token_type_hint": "access_token",
                "client_id": service.oauthParameters.clientId
            }),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + token.access_token);
            }
        }).success(function (response) {
            deferred.resolve(response);
        }).error(function (error) {
            deferred.reject(error);
        });

        return deferred.promise();
    };
     
    service.getProfile = function () {
        var deferred = new $.Deferred();
        var token = getToken();

        $.ajax(service.oauthParameters.baseUrl + "/api/identity/v1/", {
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + token.access_token);
            }
        }).success(function (response) {
            service.principal.identity = response;
            deferred.resolve(response);
        }).error(function (error) {
            deferred.reject(error);
        });

        return deferred.promise();
    };

    service.getFriends = function () {
        var deferred = new $.Deferred();
        var token = getToken();

        $.ajax(service.oauthParameters.baseUrl + "/api/identity/v1/friends", {
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + token.access_token);
            }
        }).success(function (response) {
            deferred.resolve(response);
        }).error(function (error) {
            deferred.reject(error);
        });

        return deferred.promise();
    };

    service.getAccounts = function () {
        var deferred = new $.Deferred();
        var token = getToken();

        $.ajax(service.oauthParameters.baseUrl + "/api/identity/v1/accounts", {
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + token.access_token);
            }
        }).success(function (response) {
            deferred.resolve(response);
        }).error(function (error) {
            deferred.reject(error);
        });

        return deferred.promise();
    };

    service.requireTwoFactorAuthentication = function () {
        var deferred = new $.Deferred();
        var token = getToken();

        if (service.principal.isVerified) {
            deferred.resolve(true);
            return deferred.promise();
        }

        $.ajax(service.oauthParameters.baseUrl + "/oauth2/v1/verify", {
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + token.access_token);
            }
        }).success(function (response) {
            if (response && response.resource_owner_identity_verified) {
                service.principal.isVerified = true;
                deferred.resolve(true);
            } else {
                var requestUri = service.oauthParameters.baseUrl + "/Authenticate/PerformTwoFactorAuthenticationVerification?accessToken=" + token.access_token + "&clientId=" + _this.oauthParameters.clientId + "&returnUrl=" + encodeURIComponent(_this.oauthParameters.redirectUri);

                authenticationBroker({
                    "url": requestUri,
                    "redirectUri": service.oauthParameters.redirectUri,
                    "width": 600,
                    "height": 500
                }).then(function (response) {
                    var property = "resource_owner_identity_verified=";
                    var pos = response.href.indexOf(property);
                    if (pos != -1 && response.href.length >= pos + (property.length + 1)) {
                        var isVerified = response.href[pos + property.length] == '1';
                        service.principal.isVerified = isVerified;
                        deferred.resolve(isVerified);
                    } else {
                        deferred.resolve(false);
                    }
                });
            }
        }).error(function (error) {
            deferred.reject(error);
        });

        return deferred.promise();
    };

    service.addAccount = function (accountProvider) {
        var deferred = new $.Deferred();
        var token = getToken();

        authenticationBroker({
            "url": accountProvider.signInUrl
                + "?access_token=" + token.access_token
                + "&returnurl=" + encodeURIComponent(service.oauthParameters.redirectUri),
            "redirectUri": service.oauthParameters.redirectUri,
            "width": 600,
            "height": 500
        }).then(function (response) {
            deferred.resolve();
        });

        return deferred.promise();
    };

    function authenticationBroker(options) {
        var deferred = new $.Deferred();
        var left = window.screenX + (window.outerWidth - options.width) / 2;
        var top = window.screenY + (window.outerHeight - options.height) / 2;

        var windowOptions = "status=0,resizable=0,scrollbars=1,location=0,toolbar=0,menubar=0,titlebar=0" + ",left= " + left + ",top=" + top + ",height=" + options.height + ",width=" + options.width;

        var brokerWindow = window.open(options.url, "Authenticate", windowOptions);

        var check = setInterval(function () {
            try {
                if (brokerWindow.location.href.indexOf(options.redirectUri) >= 0) {
                    var response = {
                        href: brokerWindow.location.href,
                        hash: brokerWindow.location.hash,
                        search: brokerWindow.location.search
                    };

                    setTimeout(function () {
                        deferred.resolve(response);
                    }, 1000);

                    brokerWindow.close();
                    brokerWindow = null;
                    clearInterval(check);
                }
            } catch (ex) {
            }
        }, 1000);

        return deferred.promise();
    };

    function getToken() {
        var token;
        var today = new Date().getTime();

        if (service.principal && service.principal !== undefined) {
            token = service.principal.token;
            if (token && token.access_token && token.expiry > today) {
                return token;
            }
        } else {
            token = JSON.parse(sessionStorage.getItem("access_token"));
            if (token && token.access_token && token.expiry > today) {
                return token;
            }
        }

        service.principal.token = null;
        service.principal.isAuthenticated = false;
        sessionStorage.removeItem("access_token");

        if (!service.oauthParameters.manualSignIn) {
            service.signIn();
        }
    };

    function setToken(responseParams) {
        if (responseParams && responseParams.access_token && responseParams.access_token !== "") {
            service.principal.token = {
                access_token: responseParams.access_token,
                expiry: new Date().getTime() + responseParams.expires_in * 1000,
                scope: responseParams.scope
            };

            service.principal.isAuthenticated = true;
            service.principal.isVerified = responseParams.resource_owner_identity_verified === '1';

            sessionStorage.setItem("access_token", service.principal.token);
        }

        return null;
    };

    function parseResponse(hash) {
        var deferred = new $.Deferred();
        var token, parameters;

        if (!hash || hash === "") {
            hash = window.location.hash;
        }

        if (hash && hash !== "") {
            parameters = getQueryParameters(hash);
            setToken(parameters);
            if (service.principal.isAuthenticated) {
                service.getProfile().then(function () {
                    deferred.resolve();
                });

                var state = parameters.state;
                if (state && state !== "") {
                    window.location.hash = state;
                } else {
                    window.location.hash = '';
                }

                return deferred.promise();
            }
        }
        else {
            if (!service.oauthParameters.manualSignIn) {
                service.signIn();
            }

            deferred.resolve();
        }

        return deferred.promise();
    };

    function getQueryParameters(query) {
        if (query[0] === "?" || query[0] === "#") {
            query = query.substr(1, query.length - 1);
        }

        if (query[0] === "/") {
            query = query.substr(1, query.length - 1);
        }

        var params = query.split("&");
        var result = [];
        if (params && params.length > 0) {
            for (var i = 0; i < params.length; i++) {
                var values = params[i].split("=");
                if (values.length === 2) {
                    result[values[0]] = decodeURIComponent(values[1]);
                }
            }
        }

        return result;
    }

    $.identityService = service;
})(jQuery);

