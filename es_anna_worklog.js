// ==UserScript==
// @name         ES Anna WorkLOG
// @namespace    http://gk-software.com/
// @version      0.1
// @description  Modify the default behavior: From date = 01, To date = current day + adds the column for convert time into the ##h ##min
// @author       jmusilek
// @match        https://anna.gk-software.com/index.php/controlling/jira/person-view
// @grant        none
// @icon         https://anna.gk-software.com/templates/wt_business_free2/favicon.ico
// ==/UserScript==

(function() {
  'use strict';

  // 1. Změna třídy divu
  const div = document.querySelector('.toggle_div_container.closed');
  if (div) {
      div.classList.remove('closed');
      div.classList.add('opened');
  }

  // <input type="button" onclick="jQuery(this).closest('form').submit();" class="pull-right  btn-info btn fabrik_filter_submit button" value="Go">
  const button = document.querySelector('input[type="button"].fabrik_filter_submit');

  // 2. Nastavení dnešního data ve formátu měsíc.den.rok
  // <input type="text" name="pt___to" id="pt___to_cal" value="31.10.2024" class="inputbox fabrik_filter input-small " size="0" maxlength="19">
  const input = document.querySelector('#pt___to_cal');
  if (input) {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0'); // Měsíce jsou indexovány od 0
      const year = today.getFullYear();
      const formattedDate = `${day}.${month}.${year}`;

      // Nastavení dnešního data jako value do inputu
      console.log("input.value", input.value);
      if (input.value !== formattedDate) {
        input.value = formattedDate;

        // 3. Automatické odeslání formuláře kliknutím na tlačítko "Go"
        if (button) {
            button.click();
        }

      }
  }
  //<input type="text" name="pt___from" id="pt___from_cal" value="14.10.2024" class="inputbox fabrik_filter input-small " size="0" maxlength="19">
  const inputFrom = document.querySelector('#pt___from_cal');
  if (input) {
      const today = new Date();
      const day = String(1).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0'); // Měsíce jsou indexovány od 0
      const year = today.getFullYear();
      const formattedDate = `${day}.${month}.${year}`;

      // Nastavení dnešního data jako value do inputu
      console.log("inputFrom.value", inputFrom.value);
      if (inputFrom.value !== formattedDate) {
        inputFrom.value = formattedDate;

        // 3. Automatické odeslání formuláře kliknutím na tlačítko "Go"
        if (button) {
          button.click();
      }
      }
  }

  // 4. Změna nadpisu <h1> a přidání červeného textu
  const heading = document.querySelector('h1');
  if (heading && heading.textContent.includes("JIRA worklogs overview - person")) {
      heading.innerHTML += ' - <span style="color:red;">Tampermonkey® (edited)</span>';
  }

  // 5. Přidání sloupce s převodem času do hodin a minut
  function convertTimeToHoursMinutes(timeString) {
    const match = timeString.match(/([+-]?\d+(\.\d+)?)h/);
    if (!match) return null;

    const timeInDecimal = parseFloat(match[1]);
    const sign = timeInDecimal < 0 ? "-" : "";
    const hours = Math.floor(Math.abs(timeInDecimal));
    const minutes = Math.round((Math.abs(timeInDecimal) - hours) * 60);
    
    return `${sign}${hours}h ${minutes}m`;
  } 

  const table = document.querySelector('.table-condensed tbody');
  if (table) {
      // Pro každý řádek s časem přidáme nový sloupec s převedeným časem
      Array.from(table.querySelectorAll('tr')).forEach(row => {
          const tdTime = row.querySelector('td:nth-child(2)');
          if (tdTime) {
              const timeString = tdTime.textContent.trim();
              const convertedTime = convertTimeToHoursMinutes(timeString);
              if (convertedTime) {
                  const newTd = document.createElement('td');
                  newTd.textContent = convertedTime;
                  row.appendChild(newTd); // Přidání nového sloupce
              }
          }
      });
  }

})();
