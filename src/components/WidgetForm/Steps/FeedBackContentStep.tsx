import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";

import { FeedbackType, feedbackTypes } from "..";
import { api } from "../../../lib/axios";
import { CloseButton } from "../CloseButton";
import { Loading } from "../Loading";
import { ScreenShotButton } from "../ScreenShotButton";

interface FeedBackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackSent: () => void;
  onRestartFeedBackRequest: () => void;
}

export function FeedBackContentStep({feedbackType, onFeedbackSent, onRestartFeedBackRequest}: FeedBackContentStepProps){
  
  const feedbackInfo = feedbackTypes[feedbackType];
  const [screenShot, setScreenShot] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  async function handleSubmitForm(event: FormEvent){
    event.preventDefault();
    
    setIsSendingFeedback(true);
    
    await api.post("/feedback", {
      type: feedbackType,
      comment,
      screenshot: screenShot,
    });

    setIsSendingFeedback(false);
    onFeedbackSent();
  }

  return (
    <>
      <header>
        <button 
        type="button" 
        className="top-5 left-5 absolute text-zinc-400 
        hover:text-zinc-100"title="Voltar para o formulário de feedback"
        onClick={onRestartFeedBackRequest}
        >
          <ArrowLeft weight="bold" className="w-4 h-4"/>
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img src={feedbackInfo.image.source} alt={feedbackInfo.image.alt} className="w-6 h-6"/>
          {feedbackInfo.title}
        </span>

        <CloseButton/>
      </header>

      <form className="my-4 w-full" onSubmit={handleSubmitForm}>
        <textarea
          onChange={(event) => setComment(event.target.value)}
          className="min-w-[304px] w-full h-64 min-h-[112px] text-sm p-4 
          placeholder-zinc-400 
          bg-transparent rounded-md 
          border-zinc-600
          focus:border-brand-500 focus:ring-1 
          focus:ring-brand-500 focus:outline-none resize-none
          scrollbar scrollbar-thumb-zinc-700
          scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte-nos com detalhes sobre o problema que você está enfrentando."
        />
        <footer className="flex mt-2 gap-2">
          
         <ScreenShotButton 
         screenShot={screenShot}
         onScreeShotTook={setScreenShot}/>

          <button
            disabled={comment.length === 0 || isSendingFeedback}
            className="p-2 bg-brand-500 rounded-md border-transparent flex flex-1 justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus-ring-brand-500 transition-colors disabled:opacity-50
            disabled:hover:bg-brand-500
            "
            type="submit"
          >
            {isSendingFeedback ? <Loading/> :'Enviar feedback'}
          </button>
        </footer>
      </form>
    </>
  )
}