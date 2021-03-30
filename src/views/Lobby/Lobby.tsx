import { useState, ChangeEvent, FormEvent } from 'react';
import * as S from './Lobby.style';

import ViewWrapper from '../../components/ViewWrapper/ViewWrapper';
import MainContainer from '../../components/MainContainer/MainContainer';
import PlayerDisplay from '../../components/PlayerDisplay/PlayerDisplay';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

import Player from '../../shared/Player';

type Props = {
  players: Player[];
  topics: any;
  currentPlayerName: string;
  onSubmit: (
    selectedTopic: string,
    numberQuestions: number,
    questionsDuration: number,
  ) => void;
};

/** The Lobby screen that shows all the players and leads
 * to the main game
 */
function Lobby({ players, topics, currentPlayerName, onSubmit }: Props) {
  const [topicSelected, setTopicSelected] = useState(topics[0].id);
  const [numQuestions, setNumQuestions] = useState(3);
  const [questionsDuration, setQuestionsDuration] = useState(5);

  /**
   * Submits the user's details
   * @param event The Form event
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onSubmit(topicSelected, numQuestions, questionsDuration);
  };

  /**
   * Changes the number of questions for the Trivia
   * @param event Mouse event on the element
   */
  const changeNumQuestions = (event: ChangeEvent<HTMLInputElement>) => {
    setNumQuestions(parseInt(event.currentTarget.value, 10));
  };

  /**
   * Changes the duration of a question for the Trivia
   * @param event Mouse event on the element
   */
  const changeQuestionsDuration = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionsDuration(parseInt(event.currentTarget.value, 10));
  };

  /**
   * Changes the topic selected for the Trivia
   * @param event Mouse event on the element
   */
  const changeTopics = (event: any) => {
    setTopicSelected(event.currentTarget.value);
  };

  const isAdmin = players.find(
    (player: Player) => player.username === currentPlayerName,
  )?.isAdmin;

  return (
    <ViewWrapper>
      <MainContainer>
        <S.PlayersList>
          {players.map((player) => (
            <PlayerDisplay key={player.username} player={player} />
          ))}
        </S.PlayersList>
      </MainContainer>
      {isAdmin && (
        <form onSubmit={handleSubmit}>
          <div>
            <S.ControlsContainer>
              <S.ControlContainer>
                <Input
                  label="Number of Questions:"
                  styleType="border"
                  type="number"
                  id="numQuestions"
                  name="numQuestions"
                  min="1"
                  max="50"
                  value={numQuestions}
                  onChange={changeNumQuestions}
                />
              </S.ControlContainer>
              <S.ControlContainer>
                <Input
                  label="Question duration:"
                  styleType="border"
                  type="number"
                  id="questionsDuration"
                  name="questionsDuration"
                  min="1"
                  max="20"
                  value={questionsDuration}
                  onChange={changeQuestionsDuration}
                />
              </S.ControlContainer>
            </S.ControlsContainer>
            <label htmlFor="topic">Topic:</label>
            <S.Select onChange={changeTopics} value={topicSelected}>
              {topics.map((topic: any) => (
                <option key={topic.id} id="topic" value={topic.id}>
                  {topic.title}
                </option>
              ))}
            </S.Select>
          </div>
          <Button type="submit" fullWidth>
            START
          </Button>
        </form>
      )}
    </ViewWrapper>
  );
}

export default Lobby;
