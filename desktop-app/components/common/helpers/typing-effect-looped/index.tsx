import TypistLoop from "react-typist-loop";
import Typist from "react-typist";

type TypingEffectLoopedProps = {
  words: string[];
  className?: string;
};

function TypingEffectLooped({
  words,
  className = ""
}: TypingEffectLoopedProps) {
  return (
    <TypistLoop interval={0}>
      {words.map((text) => (
        <Typist className={className} key={text} cursor={{ show: false }}>
          {text}
          <Typist.Backspace count={text.length} delay={3000} />
        </Typist>
      ))}
    </TypistLoop>
  );
}

export { TypingEffectLooped };
