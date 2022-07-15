// Selectors 
// Выбирает query для iframe в зависимости от mod (mod зависит от устройства iOS или Любое другое)
function get_query_by_mod (mod = 'default') {
	
	switch (mod = 'default') {
		
		case 'iOS':
			var query = '?autohide=1&rel=0&showinfo=0&ref=0&hd=1';
			break;
		
		default:
			var query = '?autohide=1&rel=0&showinfo=0&ref=0&enablejsapi=1&html5=1&hd=1&autoplay=1';
	}
	
	return query
}


// Ищет "видео" 
function findVideos() {
	
    let videos = document.querySelectorAll('.video');

    for (let i = 0; i < videos.length; i++) {
        setupVideo(videos[i]);
    }
}

function setupVideo(video) {

    let link = video.querySelector('.video__link');
    let media = video.querySelector('.video__media');
    let button = video.querySelector('.video__button');
    // let id = parseMediaURL(media);
    let id = parseLinkMediaURL(link);


	// Исключение для iOS: Типо кликаем сразу на все видео
	if (youtube_mod === 'iOS') {
		
		 handle_click_by_video (id, link, button, video)
	}


	// Обработчик клика по видео - кнопки Play: 
    video.addEventListener('click', () => {
    	
        let iframe = createIframe(id);

        link.remove();
        button.remove();
        video.appendChild(iframe);
        
        
        playerIframe = video.querySelector('iframe')


	    // Навешивает обработчик по ID для поллера
		addYoutubeEventListener(playerIframe, function() {});

    });

    link.removeAttribute('href');
    video.classList.add('video--enabled');
}

// Парсилка с регуляркой для выяснения ID видео из ссылки на картинку
function parseMediaURL(media) {
	
    let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
    let url = media.src;
    let match = url.match(regexp);

    return match[1];
}

// Парсилка с регуляркой для выяснения ID видео из ссылки
function parseLinkMediaURL(link) {

    // let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
    let regexp = /https:\/\/youtu\.be\/([a-zA-Z0-9_-]+)/i;
    let url = link.href;
    let match = url.match(regexp);

    return match[1];
}

// Создаёт реальный iFrame с ютуба
function createIframe(id) {
    let iframe = document.createElement('iframe');

    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'autoplay');
    iframe.setAttribute('src', generateURL(id));
    iframe.classList.add('video__media');

    return iframe;
}

// Генерирует адрес iFrame по ID видео 
function generateURL(id) {
	
    let query = get_query_by_mod (mod = youtube_mod);

    return 'https://www.youtube.com/embed/' + id + query;
}


// Определяет iOS устройство, что бы сделать исключение 
// https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
function is_iOS() {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform)
  // iPad on iOS 13 detection
  || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

// Виртуальный клик по видео для исключения на iOS
function handle_click_by_video (id, link, button, video) {
	
    let iframe = createIframe(id);

    link.remove();
    button.remove();
    video.appendChild(iframe);
    
    
    playerIframe = video.querySelector('iframe')
}


// main.js

var youtube_mod = 'default'
if ( is_iOS () ) {
	
	youtube_mod = 'iOS'
}

findVideos();


// polling.js Поллит сообщения от ютуба

// https://stackoverflow.com/questions/24621475/youtube-api-iframe-onstatechange-events
var addYoutubeEventListener = (function() {

    var callbacks = [];
    var iframeId = 0;

    return function (iframe, callback) {
    	
    	var flag = false

        // init message listener that will receive messages from youtube iframes
        if(iframeId === 0) {
        	
            window.addEventListener("message", function (e) {

                if(e.origin !== "https://www.youtube.com" || e.data === undefined) return;
                try {
                    var data = JSON.parse(e.data);

		            if(data.event !== 'onReady'){
		            	
		            	if (!flag) {
		            		
		            		console.log('onReady')
		            		iframe.contentWindow.postMessage('{"event": "command", "func": "playVideo", "args": ""}', "*")
		            	}
		            	flag = true
		            }
                    if(data.event !== 'onStateChange') return;

                    //var callback = callbacks[data.id];
                    // callback(data);
                }
                catch(e) {}
            });
        }

        // store callback
        iframeId++;
        callbacks[iframeId] = callback;
        var currentFrameId = iframeId;

        
		// Poller повторить с интервалом 250 мс
		var timerId = setInterval(() => {
			// console.log('tick')
			handleMessage (currentFrameId, iframe, flag)
			
			
			if (flag) {
				
				clearInterval(timerId)
			}
		}, 250);
		
		// остановить вывод через 25 секунд
		setTimeout(() => {
			
			if (!flag) {
				
				clearInterval (timerId)
			}
		}, 25000);
    }
})();

function handleMessage (iframeId, iframe, flag) {
	
    var currentFrameId = iframeId;
    	
    var message = JSON.stringify({
        event: 'listening',
        id: currentFrameId,
        channel: 'widget'
    });
    
    
    // Пытается отправлять 'listening' пока флаг не поднимется 
    if (!flag) {
    	
    	iframe.contentWindow.postMessage(message, 'https://www.youtube.com');
    }
    
}
