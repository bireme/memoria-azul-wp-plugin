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
                    "url": app_site + "/app",
                    "label": "Contents",
                    "subLinks": []
                  },
                  {
                    "label": "About",
                    "grouping": "[grouping]",
                    "isGrouping": true,
                    "isSubmenu": false,
                    "subLinks": [
                      {
                        "url": site + "/en/why-e-blueinfo/",
                        "label": "Why e-BlueInfo?",
                        "subLinks": []
                      },
                      {
                        "url": site + "/en/institutional-supporters/",
                        "label": "Institutional Supporters",
                        "subLinks": []
                      }
                    ]
                  },
                  {
                    "label": "Help",
                    "grouping": "[grouping]",
                    "isGrouping": true,
                    "isSubmenu": false,
                    "subLinks": [
                      {
                        "url": "https://bvsalud.org/contact_us/",
                        "label": "Contact",
                        "subLinks": []
                      },
                      {
                        "url": site + "/en/tutorials/",
                        "label": "Tutorial",
                        "subLinks": []
                      }
                    ]
                  },
                  {
                    "label": "Language",
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
      "BR": "Brazil",
      "SV": "El Salvador",
      "GT": "Guatemala",
      "PE": "Peru"
    };
    var c_pages = {
      "BR": site + '/en/data-from-brazil/',
      "SV": site + '/en/data-from-el-salvador/',
      "GT": site + '/en/data-from-guatemala/',
      "PE": site + '/en/data-from-peru/'
    };

    if ( 'oc' == country ) {
      var _json = [
                    {
                      "url": app_site + "/app/country",
                      "label": "Country",
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
                        "url": app_site + "/app/favorites",
                        "label": "Favorites",
                        "subLinks": []
                      },
                      {
                        "url": app_site + "/app/visited",
                        "label": "Visited",
                        "subLinks": []
                      },
                      {
                        "label": "Country (" + c_name[cc] + ")",
                        "grouping": "[grouping]",
                        "isGrouping": true,
                        "isSubmenu": false,
                        "subLinks": [
                          {
                            "url": c_pages[cc],
                            "label": "See more",
                            "subLinks": []
                          },
                          {
                            "url": app_site + "/app/country",
                            "label": "Change country",
                            "subLinks": []
                          }
                        ]
                      }
                    ];
      } else {
        var _json = [
                      {
                        "url": app_site + "/app/auth",
                        "label": "Login",
                        "subLinks": []
                      },
                      {
                        "label": "Country (" + c_name[cc] + ")",
                        "grouping": "[grouping]",
                        "isGrouping": true,
                        "isSubmenu": false,
                        "subLinks": [
                          {
                            "url": c_pages[cc],
                            "label": "See more",
                            "subLinks": []
                          },
                          {
                            "url": app_site + "/app/country",
                            "label": "Change country",
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
