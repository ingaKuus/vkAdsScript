// ==UserScript==
// @name         fukVkAds
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  hides ads on VK.com
// @author       theUniverse
// @match        https://vk.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let w = window;
    console.log('=== start fukVkAds user script ===');

    // Переименовывание пункта меню "Мессенджер" в "Сообщения"
    let msgLine = document.getElementById('l_msg');
    if (msgLine) {
        msgLine = msgLine.getElementsByClassName("left_label")[0];

        if (msgLine) {
            msgLine.innerHTML = "Сообщения";
            console.log('messenger no more...');
        }
    }

    if (/https:\/\/vk.com/.test(w.location.href)) {
        // убийство рекламы под навигационным меню
        let ad = document.getElementById('ads_left');
        if (ad) {
            ad.style.position = 'absolute';
            ad.style.left = '-50vw';
            console.log('FUKK ADDDSSSS!!!!!');
        }

        // убийство рекламы в др. разделах
        killAds();
        setInterval(killAds, 1 * 1000);
    }

    function killAds() {
        let isCommunity = Boolean(document.getElementById('public') || document.getElementById('group'));

        // убийство рекламных постов, встроенных в ленту и в сообщества
        if (/https:\/\/vk.com\/feed/.test(w.location.href) || isCommunity) {
            let ads = Array.from(document.getElementsByClassName('_ads_block_data_w'));
            let groupRecommBlock = document.getElementsByClassName('feed_groups_recomm')[0];
            if (groupRecommBlock) ads.push(groupRecommBlock);

            if (ads.length) {
                ads.forEach(el => {
                    el.remove();
                });
                console.log('feed ad has been KILLED!!!');
            }

            // убийство небольшого блока рекламы справа от ленты
            if (/https:\/\/vk.com\/feed/.test(w.location.href)) {
                let sideAds = document.getElementById('feed_filters').children;
                if (sideAds.length > 1) {
                    Array.from(sideAds).forEach((el, n) => {
                        if (n) el.remove();
                    });
                    console.log('right side ads have been DESTROYED!!!');
                }
            }
        }

        // убийство приглашений на вк фест и предложений купить подписку на VK music во вкладке "аудиозаписи"
        if (/https:\/\/vk.com\/audios/.test(w.location.href)) {
            let ads = [document.getElementsByClassName('audio_promo')[0], document.getElementsByClassName('CatalogBlock__subscription')[0]];

            ads.forEach(ad => {
                if (ad) {
                    ad.remove();
                    console.log('audio ad has been BRUTALLY MURDERED!!');
                }
            });
        }

        // убийство списка рекомендумых сообществ во вкладке "сообщества"
        if (/https:\/\/vk.com\/groups/.test(w.location.href)) {
            let societies = document.getElementById('groups_filters_wrap');
            if (societies) {
                societies.remove();
                console.log('recommended societies list has been GRINDED!!!');
            }
        }

        // Переименовывание браузерной вкладки "Мессенджер" в "Сообщения"
        if (/https:\/\/vk.com\/im/.test(w.location.href)){
            document.title = "Сообщения";
        }
    }
    // update test final
})();
