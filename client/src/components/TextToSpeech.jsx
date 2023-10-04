import React, { useState, useEffect } from "react";
import {AiOutlinePlayCircle, AiOutlinePauseCircle} from 'react-icons/ai'
import {RxResume} from 'react-icons/rx'
import {FiStopCircle} from 'react-icons/fi'
const TextToSpeech = ({ text }) => {
  const [isPaused, setIsPaused] = useState(true);
  const [utterance, setUtterance] = useState(null);
  const [voice, setVoice] = useState(null);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [speech, setSpeech] = useState(null)


  useEffect(() => {
    const u = new SpeechSynthesisUtterance(text);
    setUtterance(u);
    const synth = window.speechSynthesis;
    setSpeech(synth)
    // Add an event listener to the speechSynthesis object to listen for the voiceschanged event
    synth.addEventListener("voiceschanged", () => {
      const voices = synth?.getVoices();
      setVoice(voices[0]);
    });

    return () => {
      synth.cancel();
      synth.removeEventListener("voiceschanged", () => {
        setVoice(null);
      });
    };
  }, [text]);

  const handlePlay = () => {

    if (!isPaused) {
      speech.resume();
    } else {
      utterance.voice = voice;
      utterance.pitch = pitch;
      utterance.rate = rate;
      utterance.volume = volume;
      speech.speak(utterance);
    }

    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
    speech.pause();
  };

  const handleStop = () => {
    setIsPaused(false);
    speech.cancel();
  };

  const handleVoiceChange = (event) => {
    const voices = speech?.getVoices();
    setVoice(voices.find((v) => v.name === event.target.value));
  };

  const handlePitchChange = (event) => {
    setPitch(parseFloat(event.target.value));
  };

  const handleRateChange = (event) => {
    setRate(parseFloat(event.target.value));
  };

  const handleVolumeChange = (event) => {
    setVolume(parseFloat(event.target.value));
  };

  return (
    <div className="flex flex-col justify-center items-center md:gap-y-3 gap-y-2">
      <label>

        <select value={voice?.name} onChange={handleVoiceChange}>
          {speech?.getVoices().map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name}
            </option>
          ))}
        </select>
      </label>

      

<div className="md:flex md:flex-row gap-x-3  flex-col">



      <label className="flex items-center gap-x-2">
        Pitch:
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={pitch}
          onChange={handlePitchChange}
          />
      </label>

          
      

      <label className="flex items-center gap-x-2">
        Speed:
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={rate}
          onChange={handleRateChange}
        />
      </label>
      
      <label className="flex items-center gap-x-2">
        Volume:
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
        />
      </label>


      </div>


<div className="">

{
  isPaused ? <button onClick={handlePlay}><AiOutlinePlayCircle className="text-4xl"/></button> : <button onClick={handlePause}><AiOutlinePauseCircle className="text-4xl"/></button>
}

  </div>

 

 {/* <div className="flex  gap-x-3">
 <button onClick={handlePlay}>Play</button>
 <button onClick={handlePause}>Pause</button> 
 </div> */}
{/* <div className="flex gap-x-3 text-2xl">

      <button onClick={handlePlay}>{isPaused ? <RxResume />: <AiOutlinePlayCircle />}</button>
      <button onClick={handlePause}><AiOutlinePauseCircle/></button>
      <button onClick={handleStop}><FiStopCircle/></button>
</div> */}
    </div>
  );
};

export default TextToSpeech;
