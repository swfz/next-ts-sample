import type { NextPage } from 'next'
import { useEffect, useState, useRef } from 'react'

interface formValues {
  min: number;
  sec: number;
}
const Timer: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [count, setCount] = useState(0);
  const [formValue, setFormValue] = useState<formValues>({min: 0, sec: 0})

  const getContext = (): CanvasRenderingContext2D|null => {
    const canvas = canvasRef.current;

    return canvas ? canvas.getContext('2d') : null;
  }

  async function createVideo() {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if(canvas && video) {
      video.srcObject = canvas.captureStream();
      video.play();
    }
  }

  const handleVideoEvent = (e: any) => {
    e.target.requestPictureInPicture();
  }

  const handleMinChange = (e: any) => {
    setFormValue(prev => {
      return {...prev, min: parseInt(e.target.value)}
    });
  }
  const handleSecChange = (e: any) => {
    setFormValue(prev => {
      return {...prev, sec: parseInt(e.target.value)}
    });
  }

  const startTimer = () => {
    const count = formValue.min * 60 + formValue.sec;
    setCount(count);
  }

  const writeToCanvas = (ctx: CanvasRenderingContext2D, value: string) => {
    const width = 300;
    const height = 100;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#999999';
    ctx.fillText(value, 50, 50);
  }

  const formatTime = (count: number) => {
    const min = Math.floor(count / 60);
    const sec = count % 60;

    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  }

  useEffect(() => {
    const ctx: CanvasRenderingContext2D|null = getContext();

    if (!ctx) {return};
    if (count === 0) {return};

    writeToCanvas(ctx, formatTime(count));

    const interval = setInterval(() => {
      setCount(c => c - 1);
      writeToCanvas(ctx, formatTime(count));
    }, 1000);

    return () => clearInterval(interval)
  }, [count])

  return(
    <>
      <span>Picture in Picture Timer</span>
      <div id="timer">
        <canvas id="canvas" width="300" height="100" ref={canvasRef}></canvas>
      </div>
      <div>
        <span>Min: </span>
        <input type="text" value={formValue.min} onChange={handleMinChange} name="minutes"></input>
      </div>
      <div>
        <span>Sec: </span>
        <input type="text" value={formValue.sec} onChange={handleSecChange} name="seconds"></input>
      </div>
      <button onClick={startTimer}>Start Timer</button>
      <button onClick={createVideo}>Picture in Picture</button>
      <video muted={true} onLoadedMetadata={handleVideoEvent} ref={videoRef} className="hide"></video>
    </>
  )
}

export default Timer