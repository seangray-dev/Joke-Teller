const button = document.querySelector('#btn');
const audioElement = document.querySelector('#audio');
const apiKey = 'c4379a9b92284551a774ec1aa383dd7a';

// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Pass Joke to VoiceRSS API
function tellMe(joke) {    
    VoiceRSS.speech({
        key: apiKey,
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Joke API
 async function getJokes() {
    let joke = ''; 
    const apiUrl = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=racist';

    try {
        const response = await fetch (apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup}...${data.delivery}`
        } else {
            joke = data.joke;
        }
        // Text-To-Speech
        tellMe(joke);
        // Disbale Button 
        toggleButton();
    } catch (error) {
        // Catch Errors Here
        console.log('whoops', error);
    }
}

// Event Listner Functions
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton); 



