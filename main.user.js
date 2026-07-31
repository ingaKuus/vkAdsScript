// ==UserScript==
// @name         VkAds_RIP
// @namespace    http://tampermonkey.net/
// @version      1.3.6
// @description  hides ads on vk.ru
// @author       theUniverse
// @match        https://vk.ru/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const w = window;
    console.log('=== start VkAds_RIP user script ===');

    // уничтожение рекламы под навигационным меню
    const ad = document.getElementById('ads_left');
    if (ad) {
        ad.style.position = 'absolute';
        ad.style.left = '-50vw';
        console.log('left side ads RIP');
    }

    // уничтожение рекламы в др. разделах
    killAds();
    setInterval(killAds, 1 * 1000);


    function killAds() {
        const isCommunity = Boolean(document.getElementById('public') || document.getElementById('group'));

        // уничтожение рекламных постов, встроенных в ленту и в сообщества
        if (/https:\/\/vk.ru\/feed/.test(w.location.href) || /https:\/\/vk.ru\/al_feed.php/.test(w.location.href) || isCommunity) {
            const ads = Array.from(document.getElementsByClassName('_ads_block_data_w'));
            const newAd = document.getElementsByClassName('mark_top_verified')[1];
            if (newAd) ads.push(newAd);

            // удаление рекомендации сообществ в ленте
            const groupRecommBlock = document.getElementsByClassName('feed_groups_recomm')[0];
            if (groupRecommBlock) ads.push(groupRecommBlock);
            // удаление рекомендации друзей в ленте
            const friendsRecommBlock = document.getElementById('friends_right_blocks_root');
            if (friendsRecommBlock) ads.push(friendsRecommBlock);
            // удаление рекомендации товаров в ленте
            const marketRecommBlock = document.getElementsByClassName('MarketItemsFeedBlock')[0];
            if (marketRecommBlock) ads.push(marketRecommBlock);

            // уничтожение небольшого блока рекламы справа от ленты
            if (/https:\/\/vk.ru\/feed/.test(w.location.href) || /https:\/\/vk.ru\/al_feed.php/.test(w.location.href)) {
                const sideAds = document.getElementsByClassName('apps_feedRightAppsBlock');
                if (sideAds.length) {
                    Array.from(sideAds).forEach(el => {
                        if (el) el.remove();
                    });
                    console.log('right side ads RIP');
                }
            }

            if (ads.length) {
                ads.forEach(el => {
                    el.remove();
                });
                console.log('feed ad RIP');
            }
        }

        // уничтожение приглашений на вк фест и предложений купить подписку на VK music во вкладке "аудиозаписи"
        if (/https:\/\/vk.ru\/audio/.test(w.location.href)) {
            const ads = [document.getElementsByClassName('audio_promo')[0], document.getElementsByClassName('CatalogBlock__subscription_ru')[0]];

            ads.forEach(ad => {
                if (ad) {
                    ad.remove();
                    console.log('audio ad RIP');
                }
            });
        }

        // уничтожение списка рекомендумых сообществ во вкладке "сообщества"
        if (/https:\/\/vk.ru\/groups/.test(w.location.href)) {
            const societiesBlock = document.getElementById('groups_filters_wrap');
            if (societiesBlock) {
                societiesBlock.remove();
                console.log('recommended societies list RIP');
            }
        }

        // Удаление блока с историями
        if (/https:\/\/vk.ru\/feed/.test(w.location.href)) {
            const storiesBlock = document.getElementById('stories_feed_wrap');
            if (storiesBlock) {
                storiesBlock.remove();
                console.log('stories block RIP');
            }
        }

        // Удаление блока с клипами
        if (/https:\/\/vk.ru\/feed/.test(w.location.href)) {
            const clipsBlock = document.getElementsByClassName('ShortVideoFeedBlock')[0];
            if (clipsBlock) {
                clipsBlock.remove();
                console.log('clips RIP');
            }
        }

        // Удаление блока быстрых чатов в правом нижнем углу
        const fastChatBlock = document.getElementById('fastchat-reforged');
        if (fastChatBlock) {
            fastChatBlock.remove();
            console.log('fast chat block RIP');
        }
    }
})();
