import { useState } from "react";

import bug from "../../assets/bug.svg";
import idea from "../../assets/idea.svg";
import thought from "../../assets/thought.svg";
import { FeedBackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedBackContentStep } from "./Steps/FeedBackContentStep";
import { FeedBackSuccessStep } from "./Steps/FeedBackSuccessStep";

export const feedbackTypes = {

  BUG: {
    "title": "Problema",
    image: {
      source: bug,
      alt: 'Imagem de um inseto'
    }
  },

  IDEA: {
    "title": "Ideia",
    image: {
      source: idea,
      alt: 'Imagem de lampada'
    }
  },

  OTHER: {
    title: "Outro",
    image: {
      source: thought,
      alt: 'Imagem de uma nuvem de pensamento'
    }
  }
}

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleRestartFeedBack() {
    setFeedbackSent(false);
    setFeedbackType(null);
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">

      {feedbackSent ? (
        <FeedBackSuccessStep onRestartFeedBackRequest={handleRestartFeedBack}/>
        ) : (
          <>
            {!feedbackType ?
              <FeedBackTypeStep onFeedbackTypeChanged={setFeedbackType} />
              :
              <FeedBackContentStep
                feedbackType={feedbackType}
                onFeedbackSent={() => setFeedbackSent(true)}
                onRestartFeedBackRequest={handleRestartFeedBack} />
            }

          </>
        )
      }

      <footer className="text-xs text-neutral-400">
        Feito com ♥ pela <a className="underline underline-offset-2" href="http://rocketseat.com.br">Rocketseat</a>
      </footer>
    </div>
  )
}