// ==UserScript==
// @name         Novinky Reklama
// @namespace     https://novinky.cz
// @include       https://*novinky.cz/*
// @include       https://*seznamzpravy.cz/*
// @include       https://*idnes.cz/*
// @include       https://www.idnes.cz/zpravy/*
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://codepen.io/jkasun/pen/QrLjXP
// @icon         https://www.google.com/s2/favicons?sz=64&domain=codepen.io
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

const DEBUG = false;

GM_addStyle ( `

.dynamic_banner {
  display: none; !important
}

.jebuReklamu {
  z-index: 2147483647;
  background-color: #ffffff;
  border: 1px solid #d3d3d3;
  text-align: center;
  min-height: 80px;
  min-width: 80px;
  width: 980px;
  height: 600px;
  max-height: 1800px;
  max-width: 1920px;
}

/*Drgable */

.jebuReklamu {
  position: absolute;
  /*resize: both; !*enable this to css resize*! */
  overflow: auto;
}

.jebuReklamu-header {
  padding: 10px;
  cursor: move;
  z-index: 10;
  background-color: #bfddf5;
  color: black;
}

/*Resizeable*/

.jebuReklamu .resizer-right {
  width: 5px;
  height: 100%;
  background: transparent;
  position: absolute;
  right: 0;
  bottom: 0;
  cursor: e-resize;
}

.jebuReklamu .resizer-bottom {
  width: 100%;
  height: 5px;
  background: transparent;
  position: absolute;
  right: 0;
  bottom: 0;
  cursor: n-resize;
}

.jebuReklamu .resizer-both {
  width: 5px;
  height: 5px;
  background: transparent;
  z-index: 10;
  position: absolute;
  right: 0;
  bottom: 0;
  cursor: nw-resize;
}

/*NOSELECT*/

.jebuReklamu * {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}
` );

window.onload = function() {
  initDragElement();
  initResizeElement();
};

function initDragElement() {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  var jebuReklamus = document.getElementsByClassName("jebuReklamu");
  var elmnt = null;
  var currentZIndex = 100; //TODO reset z index when a threshold is passed

  for (var i = 0; i < jebuReklamus.length; i++) {
    var jebuReklamu = jebuReklamus[i];
    var header = getHeader(jebuReklamu);

    jebuReklamu.onmousedown = function() {
      this.style.zIndex = "" + ++currentZIndex;
    };

    if (header) {
      header.parentjebuReklamu = jebuReklamu;
      header.onmousedown = dragMouseDown;
    }
  }

  function dragMouseDown(e) {
    elmnt = this.parentjebuReklamu;
    elmnt.style.zIndex = "" + ++currentZIndex;

    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    if (!elmnt) {
      return;
    }

    e = e || window.event;
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }

  function getHeader(element) {
    var headerItems = element.getElementsByClassName("jebuReklamu-header");

    if (headerItems.length === 1) {
      return headerItems[0];
    }

    return null;
  }
}

function initResizeElement() {
  var jebuReklamus = document.getElementsByClassName("jebuReklamu");
  var element = null;
  var startX, startY, startWidth, startHeight;

  for (var i = 0; i < jebuReklamus.length; i++) {
    var p = jebuReklamus[i];

    var right = document.createElement("div");
    right.className = "resizer-right";
    p.appendChild(right);
    right.addEventListener("mousedown", initDrag, false);
    right.parentjebuReklamu = p;

    var bottom = document.createElement("div");
    bottom.className = "resizer-bottom";
    p.appendChild(bottom);
    bottom.addEventListener("mousedown", initDrag, false);
    bottom.parentjebuReklamu = p;

    var both = document.createElement("div");
    both.className = "resizer-both";
    p.appendChild(both);
    both.addEventListener("mousedown", initDrag, false);
    both.parentjebuReklamu = p;
  }

  function initDrag(e) {
    element = this.parentjebuReklamu;

    startX = e.clientX;
    startY = e.clientY;
    startWidth = parseInt(
      document.defaultView.getComputedStyle(element).width,
      10
    );
    startHeight = parseInt(
      document.defaultView.getComputedStyle(element).height,
      10
    );
    document.documentElement.addEventListener("mousemove", doDrag, false);
    document.documentElement.addEventListener("mouseup", stopDrag, false);
  }

  function doDrag(e) {
    element.style.width = startWidth + e.clientX - startX + "px";
    element.style.height = startHeight + e.clientY - startY + "px";
  }

  function stopDrag() {
    document.documentElement.removeEventListener("mousemove", doDrag, false);
    document.documentElement.removeEventListener("mouseup", stopDrag, false);
  }
}

function log(msg) {
    console.log('JebuReklamu: ' + msg);
}

function log_debug(msg) {
    if (DEBUG) {
        log('DEBUG' + msg);
    }
}


function isHostName(hostNameIncludes) {
    // Získání hostitelského názvu
    var hostName = window.location.hostname;
    log('hostName = ' + hostName);

    // Kontrola, zda hostName obsahuje "idnes.cz"
    if (hostName.includes(hostNameIncludes)) {
        // Vypsání zprávy do konzole, pokud hostName obsahuje "idnes.cz"
        log('hostName includes ' + hostNameIncludes);
        return true;
    } else {
        // Jinak vypsání obecné zprávy do konzole
        log_debug('Not inclueds ' + hostNameIncludes);
        return false;
    }
}

// COPY STYLE --------------------
// Funkce pro kopírování CSS stylů
function copyStyles(sourceElement, targetElement) {
    // Získání vypočtených stylů z prvního elementu
    log("COPY style elements");
    var computedStyles = window.getComputedStyle(sourceElement);

    // Nastavení stylů na druhý element
    for (var i = 0; i < computedStyles.length; i++) {
        var styleName = computedStyles[i];
        var styleValue = computedStyles.getPropertyValue(styleName);
        targetElement.style.setProperty(styleName, styleValue);
    }

    document.body.appendChild(jebuReklamuDivHtmlElement);
    sourceElement.appendChild (jebuReklamuDivHtmlElement);
}

// Funkce, která se spustí po načtení všech dynamických prvků stránky
function handlePageLoadCopy(sourceElement) {
    // Přidání nového elementu do DOM
    document.body.appendChild(jebuReklamuDivHtmlElement);

    // Kopírování CSS stylů ze zdrojového elementu na nový element
    copyStyles(sourceElement, jebuReklamuDivHtmlElement);

    // Provádějte další akce s novým elementem
    console.log('Nový element s kopírovanými styly:', jebuReklamuDivHtmlElement);
}


//////////////////////////////////////////
var jebuReklamuDivHtmlElement         = document.createElement ('div');
jebuReklamuDivHtmlElement.innerHTML   = '             \
                             <div class="jebuReklamu">                                              \
                                 <div class="jebuReklamu-header noselect">Click here to move</div>    \
                                 <br /><p>JEBU REKLAMU</p><br />                                                     \
                             </div>                                                           \
    ';
///////////////////////////////////

// NOVINKY ----------------------------------
function jebuNovinky() {
    console.log('Jebu NOVINKY...');
    document.body.appendChild (jebuReklamuDivHtmlElement);
}

// IDNES -----------------------------------------
function jebuIdnes() {
    'use strict';

    const mark = ' [IDNES] ';
    const logi = (msg) => log(mark + msg);
    logi('Jebu IDNES...');


    // Funkce, která se spustí po načtení všech dynamických prvků stránky
    function handlePageLoad() {
        // Získání prvního elementu <htbabblef>
        var htbabblefElement = document.querySelector('htbabblef');
        hideElement(logi, htbabblefElement, 'htbabblef');

        var PrGboVdyQ = document.getElementsByClassName('PrGboVdyQ');
        hideElement(logi, PrGboVdyQ, 'PrGboVdyQ');

        //var r_leaderboardrub = document.getElementsById('r-leaderboardrub');
        //hideElement(logi, r_leaderboardrub, 'r-leaderboardrub');

        //var cto_banner_content = document.getElementsById('cto_banner_content');
        //hideElement(logi, cto_banner_content, 'cto_banner_content');

        //var space_g_add = document.getElementsById('space-g-add');
        //hideElement(logi, space_g_add, 'space-g-add');

        var divElementHeight1500px = document.getElementsByClassName('col-b');
        logi("divElementHeight1500px ================ 1 " );
        console.log(divElementHeight1500px);
        if (divElementHeight1500px) {
            // Provádějte další akce s htbabblefElement
            logi('Element <divElementHeight1500px> nalezen:', divElementHeight1500px);
            copyStyles(divElementHeight1500px, jebuReklamuDivHtmlElement);
        }
        else {
            logi(" NOOOOOOOOOOOOOOOOOOOOOOOOOO ");
        }
        hideElement(logi, divElementHeight1500px, 'divElementHeight1500px');

    }
     var divElementHeight1500px = document.querySelector('div[style="height: 1500px;"]');
        logi("divElementHeight1500px ================ 2 " );

    // Přidání posluchače události pro DOMContentLoaded
    document.addEventListener('DOMContentLoaded', handlePageLoad);
}

function hideElement(logger, element, elementName) {
    logger(elementName + ' = ' + element);
    // Kontrola, zda element existuje
    if (element) {
        // Provádějte další akce s htbabblefElement
        logger('Element <'+elementName+'> nalezen:', element);

        //element.setAttribute('style', 'height: 10px !important; display: none;');;
        //element.style.visibility = 'hidden';

    } else {
        logger('Element <'+elementName+'> nenalezen.');
    }
}
///////////////////////////////////////////////////////

if (isHostName("idnes.cz")) {
    document.addEventListener('DOMContentLoaded', function() {document.body.appendChild(jebuReklamuDivHtmlElement);});
    jebuIdnes();
}

if (isHostName("novinky.cz")) {
    jebuNovinky();
}



