import * as S from './Answer.style';
import ReactMarkdown from 'react-markdown';
import { renderers } from '../../utils/syntaxHighlighter';

type Props = {
  index: number;
  text: string;
  isSelected: boolean;
  round: number;
  setPlayerAnswer: (index: string) => void;
};

/** The Answer component that is used when a user is selecting an
 * answer in the trivia
 */
function Answer({ index, text, isSelected, round, setPlayerAnswer }: Props) {
  const handleChoice = (event: any) => {
    const choice = event.target.value;
    setPlayerAnswer(choice);
  };

  return (
    <S.Wrapper>
      <S.Input
        type="radio"
        id={`trivia-answer-${index}`}
        name={`trivia-answer-round-${round}}`}
        value={index}
        onChange={handleChoice}
        checked={isSelected}
      />
      <S.Label htmlFor={`trivia-answer-${index}`} isSelected={isSelected}>
        <S.Content>
          <S.Number>{index + 1}</S.Number>
          <ReactMarkdown renderers={renderers} children={text} />
        </S.Content>
      </S.Label>
    </S.Wrapper>
  );
}

export default Answer;
