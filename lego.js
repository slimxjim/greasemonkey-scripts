// ==UserScript==
// @name         LEGO Background Image Extractor
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Extract and copy background image URLs from divs on LEGO building instructions pages
// @author       Your Name
// @match        https://www.lego.com/cs-cz/service/buildinginstructions/*
// @icon         https://assets.lego.com/logos/v4.5.0/brand-lego.svg
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
  'use strict';

  // Funkce pro hledání divů s background-image a logování výsledků
  function findAndLogDivs() {
      const divs = document.querySelectorAll('div[style*="background-image:"]');
      //console.log(`Found ${divs.length} div(s)`, divs);

      divs.forEach((div, index) => {
          const style = div.getAttribute('style');
          console.log('Style: ', style);
          const urlMatch = style.match(/background-image:\s*url\(["']?(.*?)["']?\)/);
          console.log('UrlMatcher = ', urlMatch);

          if (urlMatch && urlMatch[1]) {
              const imageUrl = urlMatch[1];
              console.log(`Div ${index + 1}: ${imageUrl}`);

              // Přidá událost na kliknutí pro zkopírování URL do schránky
              // Nahrazení alertu neblokující notifikací
              div.addEventListener('click', () => {
                  GM_setClipboard(imageUrl);
                  console.log(`Image URL copied to clipboard: ${imageUrl}`);
                  // Nepoužívej alert, který blokuje vlákno, ale nahraď ho například DOM elementem
                  const notification = document.createElement('div');
                  notification.textContent = `Image URL copied to clipboard: ${imageUrl}`;
                  notification.style.position = 'fixed';
                  notification.style.bottom = '10px';
                  notification.style.right = '10px';
                  notification.style.backgroundColor = '#4CAF50';
                  notification.style.color = 'white';
                  notification.style.padding = '10px';
                  document.body.appendChild(notification);
                  setTimeout(() => {
                      notification.remove();
                  }, 3000); // Notifikace zmizí po 3 vteřinách
              });
          }
      });
  }

  // Použití MutationObserver k čekání na dynamické změny v DOM
  const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
          findAndLogDivs();
      });
  });

  // Monitorování změn v celém těle stránky
  observer.observe(document.body, {
      childList: true,
      subtree: true
  });

  // Zajistí provedení při načtení stránky
  window.addEventListener('load', () => {
      findAndLogDivs();
  });
})();
