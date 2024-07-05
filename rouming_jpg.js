// ==UserScript==
// @name         Control JPGs - styling
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Opens link with text "&gt;&gt;" using the right arrow key.
// @author       You
// @match        https://www.rouming.cz/roumingShow.php*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=rouming.cz
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // identifying the Control panels (should be two of them)
    let controls = document.getElementsByClassName('control');
    if (controls && controls.length === 3) {
        console.log('Found Two control panels');
        controls[0].setAttribute('id', 'control-panel-up');
        controls[1].setAttribute('id', 'control-panel-down');
    }
    else {
        console.log('Not found expected control panels, found: ', controls ?? controls.length);
    }

    // identifying the tables
    let tables = document.querySelectorAll('table');
    console.log('Tables found: ', tables ?? tables.length);
    if (tables) {
        tables[1].setAttribute('id', 'table-comments');
        console.log('Identified tables: ', tables[0], tables[1]);
    }

    // move comments from wrapper -> sidebar
    let middle = document.querySelector('.middle');
    console.log('Middle:', middle);
    let sidebar = document.querySelector('.sidebar');
    if (middle && sidebar) {
        console.log('Found middle and sidebar:', middle, sidebar);
        let middleComments = document.getElementById('table-comments');
        if (middleComments) {
            console.log('Found middleComment:', middleComments);
            sidebar.appendChild(middleComments);
        }
    }

    // Video element max height:
    // window.onload = function() {
    //     let video = document.getElementById('video');
    //     if (video) {
    //         video.style.maxHeight = '750px';
    //         video.style.maxWidth = '900px';
    //         video.loop = false;
    //     }
    // };

    // Find wrapper
    let roumingListDiv = document.querySelector('.roumingList');
    let wrapper = document.querySelector('.wrapper');
    let adDiv = document.querySelector('div[style="display:inline-block;width:728px;height:90px"]');
    let sidebarDiv = document.querySelector('.sidebar.w300');
    let sidebarW300  = document.querySelector('.sidebar.w300');

    if (adDiv) {
        adDiv.style.display = 'none';
    }
    else {
        console.log('adDiv not found:', adDiv);
    }

    if(roumingListDiv) {
        roumingListDiv.style.display = 'flex';
        roumingListDiv.style.flexDirection = 'row';
        roumingListDiv.style.alignItems = 'flex-start';
        roumingListDiv.style.justifyContent = 'flex-start';
    }
    else {
        console.log('.roumingListDiv not found:', roumingListDiv);
    }

    if (wrapper && sidebarDiv) {
        // Apply flexbox styles
        // wrapper.style.display = 'flex';
        // wrapper.style.flexDirection = 'row';
        wrapper.style.maxWidth = '900px';
        
        sidebarDiv.style.flex = '0 0 300px'; // Fixed width for sidebar
        sidebarDiv.style.marginLeft = 'auto'; // Push sidebar to the right
    } else {
        console.log('.Wrapper or .sidebar not found:', wrapper, sidebarDiv);
    }
    if (sidebarW300 ) {
        console.log('sidebarW300  found:', sidebarW300 );
        sidebarW300.style.setProperty('min-width', 'initial', 'important');
        sidebarW300.style.setProperty('width', 'initial', 'important');
        sidebarW300.style.setProperty('max-width', 'initial', 'important');
        sidebarW300.style.setProperty('margin-left', '20px', 'important');
        sidebarW300.style.setProperty('margin-top', '20px', 'important');
    }
    else {
        console.log('.sidebarW300  not found:', sidebarW300 );
    }

    // Find all links on the page
    let imgs = document.querySelectorAll('img');

    // Iterate through each link
    imgs.forEach(function(img) {
        console.log(img);
        // If the link contains the text "&gt;&gt;"
        if (img.style.height === 'auto' && img.style.maxWidth === '100%') { // ('height: auto; max-width: 100%;')
            console.log('Found:', img);
            img.style.maxHeight = '750px';
            img.style.maxWidth = '900px';
            img.style.height = null;
        }
    });

})();
