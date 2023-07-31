// src/Chatbot.js
import React, { useState } from 'react';
import axios from 'axios';  
//Axios is a popular JavaScript library used for making HTTP requests to a server or an API. 
//It simplifies the process of sending and handling HTTP requests and responses. 
//Axios can be used with React to fetch data from a backend server or any external API.
import img1 from './computer.jpeg'

const Chatbot = () => {
  const [response, setResponse] = useState('');

  const handleButtonClick = async () => {
    try {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.onstart = () => {
        console.log('Speech Recognition started!');
      };

      recognition.onresult = async (event) => {
        console.log(event);
        const spokenWords = event.results[0][0].transcript.toLowerCase();
        console.log('Spoken words are', spokenWords);

        // const gptResponse = await fetchGptResponse(spokenWords);
        // setResponse(gptResponse);

        // computerSpeech(gptResponse);
        const gptResponse = determineWords(spokenWords);
        setResponse(gptResponse); // Set the response state with the spoken words
        computerSpeech(gptResponse); // Speak the words
      };

      recognition.start();
    } catch (error) {
      console.error('Error in speech recognition:', error);
    }
  };

  const computerSpeech = (words) => {
    const speech = new SpeechSynthesisUtterance();
    speech.lang = 'en-US';
    speech.pitch = 0.9;
    speech.volume = 1;
    speech.rate = 1;
    speech.text = words;

    window.speechSynthesis.speak(speech);
    return words;
  };

  function determineWords(words) {
    if (words.includes('hey') || words.includes('hello')) {
      return "Hello Boss, how are you?";
    } else if (words.includes('how are you')) {
      return "I am fine boss, tell me how can I help you?";
    } else if (words.includes('who are you')) {
      return "My name is Inertia, and I am a chatbot.";
    } else if (words.includes('open google')) {
      window.open("https://google.com", "_blank");
      return "Opening Google";
    } else if (words.includes('open instagram')) {
      window.open("https://instagram.com", "_blank");
      return "Opening Instagram";
    } else if (words.includes('what is') || words.includes('who is') || words.includes('what are')) {
      window.open(`https://www.google.com/search?q=${words.replace(" ", "+")}`, "_blank");
      return "This is what I found on the internet regarding " + words;
    } else if (words.includes('wikipedia')) {
      window.open(`https://en.wikipedia.org/wiki/${words.replace("wikipedia", "")}`, "_blank");
      return "This is what I found on Wikipedia regarding " + words;
    } else if (words.includes('time')) {
      const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
      return time;
    } else if (words.includes('date')) {
      const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
      return date;
    } else if (words.includes('calculator')) {
      window.open('Calculator:///');
      return "Opening Calculator";
    } else {
      console.log("error");
      return "Sorry, I couldn't understand that.";
    }
  }
  
  
//   async function fetchGptResponse(message) {
//     const response = await axios.post(
//       'https://api.openai.com/v1/engines/davinci-codex/completions',
//       {
//         prompt: message,
//         max_tokens: 50,
//         temperature: 0.7,
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': 'Bearer YOUR_OPENAI_API_KEY', // Replace with your API key
//         },
//       }
//     );
  
//     return response.data.choices[0].text;
//   }
  

//   const fetchGptResponse = async (message) => {
//     try {
//       const response = await axios.post(
//         'https://api.openai.com/v1/engines/davinci-codex/completions',
//         {
//           prompt: message,
//           max_tokens: 50,
//           temperature: 0.7,
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer YOUR_OPENAI_API_KEY', // Replace with your API key
//           },
//         }
//       );

//       return response.data.choices[0].text;
//     } catch (error) {
//       console.error('Error fetching GPT response:', error);
//       return 'Sorry, there was an error fetching the response.';
//     }
//   };

  return (
    <>
    <div>
      <img src={img1} alt="Computer" />
      <button onClick={handleButtonClick}>Let's talk!!</button>
      {<div>
      {response ? (
        <div>
          {/* Render the data when the Promise is resolved */}
          {response}
          {/* ... Other properties */}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>   
      
      
      /* {response && (
        <div>
          <h3>Generated Response:</h3>
          <p>{response}</p>
        </div>
      )} */
      
      }
    </div>
    </>
  );
};

export default Chatbot;
