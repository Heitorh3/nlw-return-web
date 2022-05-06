import { useState } from "react";
import { Camera, Trash } from "phosphor-react";
import { Loading } from "./Loading";

import ReactTooltip from "react-tooltip";

import html2canvas from "html2canvas";

interface ScreenShotButtonProps {
  screenShot: string | null;
  onScreeShotTook: (screenshot: string | null) => void;
}

export function ScreenShotButton({ screenShot, onScreeShotTook }: ScreenShotButtonProps) {
  const [isTakingScreeShot, setIsTakingScreeShot] = useState(false);

  async function handleTakeScreenShot() {
    setIsTakingScreeShot(true);

    const cavas = await html2canvas(document.querySelector("html")!);
    const base64Image = cavas.toDataURL("image/png");
    onScreeShotTook(base64Image);

    setIsTakingScreeShot(false);
  }

  if (screenShot) {
    return (
      <>     
      <button
        data-tip
        data-for='screenShot'     
        type="button"
        onClick={() => onScreeShotTook(null)}
        className="p-1 w-10 h-10 rounded-md border-transition flex justify-end items-center text-zinc-400 hover:text-zinc-100 transition-colors"
        style={
          {
            backgroundImage: `url(${screenShot})`,
            backgroundPosition: 'right bottom',
            backgroundSize: 180
          }
        }
      >
        <Trash weight="fill" />
      </button>
      <ReactTooltip id='screenShot' type='info' effect="float">
        <span>Tire uma foto da sua tela</span>
      </ReactTooltip>
      </>
    )
  }
  return (
    <button
      type="button"
      onClick={handleTakeScreenShot}
      className="p-2 bg-zinc-800 rounded-md border hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus-ring-brand-500 ">
      {isTakingScreeShot ? <Loading /> : <Camera className="w-6 h-6" />}
    </button>
  )
}