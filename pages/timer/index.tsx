import type { NextPage } from 'next'
import { useEffect, useState, useRef } from 'react'

const Timer: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [count, setCount] = useState(30);

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

  useEffect(() => {
    const ctx: CanvasRenderingContext2D|null = getContext();

    if (!ctx) {return};

    ctx.clearRect(0, 0, 300, 100);
    ctx.fillStyle = '#999999';
    ctx.fillText(count.toString(), 50, 50);

    const interval = setInterval(() => {
      setCount(c => c - 1);
      ctx.clearRect(0, 0, 300, 100);
      ctx.fillStyle = '#999999';
      ctx.fillText(count.toString(), 50, 50);
    }, 1000);

    return () => clearInterval(interval)
  }, [count])

  return(
    <>
      <span>Picture in Picture Timer</span>
      <div id="timer">
        <canvas id="canvas" width="300" height="100" ref={canvasRef}></canvas>
      </div>
      {/* <button id="start-timer" onClick="timerFn()">Start Timer</button> */}
      <button onClick={createVideo}>Picture in Picture</button>
      <video muted={true} onLoadedMetadata={handleVideoEvent} ref={videoRef} className="hide"></video>
    </>
  )
}

export default Timer