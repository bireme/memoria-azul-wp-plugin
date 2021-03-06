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
    var json = [
                  {
                    "label": "Sobre",
                    "grouping": "[grouping]",
                    "isGrouping": true,
                    "isSubmenu": false,
                    "subLinks": [
                      {
                        "url": "http://sites.bvsalud.org/e-blueinfo/about-pt/",
                        "label": "Por que e-BlueInfo?",
                        "subLinks": []
                      },
                      {
                        "url": "http://sites.bvsalud.org/e-blueinfo/supporters-pt/",
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
                        "url": "http://sites.bvsalud.org/e-blueinfo/pdf-pt/",
                        "label": "Como melhorar a leitura dos arquivos PDF",
                        "subLinks": []
                      },
                      {
                        "url": "http://feedback.bireme.org/feedback/e-blueinfo?version=2.10-77&site=app&lang=pt",
                        "label": "Enviar comentário",
                        "subLinks": []
                      },
                      {
                        "url": "http://feedback.bireme.org/feedback/e-blueinfo?version=2.10-77&error=1&site=app&lang=pt",
                        "label": "Comunicar erro",
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
                        "url": "http://sites.bvsalud.org/e-blueinfo/pt/app?fcl=true",
                        "label": "Português",
                        "subLinks": []
                      },
                      {
                        "url": "http://sites.bvsalud.org/e-blueinfo/es/app?fcl=true",
                        "label": "Español",
                        "subLinks": []
                      },
                      {
                        "url": "http://sites.bvsalud.org/e-blueinfo/app?fcl=true",
                        "label": "English",
                        "subLinks": []
                      }
                    ]
                  },
                  {
                    "url": "http://sites.bvsalud.org/e-blueinfo/pt/app/country",
                    "label": "Alterar País",
                    "subLinks": []
                  }
                ];

    var items = JSON.stringify(json);

    window.location.href='gonative://sidebar/setItems?items=' + encodeURIComponent(items);
  }
});
