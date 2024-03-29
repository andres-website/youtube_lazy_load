Русский | [English](https://github.com/andres-website/youtube_lazy_load/blob/master/README-en_EN.md)


# Youtube Lazy Load
Лениво загружает ресурсы ютуба и воспроизводит видео по щелчку на любых платформах (для iOS не лениво).


## Demo
https://andres-website.github.io/youtube_lazy_load



## Чем лучше подобных?
* Воспроизводит видео по (!) одному щелчку на любых платформах (Десктоп браузеры, браузеры на iOS и Android).
* Не тянет [API ютуба](https://developers.google.com/youtube/iframe_api_reference?hl=ru) (~160 Кб) для воспроизведения по щелчку в браузерах Android. Использует только необходимую часть API для поллинга и получения сообщений ([cross-window-communication](https://learn.javascript.ru/cross-window-communication)). 


## Как воспроизводит после клика в браузерах на iOS
К сожалению, не нашёл способа воспроизводить лениво. Поэтому, по стратегии данного скрипта, для iOS никакой линивой загрузки. Если устройство на iOS - грузим iFrame как обычно. 

Главное, что не будет хуже, чем могло бы быть. По мне, лучше загрузить как обычно, чем заставлять нажимать кнопку плэй дважды.


## Спасибо
[Вадиму Макееву](https://vk.com/pepelsbey) из [Web-стандартов](https://web-standards.ru/) и [HTML-академии](https://htmlacademy.ru/). Большая часть работы сделана и объясненна им на пальцах в данном [видео](https://youtu.be/4JS70KB9GS0). Данный проект это форк без форка.
