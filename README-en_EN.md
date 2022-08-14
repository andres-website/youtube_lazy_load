[Русский](https://github.com/andres-website/youtube_lazy_load/blob/main/README.md) | English


# Youtube Lazy Load
Lazy loading resurses YouTube and playing video by click on any platforms (for iOS not lazy)


## Demo
https://andres-website.github.io/youtube_lazy_load


## What is better than similar ones?

* Playing video by (!) first click on any platforms (Desktop browsers, mobile browsers on iOS and Android).

* Does not pull the [YouTube API](https://developers.google.com/youtube/iframe_api_reference?hl=ru) (~160 Kb) for playing by click in Android browsers. Uses only the necesary part of the API for polling and reciving messages ([cross-window-communication](https://learn.javascript.ru/cross-window-communication))..


## Как воспроизводит после клика в браузерах на iOS

К сожалению, не нашёл способа воспроизводить лениво. Поэтому, по стратегии данного скрипта, для iOS никакой линивой загрузки. Если устройство на iOS - грузим iFrame как обычно. 

Главное, что не будет хуже, чем могло бы быть. По мне, лучше загрузить как обычно, чем заставлять нажимать кнопку плэй дважды.


## Спасибо

[Вадиму Макееву](https://vk.com/pepelsbey) из [Web-стандартов](https://web-standards.ru/) и [HTML-академии](https://htmlacademy.ru/). Большая часть работы сделана и объясненна им на пальцах в данном [видео](https://youtu.be/4JS70KB9GS0). Данный проект это форк без форка.
