// ==UserScript==
// @name         YT buttons removal
// @namespace    http://tampermonkey.net/
// @version      1.00
// @description  This is for removal of buttons in the right side of controls in video player
// @author       You
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==


(function() {
    'use strict';
const targetSelectors = [
    '.ytp-pip-button',
    '.ytp-miniplayer-button',
    '.ytp-size-button',
    '.ytp-autonav-toggle-button-container',
    '.ytp-right-controls',
  ];

  const observerConfig = {
    childList: true,
    subtree: true
  };

  const targetNode = document.body;

  const waitForElements = () => {
    const elementsLoaded = targetSelectors.every(selector =>
      document.querySelector(selector)
    );
    if (elementsLoaded) {
      observer.observe(targetNode, observerConfig);
      waitObserver.disconnect();
    }
  };

  const waitObserver = new MutationObserver(waitForElements);
  waitObserver.observe(targetNode, observerConfig);

  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes && mutation.addedNodes.length > 0) {
        const pipBtnContainer = document.querySelector(".ytp-pip-button");
        const miniplayerBtnContainer = document.querySelector(".ytp-miniplayer-button");
        const theaterModeBtnContainer = document.querySelector(".ytp-size-button");
        const autoPlayBtnContainer = document.querySelector(".ytp-autonav-toggle-button-container").parentElement;
        const rightControls = document.querySelector(".ytp-right-controls");
        if (autoPlayBtnContainer && pipBtnContainer) {
          rightControls.removeChild(autoPlayBtnContainer);
          rightControls.removeChild(pipBtnContainer);
          rightControls.removeChild(miniplayerBtnContainer);
          rightControls.removeChild(theaterModeBtnContainer);
          console.log("%cButtons are removed", "font-weight:bold;");
          observer.disconnect();
        }
      }
    });
  });


})();
