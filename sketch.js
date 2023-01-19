console.log('sketch here!');

function setup() {
    if(document.cookie.split('; ').find((row) => row.startsWith('isSketching='))?.split('=')[1] === 'true') {
        document.getElementById('stop_sketch').hidden = false;
        document.getElementById('start_sketch').hidden = true;
    } else {
        document.cookie = "isSketching=false; path=/";
    }

    document.getElementById('start_sketch').addEventListener('click', function() {
        console.log('Btn clicked!');
        let params = {
            active: true,
            currentWindow: true
        }
        chrome.tabs.query(params, gotTabs);
        const cookieValue = document.cookie
            .split('; ')
            .find((row) => row.startsWith('isSketching='))
            ?.split('=')[1];
        console.log(cookieValue);
        document.cookie = "isSketching=true";
        document.getElementById('start_sketch').hidden = true;
        document.getElementById('stop_sketch').hidden = false;

        function gotTabs(tabs) {
            let msg = {
                text: "start"
            }
            chrome.tabs.sendMessage(tabs[0].id, msg);
        }
    });

    document.getElementById('stop_sketch').addEventListener('click', function() {
        console.log('Stop Btn clicked!');
        if (window.p5 && window.p5.instance) {
            window.p5.instance.remove();
            window.p5.instance = window.setup = window.draw = null;
        }
        let params = {
            active: true,
            currentWindow: true
        }
        chrome.tabs.query(params, gotTabs);
        document.cookie = "isSketching=false";
        document.getElementById('start_sketch').hidden = false;
        document.getElementById('stop_sketch').hidden = true;

        function gotTabs(tabs) {
            let msg = {
                text: "stop"
            }
            chrome.tabs.sendMessage(tabs[0].id, msg);
        }
    });
}
