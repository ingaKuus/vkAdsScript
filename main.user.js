// ==UserScript==
// @name         VkAds_RIP
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
    console.log('=== start VkAds_RIP user script ===');

    // Переименовывание пункта меню "Мессенджер" в "Сообщения"
    let msgLine = document.getElementById('l_msg');
    if (msgLine) {
        msgLine = msgLine.getElementsByClassName("left_label")[0];

        if (msgLine) {
            msgLine.innerHTML = "Сообщения";
            console.log('messenger no more...');
        }
    }

    // Уничтожение пункта меню "VK Combo"
    /* let vkCombo = document.getElementById('l_combo');
    if (vkCombo) {
        vkCombo.remove();
        console.log('VK Combo removed');
    } */

    if (/https:\/\/vk.com/.test(w.location.href)) {
        // уничтожение рекламы под навигационным меню
        let ad = document.getElementById('ads_left');
        if (ad) {
            ad.style.position = 'absolute';
            ad.style.left = '-50vw';
            console.log('left side ads RIP');
        }

        // уничтожение рекламы в др. разделах
        killAds();
        setInterval(killAds, 1 * 1000);
    }


    function killAds() {
        let isCommunity = Boolean(document.getElementById('public') || document.getElementById('group'));

        // уничтожение рекламных постов, встроенных в ленту и в сообщества
        if (/https:\/\/vk.com\/feed/.test(w.location.href) || /https:\/\/vk.com\/al_feed.php/.test(w.location.href) || isCommunity) {
            let ads = Array.from(document.getElementsByClassName('_ads_block_data_w'));
            let groupRecommBlock = document.getElementsByClassName('feed_groups_recomm')[0];
            if (groupRecommBlock) ads.push(groupRecommBlock);

            if (ads.length) {
                ads.forEach(el => {
                    el.remove();
                });
                console.log('feed ad RIP');
            }

            // уничтожение небольшого блока рекламы справа от ленты
            if (/https:\/\/vk.com\/feed/.test(w.location.href) || /https:\/\/vk.com\/al_feed.php/.test(w.location.href)) {
                let sideAds = document.getElementById('feed_filters').children;
                if (sideAds.length > 1) {
                    Array.from(sideAds).forEach((el, n) => {
                        if (n) el.remove();
                    });
                    console.log('right side ads RIP');
                }
            }
        }

        // уничтожение приглашений на вк фест и предложений купить подписку на VK music во вкладке "аудиозаписи"
        if (/https:\/\/vk.com\/audio/.test(w.location.href)) {
            let ads = [document.getElementsByClassName('audio_promo')[0], document.getElementsByClassName('CatalogBlock__subscription_ru')[0]];

            ads.forEach(ad => {
                if (ad) {
                    ad.remove();
                    console.log('audio ad RIP');
                }
            });
        }

        // уничтожение списка рекомендумых сообществ во вкладке "сообщества"
        if (/https:\/\/vk.com\/groups/.test(w.location.href)) {
            let societiesBlock = document.getElementById('groups_filters_wrap');
            if (societiesBlock) {
                societiesBlock.remove();
                console.log('recommended societies list RIP');
            }
        }

        // Переименовывание браузерной вкладки "Мессенджер" в "Сообщения"
        if (/https:\/\/vk.com\/im/.test(w.location.href)){
            document.title = "Сообщения";
        }

        // Удаление блока с историями
        if (/https:\/\/vk.com\/feed/.test(w.location.href)) {
            let storiesBlock = document.getElementById('stories_feed_wrap');
            if (storiesBlock) {
                storiesBlock.remove();
                console.log('stories block RIP');
            }
        }

        // Удаление блока с клипами
        if (/https:\/\/vk.com\/feed/.test(w.location.href)) {
            let clipsBlock = document.getElementsByClassName('ShortVideoFeedBlock')[0];
            if (clipsBlock) {
                clipsBlock.remove();
                console.log('clips RIP');
            }
        }
    }
})();
