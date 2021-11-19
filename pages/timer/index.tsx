import type { NextPage } from 'next'
import { useEffect, useState, useRef } from 'react'

const Timer: NextPage = () => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);

  const [count, setCount] = useState(30);

  const getContext = (): CanvasRenderingContext2D => {
    const canvas: HTMLCanvasElement = canvasRef.current;

    return canvas.getContext('2d');
  }

  async function createVideo() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    video.srcObject = canvas.captureStream();
    video.play();
  }

  const handleVideoEvent = (e: any) => {
    e.target.requestPictureInPicture();
  }

  useEffect(() => {
    const ctx: CanvasRenderingContext2D = getContext();
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