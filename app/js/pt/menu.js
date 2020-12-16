function is_webview () {
    var userAgent = navigator.userAgent.toLowerCase(),
    wv = /wv/.test( userAgent ),
    safari = /safari/.test( userAgent ),
    ios = /iphone|ipod|ipad|macintosh/.test( userAgent );

    if ( ios ) {
        if ( safari ) {
            return false;
        } else {
            return true;
        }
    } else {
        if ( wv ) {
            return true;
        } else {
            return false;
        }
    }
}

$(function () {
  if ( is_webview() ) {
    var site = "https://e-blueinfo.bvsalud.org";
    var app_site = "http://sites.bvsalud.org/e-blueinfo";
    var country = $.cookie("e-blueinfo-country");
    var userData = $.cookie("userData");
    var json = [
                  {
                    "url": app_site + "pt/app",
                    "label": "Conteúdos",
                    "subLinks": []
                  },
                  {
                    "label": "Sobre",
                    "grouping": "[grouping]",
                    "isGrouping": true,
                    "isSubmenu": false,
                    "subLinks": [
                      {
                        "url": site + "/por-que-e-blueinfo/",
                        "label": "Por que e-BlueInfo?",
                        "subLinks": []
                      },
                      {
                        "url": site + "/apoiadores-institucionais/",
                        "label": "Apoiadores Institucionais",
                        "subLinks": []
                      }
                    ]
                  },
                  {
                    "label": "Ajuda",
                    "grouping": "[grouping]",
                    "isGrouping": true,
                    "isSubmenu": false,
                    "subLinks": [
                      {
                        "url": app_site + "pt/app/contact",
                        "label": "Contato",
                        "subLinks": []
                      },
                      {
                        "url": site + "/tutoriais/",
                        "label": "Tutorial",
                        "subLinks": []
                      }
                    ]
                  },
                  {
                    "label": "Idioma",
                    "grouping": "[grouping]",
                    "isGrouping": true,
                    "isSubmenu": false,
                    "subLinks": [
                      {
                        "url": app_site + "/pt/app?fcl=true",
                        "label": "Português",
                        "subLinks": []
                      },
                      {
                        "url": app_site + "/es/app?fcl=true",
                        "label": "Español",
                        "subLinks": []
                      },
                      {
                        "url": app_site + "/app?fcl=true",
                        "label": "English",
                        "subLinks": []
                      }
                    ]
                  }
                ];

    var cc = eblueinfo_script_vars.cc;
    var c_name = {
      "BR": "Brasil",
      "SV": "El Salvador",
      "GT": "Guatemala",
      "PE": "Peru"
    };
    var c_pages = {
      "BR": site + '/dados-do-brazil/',
      "SV": site + '/dados-de-el-salvador/',
      "GT": site + '/dados-da-guatemala/',
      "PE": site + '/dados-do-peru/'
    };

    if ( 'oc' == country ) {
      var _json = [
                    {
                      "url": app_site + "pt/app/country",
                      "label": "País",
                      "subLinks": []
                    }
                  ];
    } else {
      if ( userData ) {
        _app_site = app_site.replace(/\/?$/, '/');
        var _json = [
                      {
                        "url": "https://platserv.bvsalud.org/client/controller/logout/control/business/origin/"+btoa(_app_site),
                        "label": "Logout",
                        "subLinks": []
                      },
                      {
                        "url": app_site + "pt/app/favorites",
                        "label": "Favoritos",
                        "subLinks": []
                      },
                      {
                        "url": app_site + "pt/app/visited",
                        "label": "Visitados",
                        "subLinks": []
                      },
                      {
                        "label": "País (" + c_name[cc] + ")",
                        "grouping": "[grouping]",
                        "isGrouping": true,
                        "isSubmenu": false,
                        "subLinks": [
                          {
                            "url": c_pages[cc],
                            "label": "Saiba mais",
                            "subLinks": []
                          },
                          {
                            "url": app_site + "pt/app/country",
                            "label": "Alterar país",
                            "subLinks": []
                          }
                        ]
                      }
                    ];
      } else {
        var _json = [
                      {
                        "url": app_site + "pt/app/auth",
                        "label": "Login",
                        "subLinks": []
                      },
                      {
                        "label": "País (" + c_name[cc] + ")",
                        "grouping": "[grouping]",
                        "isGrouping": true,
                        "isSubmenu": false,
                        "subLinks": [
                          {
                            "url": c_pages[cc],
                            "label": "Saiba mais",
                            "subLinks": []
                          },
                          {
                            "url": app_site + "pt/app/country",
                            "label": "Alterar país",
                            "subLinks": []
                          }
                        ]
                      }
                    ];
      }
    }

    _json = _json.concat(json);

    var items = JSON.stringify(_json);

    window.location.href='gonative://sidebar/setItems?items=' + encodeURIComponent(items);
  }
});
