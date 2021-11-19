import type { NextPage } from 'next'
import { useEffect, useState, useRef } from 'react'

const Timer: NextPage = () => {
  const canvasRef = useRef(null);
  const [count, setCount] = useState(30);

  const getContext = (): CanvasRenderingContext2D => {
    const canvas: any = canvasRef.current;

    return canvas.getContext('2d');
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
      {/* <button id="pip-button" onClick="createVideo()">Picture in Picture</button> */}
    </>
  )
}

export default Timer