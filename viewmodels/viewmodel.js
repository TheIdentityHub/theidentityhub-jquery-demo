var viewmodel = (function () {
    var vm = {
        currentView: ko.observable(''),
        init: init,
        signIn: signIn,
        signOut: signOut,
        getBuddies: getBuddies,
        getAccounts: getAccounts,
        getCourses: getCourses,
        getFlights: getFlights,
        addAccount: addAccount,
        account: {
            displayName: ko.observable(''),
            accountProviders: ko.observableArray([])
        },
        buddies: ko.observableArray([]),
        flights: ko.observableArray([]),
        courses: ko.observableArray([]),
        principal: {
            isAuthenticated: ko.observable($.identityService.principal.isAuthenticated),
            identity: {
                displayName: ko.observable(''),
                pictureUrl: ko.observable('')
            },
            isInRole: function (role) {
                return $.identityService.principal.isInRole(role);
            }
        }
    };

    return vm;

    function init() {
        if ($.identityService.principal.identity) {
            vm.account.displayName($.identityService.principal.identity.displayName);
            vm.principal.isAuthenticated($.identityService.principal.isAuthenticated)
            vm.principal.identity.displayName($.identityService.principal.identity.displayName);
            vm.principal.identity.pictureUrl($.identityService.principal.identity.smallPictures[0]);
        }
        else {
            vm.account.displayName('');
            vm.principal.isAuthenticated($.identityService.principal.isAuthenticated)
            vm.principal.identity.displayName('');
            vm.principal.identity.pictureUrl('');
        }
    }

    function signIn() {
        $.identityService.signIn().then(function (response) {
            init();
        });
    }

    function signOut() {
        $.identityService.signOut();
        init();
    }

    function getAccounts() {
        $.identityService.getAccounts().then(function (response) {
            vm.account.displayName($.identityService.principal.identity.displayName);
            vm.account.accountProviders([]);
            $.each(response, function (index, element) {
                vm.account.accountProviders.push(element);
            });
        });
    }

    function addAccount(accountProvider) {
        $.identityService.addAccount(accountProvider).then(function () {
            vm.getAccounts();
        });
    }

    function getBuddies() {
        $.identityService.getFriends().then(function (response) {
            vm.buddies([]);
            $.each(response, function (index, element) {
                vm.buddies.push(element);
            });
        });
    }

    function getAccounts() {
        $.identityService.getAccounts().then(function (response) {
            vm.account.displayName($.identityService.principal.identity.displayName);
            vm.account.accountProviders([]);
            $.each(response, function (index, element) {
                vm.account.accountProviders.push(element);
            });
        });
    }

    function getFlights() {
        vm.flights([
            {
                "date": "1/11/2014",
                "title": "MILLENNIUM GOLF",
                "city": "PAAL-BERINGEN",
                "email": "info@millenniumgolf.be",
                "website": "http:\/\/www.milleniumgolf.be\/"
            },
            {
                "date": "11/11/2014",
                "title": "DRAGON GOLF BORNEM",
                "city": "BORNEM",
                "email": "info@dragongolf.be",
                "website": "http:\/\/www.dragongolf.be"
            },
            {
                "date": "14/11/2014",
                "title": "GOLF CLUB KROKKEBAAS",
                "city": "BUGGENHOUT",
                "email": "info@krokkebaas.be",
                "website": "http:\/\/www.krokkebaas.be"
            },
            {
                "date": "15/12/2014",
                "title": "STEENPOEL GOLF CLUB",
                "city": "ITTERBEEK",
                "email": "info@steenpoel.be",
                "website": "http:\/\/www.steenpoel.be"
            }]);
    }

    function getCourses() {
        vm.courses([
            {
                "id": "4",
                "title": "ATGOLF - Wallonie",
                "city": "Lasne",
                "email": "info@atgolf.be",
                "website": "http:\/\/www.atgolf.be"
            },
            {
                "id": "3",
                "title": "GOLF CLUB DE BERTRANSART",
                "city": "NALINNES",
                "email": "info@cs-bertransart.be",
                "website": "http:\/\/www.cs-bertransart.be"
            },
            {
                "id": "5",
                "title": "ATGOLF - Vlaanderen",
                "city": "WIJNEGEM",
                "email": "info@atgolf.be",
                "website": "http:\/\/www.atgolf.be"
            },
            {
                "id": "6",
                "title": "INTERNATIONAL GOLF TRAINING CENTER",
                "city": "MOL",
                "email": "igtc@telenet.be",
                "website": "http:\/\/www.igtc.be"
            },
            {
                "id": "7",
                "title": "GOLF PRACTICE ST-GENESIUS-RODE",
                "city": "SINT-GENESIUS-RODE",
                "email": "johnnyvercruyce@hotmail.com",
                "website": "http:\/\/www.golfpracticersg.be"
            },
            {
                "id": "8",
                "title": "SPORTCLUB TAXANDRIA",
                "city": "TURNHOUT",
                "email": "sportclubtaxandria@yahoo.com",
                "website": "http:\/\/www.sportclubtaxandria.be"
            },
            {
                "id": "9",
                "title": "THUDINIE ACADEMY GOLF CLUB",
                "city": "RAGNIES",
                "email": "info@ragniesgolf.be",
                "website": "http:\/\/www.ragniesgolf.be"
            },
            {
                "id": "10",
                "title": "ANTWERP GOLFSCHOOL",
                "city": "AARTSELAAR",
                "email": "info@ags.be",
                "website": "http:\/\/www.ags.be"
            },
            {
                "id": "11",
                "title": "DRAGON GOLF BORNEM",
                "city": "BORNEM",
                "email": "info@dragongolf.be",
                "website": "http:\/\/www.dragongolf.be"
            },
            {
                "id": "12",
                "title": "GOLFSCHOOL GENT",
                "city": "DRONGEN-GENT",
                "email": "info@golfschool-gent.be",
                "website": "http:\/\/www.golfschool-gent.be"
            },
            {
                "id": "13",
                "title": "GOLFLIFE CENTER STERREBEEK",
                "city": "STERREBEEK",
                "email": "info@golflife.be",
                "website": "http:\/\/www.golflife.be"
            },
            {
                "id": "14",
                "title": "GOLF CLUB KROKKEBAAS",
                "city": "BUGGENHOUT",
                "email": "info@krokkebaas.be",
                "website": "http:\/\/www.krokkebaas.be"
            },
            {
                "id": "15",
                "title": "STEENPOEL GOLF CLUB",
                "city": "ITTERBEEK",
                "email": "info@steenpoel.be",
                "website": "http:\/\/www.steenpoel.be"
            },
            {
                "id": "16",
                "title": "GOLFCENTRUM PUURS",
                "city": "BREENDONK",
                "email": "info@golfpuurs.be",
                "website": "http:\/\/www.golfpuurs.be"
            },
            {
                "id": "17",
                "title": "GOLF DECOUVERTE VIRTON",
                "city": "VIRTON",
                "email": "secretariat@golfvirton.be",
                "website": "http:\/\/virton.mygolf.be"
            },
            {
                "id": "18",
                "title": "THE GREENHOUSE, GOLF DE SAINT-VITH",
                "city": "SAINT-VITH",
                "email": "info@thegreenhouse.be",
                "website": "http:\/\/www.thegreenhouse.be"
            },
            {
                "id": "19",
                "title": "EXECUTIVE CLUB PRIVATE GOLF",
                "city": "ZWIJNAARDE",
                "email": "ecpgzwijnaarde@telenet.be",
                "website": "http:\/\/www.ecpgzwijnaarde.be"
            },
            {
                "id": "20",
                "title": "GOLF CLUB D'ANDENNE",
                "city": "ANDENNE",
                "email": "jojadin@hotmail.com",
                "website": "http:\/\/www.golfclubandenne.be"
            },
            {
                "id": "21",
                "title": "AVERNAS GOLF CLUB",
                "city": "HANNUT",
                "email": "info@golfavernas.be",
                "website": "http:\/\/www.golfavernas.be"
            },
            {
                "id": "22",
                "title": "GOLF CLUB DE LIEGE - BERNALMONT",
                "city": "LIEGE",
                "email": "bernalmont@pro1golf.com",
                "website": "http:\/\/bernalmont.mygolf.be"
            },
            {
                "id": "23",
                "title": "GOLFSCHOOL BEVEREN",
                "city": "KALLO-BEVEREN",
                "email": "golfclubbeveren@skynet.be ",
                "website": "http:\/\/www.golfclubbeveren.be"
            },
            {
                "id": "24",
                "title": "BRASSCHAAT OPEN GOLF & COUNTRY CLUB",
                "city": "BRASSCHAAT",
                "email": "info@brasschaatgolf.be",
                "website": "http:\/\/www.brasschaatgolf.be"
            },
            {
                "id": "25",
                "title": "GOLFCLUB DE KLUIZEN ",
                "city": "AALST",
                "email": "info@dekluizen.be",
                "website": "http:\/\/www.dekluizen.be"
            },
            {
                "id": "26",
                "title": "DE DRIE EYCKEN - CLEYDAEL GOLF",
                "city": "EDEGEM",
                "email": "sport@drieeycken.be",
                "website": "http:\/\/www.drieeycken.be"
            },
            {
                "id": "27",
                "title": "DUISBURG MILITARY GOLF CLUB (D.M.G.C.)",
                "city": "DUISBURG",
                "email": "golf.duisburg@skynet.be",
                "website": "http:\/\/www.dmgc.be"
            },
            {
                "id": "28",
                "title": "GOLF CLUB ENGHIEN",
                "city": "ENGHIEN",
                "email": "info@golfclubenghien.com",
                "website": "http:\/\/www.golfclubenghien.com"
            },
            {
                "id": "29",
                "title": "FLORENNES AVIA GOLF CLUB",
                "city": "FLORENNES",
                "email": "",
                "website": ""
            },
            {
                "id": "30",
                "title": "GOLFFORUM",
                "city": "LUMMEN",
                "email": "golfforum@skynet.be",
                "website": "http:\/\/www.golfforumlummen.be"
            },
            {
                "id": "31",
                "title": "GOLF DU HARAS",
                "city": "PEPINSTER",
                "email": "golf@golfduharas.be",
                "website": "http:\/\/www.golfduharas.be"
            },
            {
                "id": "32",
                "title": "IEPER GOLF CLUB",
                "city": "IEPER",
                "email": "info@ieperopengolf.be",
                "website": "http:\/\/www.ieperopengolf.be"
            },
            {
                "id": "33",
                "title": "KOKSIJDE GOLF TER HILLE",
                "city": "KOKSIJDE",
                "email": "golfsecretariaat@koksijde.be",
                "website": "http:\/\/www.koksijdegolfterhille.be"
            },
            {
                "id": "34",
                "title": "LILSE GOLF & COUNTRY",
                "city": "LILLE",
                "email": "info@lilsegolfcountry.be",
                "website": "http:\/\/www.lilsegolfcountry.be"
            },
            {
                "id": "35",
                "title": "GOLF CLUB NUCLEA MOL",
                "city": "MOL",
                "email": "\u00a0info@golfclubnucleamol.be",
                "website": "http:\/\/www.golfclubnucleamol.be"
            },
            {
                "id": "36",
                "title": "OVERIJSE GOLF CLUB",
                "city": "OVERIJSE",
                "email": "ogc@telenet.be",
                "website": "http:\/\/www.overijsegolfclub.be"
            },
            {
                "id": "37",
                "title": "GOLF PUYENBROECK",
                "city": "WACHTEBEKE",
                "email": "golf.puyenbroeck@oost-vlaanderen.be",
                "website": "http:\/\/www.golf.be\/puyenbroeck\/index.htm"
            },
            {
                "id": "38",
                "title": "WELLINGTON GOLF OOSTENDE",
                "city": "OOSTENDE",
                "email": "info@wellingtongolf.be",
                "website": "http:\/\/www.wellingtongolf.be"
            },
            {
                "id": "39",
                "title": "WESTGOLF",
                "city": "WESTENDE",
                "email": "info@westgolf.be",
                "website": "http:\/\/www.westgolf.be"
            },
            {
                "id": "40",
                "title": "GOLF CLUB DE WIJNVELDEN",
                "city": "ONZE-LIEVE-VROUW-WAVER",
                "email": "info@golfclubdewijnvelden.be",
                "website": "http:\/\/www.golfclubdewijnvelden.be"
            },
            {
                "id": "41",
                "title": "ROYAL AMICALE ANDERLECHT GOLF CLUB",
                "city": "BRUSSELS",
                "email": "info@golf-anderlecht.com",
                "website": "http:\/\/www.golf-anderlecht.com"
            },
            {
                "id": "42",
                "title": "GOLF CLUB DU CH\u00c2TEAU ROYAL D'ARDENNE",
                "city": "HOUYET",
                "email": "info@royal-ardenne.be",
                "website": "http:\/\/www.royal-ardenne.be"
            },
            {
                "id": "43",
                "title": "GOLF DU CH\u00c2TEAU DE LA BAWETTE",
                "city": "WAVRE",
                "email": "info@labawette.com",
                "website": "http:\/\/www.labawette.com"
            },
            {
                "id": "44",
                "title": "GOLF DU BERCUIT",
                "city": "GREZ-DOICEAU",
                "email": "info@golfdubercuit.be",
                "website": "http:\/\/www.golfdubercuit.be"
            },
            {
                "id": "45",
                "title": "BRABANTSE GOLF",
                "city": "MELSBROEK",
                "email": "secretariaat@brabantsegolf.be",
                "website": "http:\/\/www.brabantsegolf.be"
            },
            {
                "id": "46",
                "title": "GOLF DE LA BRUYERE",
                "city": "SART-DAMES-AVELINES",
                "email": "info@golflabruyere.be",
                "website": "http:\/\/www.golflabruyere.be"
            },
            {
                "id": "47",
                "title": "CLEYDAEL GOLF & COUNTRY CLUB ",
                "city": "AARTSELAAR",
                "email": "secretariaat@cleydael.be",
                "website": "http:\/\/www.cleydael.be"
            },
            {
                "id": "48",
                "title": "ROYAL GOLF CLUB DES FAGNES",
                "city": "SPA",
                "email": "info@golfdespa.be",
                "website": "http:\/\/www.golfdespa.be"
            },
            {
                "id": "49",
                "title": "GOLF DE FALNUEE",
                "city": "MAZY",
                "email": "info@falnuee.be",
                "website": "http:\/\/www.falnuee.be"
            },
            {
                "id": "50",
                "title": "GOLF CLUB DE MEAN",
                "city": "MEAN",
                "email": "info@fivenations.be",
                "website": "http:\/\/www.fivenations.be"
            },
            {
                "id": "51",
                "title": "INTERNATIONAL GOMZE GOLF CLUB",
                "city": "GOMZE ANDOUMONT",
                "email": "gomzegolf@skynet.be",
                "website": "http:\/\/www.gomze.be"
            },
            {
                "id": "52",
                "title": "GOLF CLUB D'HULENCOURT",
                "city": "VIEUX-GENAPPE",
                "email": "info@golfhulencourt.be",
                "website": "http:\/\/www.golfhulencourt.be"
            },
            {
                "id": "53",
                "title": "GOLF CLUB KAMPENHOUT",
                "city": "KAMPENHOUT",
                "email": "info@golfclubkampenhout.be",
                "website": "http:\/\/www.golfclubkampenhout.be"
            },
            {
                "id": "54",
                "title": "KEERBERGEN GOLF CLUB",
                "city": "KEERBERGEN",
                "email": "info@golfkeerbergen.be",
                "website": "http:\/\/www.golfkeerbergen.be"
            },
            {
                "id": "55",
                "title": "KEMPENSE GOLF CLUB",
                "city": "MOL-RAUW",
                "email": "info@kempensegolf.be",
                "website": "http:\/\/www.kempensegolf.be"
            },
            {
                "id": "56",
                "title": "ROYAL LATEM GOLF CLUB",
                "city": "SINT-MARTENS-LATEM",
                "email": "secretary@latemgolf.be",
                "website": "http:\/\/www.latemgolf.be"
            },
            {
                "id": "57",
                "title": "LIMBURG GOLF & COUNTRY CLUB",
                "city": " Houthalen-Helchteren",
                "email": "limburggolf@telenet.be",
                "website": "http:\/\/www.lgcc.be"
            },
            {
                "id": "58",
                "title": "GOLF MERGELHOF",
                "city": "GEMMENICH",
                "email": "info@mergelhof.com ",
                "website": "http:\/\/www.mergelhof.com"
            },
            {
                "id": "59",
                "title": "MILLENNIUM GOLF",
                "city": "PAAL-BERINGEN",
                "email": "info@millenniumgolf.be",
                "website": "http:\/\/www.milleniumgolf.be\/"
            },
            {
                "id": "60",
                "title": "GOLF DU MONT GARNI",
                "city": "BAUDOUR",
                "email": "secretariat@golfmontgarni.be",
                "website": "http:\/\/www.golfmontgarni.be"
            },
            {
                "id": "61",
                "title": "ROYAL OSTEND GOLF CLUB",
                "city": "DE HAAN",
                "email": "info@rogc.eu",
                "website": "http:\/\/www.golfoostende.be"
            },
            {
                "id": "62",
                "title": "GOLF & COUNTRY CLUB \"DE PALINGBEEK\"",
                "city": "HOLLEBEKE",
                "email": "golfpalingbeek@skynet.be",
                "website": "http:\/\/www.golfpalingbeek.com"
            },
            {
                "id": "63",
                "title": "GOLF CLUB DE PIERPONT",
                "city": "FRASNES-LEZ-GOSSELIES",
                "email": "info@pierpont.be",
                "website": "http:\/\/www.pierpont.be"
            },
            {
                "id": "64",
                "title": "RAGNIES GOLF CLUB",
                "city": "RAGNIES",
                "email": "info@ragniesgolf.be",
                "website": "http:\/\/www.ragniesgolf.be"
            },
            {
                "id": "65",
                "title": "GOLF DE RIGENEE",
                "city": "VILLERS-LA-VILLE",
                "email": "golf@rigenee.be",
                "website": "http:\/\/www.rigenee.be"
            },
            {
                "id": "66",
                "title": "GOLF DE ROUGEMONT",
                "city": "PROFONDEVILLE",
                "email": "rougemont@skynet.be",
                "website": "http:\/\/www.golfderougemont.be"
            },
            {
                "id": "67",
                "title": "ROYAL GOLF CLUB DE SART-TILMAN",
                "city": "LIEGE",
                "email": "secretariat@rgcst.be",
                "website": "http:\/\/www.rgcst.be"
            },
            {
                "id": "68",
                "title": "SPIEGELVEN GOLFCLUB",
                "city": "GENK",
                "email": "info@spiegelven.be",
                "website": "http:\/\/www.spiegelven.be"
            },
            {
                "id": "69",
                "title": "STEENHOVEN COUNTRY CLUB",
                "city": "POSTEL (MOL)",
                "email": "info@steenhoven.be",
                "website": "http:\/\/www.steenhoven.be"
            },
            {
                "id": "70",
                "title": "WAREGEM GOLF CLUB",
                "city": "WAREGEM",
                "email": "info@waregemgolf.be",
                "website": "http:\/\/www.waregemgolf.be"
            },
            {
                "id": "71",
                "title": "WINGE GOLF & COUNTRY CLUB",
                "city": "SINT JORIS WINGE",
                "email": "info@wingegolf.be",
                "website": "http:\/\/www.wingegolf.be"
            },
            {
                "id": "72",
                "title": "GOLF CLUB WITBOS ",
                "city": "NOORDERWIJK - HERENTALS",
                "email": "info@golfclubwitbos.be",
                "website": "http:\/\/www.golfclubwitbos.be"
            },
            {
                "id": "73",
                "title": "GOLF DE DURBUY",
                "city": "BARVAUX SUR OURTHE",
                "email": "durbuy@bluegreen.com",
                "website": "http:\/\/www.bluegreen.com\/durbuy"
            },
            {
                "id": "74",
                "title": "GOLF CLUB DE LOUVAIN-LA-NEUVE",
                "city": "LOUVAIN-LA-NEUVE",
                "email": "info@golflln.be",
                "website": "http:\/\/lln.mygolf.be"
            },
            {
                "id": "75",
                "title": "ROYAL ANTWERP GOLF CLUB",
                "city": "KAPELLEN",
                "email": "info@ragc.be ",
                "website": "http:\/\/www.ragc.be"
            },
            {
                "id": "76",
                "title": "BOSSENSTEIN GOLF EN POLO CLUB",
                "city": "BROECHEM",
                "email": "golf@bossentein.be",
                "website": "http:\/\/www.bossentein.be"
            },
            {
                "id": "77",
                "title": "DAMME GOLF AND COUNTRY CLUB",
                "city": "SIJSELE-DAMME",
                "email": "info@dammegolf.be",
                "website": "http:\/\/www.dammegolf.be"
            },
            {
                "id": "78",
                "title": "L'EMPEREUR GOLF & COUNTRY CLUB",
                "city": "WAYS",
                "email": "info@golfempereur.com",
                "website": "http:\/\/www.golfempereur.com"
            },
            {
                "id": "79",
                "title": "FLANDERS NIPPON GOLF & BUSINESS CLUB HASSELT",
                "city": "HASSELT",
                "email": "info@flandersnippongolf.be",
                "website": "http:\/\/www.flandersnippongolf.be"
            },
            {
                "id": "80",
                "title": "ROYAL GOLF CLUB DU HAINAUT",
                "city": "ERBISOEUL",
                "email": "info@golfhainaut.be",
                "website": "http:\/\/www.golfhainaut.be"
            },
            {
                "id": "81",
                "title": "GOLF & COUNTRY CLUB HENRI-CHAPELLE",
                "city": "WELKENRAEDT",
                "email": "info@golfhenrichapelle.be",
                "website": "http:\/\/www.golfhenrichapelle.be"
            },
            {
                "id": "82",
                "title": "ROYAL GOLF CLUB DE BELGIQUE",
                "city": "TERVUREN",
                "email": "info@rgcb.be",
                "website": "http:\/\/www.rgcb.be"
            },
            {
                "id": "83",
                "title": "TERNESSE GOLF & COUNTRY CLUB",
                "city": "WOMMELGEM",
                "email": "info@ternessegolf.be",
                "website": "http:\/\/www.ternessegolf.be"
            },
            {
                "id": "84",
                "title": "GOLF & COUNTRY CLUB OUDENAARDE",
                "city": "WORTEGEM-PETEGEM",
                "email": "oudenaarde@golf.be",
                "website": "http:\/\/www.golfoudenaarde.be"
            },
            {
                "id": "85",
                "title": "RINKVEN INTERNATIONAL GOLF & COUNTRY CLUB",
                "city": "SCHILDE-S'GRAVENWEZEL",
                "email": "info@rinkven.be",
                "website": "http:\/\/www.rinkven.be"
            },
            {
                "id": "86",
                "title": "GOLF CLUB DE SEPT FONTAINES",
                "city": "BRAINE-L'ALLEUD",
                "email": "info@golf7fontaines.be",
                "website": "http:\/\/www.golf7fontaines.be"
            },
            {
                "id": "87",
                "title": "ROYAL ZOUTE GOLF CLUB",
                "city": "KNOKKE",
                "email": "golf@zoute.be",
                "website": "http:\/\/www.zoute.be"
            },
            {
                "id": "88",
                "title": "GOLF CH\u00c2TEAU DE LA TOURNETTE",
                "city": "NIVELLES",
                "email": "info@tournette.com",
                "website": "http:\/\/www.tournette.com"
            },
            {
                "id": "89",
                "title": "ROYAL WATERLOO GOLF CLUB",
                "city": "OHAIN",
                "email": "infos@golfwaterloo.be",
                "website": "http:\/\/www.royalwaterloogolfclub.be"
            },
            {
                "id": "90",
                "title": "BRUSSELS GOLF CLUB ",
                "city": "Brussels",
                "email": "info@brusselsgolfclub.com",
                "website": "http:\/\/www.brusselsgolfclub.com"
            }
        ]);
    }
})();