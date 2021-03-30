import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

// Views
import JoinGame from '../../views/JoinGame/JoinGame';
import Lobby from '../../views/Lobby/Lobby';
import Game from '../../views/Game/Game';
import Waiting from '../../views/Waiting/Waiting';
import Score from '../../views/Score/Score';

import Player from '../../shared/Player';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { mockPlayersInProgress, mockScore } from '../../mockData/mockData';

const SERVER = process.env.REACT_APP_SERVER_URL || 'http://localhost:3001';

let socket: any;

enum GameStates {
  'JOIN' = 'JOIN',
  'LOBBY' = 'LOBBY',
  'GAME' = 'GAME',
  'WAITING' = 'WAITING',
  'SCORE' = 'SCORE',
}

type QuestionItem = {
  text: string;
};
type AnswerItem = {
  text: string;
};

type Question = {
  questionNumber: number;
  question: QuestionItem;
  answers: AnswerItem[];
  questionDuration: number;
};

function App() {
  const [currentPlayerName, setCurrentPlayerName] = useState('');

  /** The state of the game that determines what view/screen to be showing */
  const [gameState, setGameState] = useState<GameStates>(GameStates.JOIN);

  /** A list of topics that is available to choose from */
  const [topics, setTopics] = useState([]);

  /** Players that are in the room which is used to display a player list */
  const [players, setPlayers] = useState<Player[]>([]);

  /** The index used for the icon the player chose */
  const [iconId, setIconId] = useState(0);

  /** The color used for the icon the player chose */
  const [colorId, setColorId] = useState(0);

  /** A question that is sent from the backend and is used for the trivia */
  const [question, setQuestion] = useState<Question | null>(null);

  /** Players that are still answering Trivia questions */
  const [playersInProgress, setPlayersInProgress] = useState([]);

  /** End score for all players */
  const [score, setScore] = useState([]);

  useEffect(() => {
    // All socket events are handled here instead of splitting them into each
    //    component otherwise it is hard to keep track of each of the events
    socket = io(SERVER);
    socket.on('userConnected', (data: any) => {
      console.log(data);
    });
    socket.on('roomMessage', (data: any) => {
      console.log(data);
    });
    socket.on('updateGameState', (data: GameStates) => {
      handleGameState(data);
    });
    socket.on('updateTopics', (data: any) => {
      setTopics(data);
    });
    socket.on('updatePlayers', (data: any) => {
      setPlayers(data);
    });
    socket.on('updateQuestion', (data: any) => {
      setQuestion(data);
    });
    socket.on('updatePlayersInProgress', (data: any) => {
      setPlayersInProgress(data);
    });
    socket.on('updateScore', (data: any) => {
      setScore(data);
    });
    socket.on('testMsg', (data: any) => {
      console.log(data);
    });
  }, []);

  /**
   * Used to trigger the game from the lobby
   * @param selectedTopic The topic for the questions
   * @param numberQuestions Number of questions for the trivia
   * @param questionsDuration The duration for the timer for each question
   * @param subject The subject/scope of the questions e.g. javascript
   */
  const triggerGameStart = (
    selectedTopic: string,
    numberQuestions: number,
    questionsDuration: number,
  ) => {
    socket.emit(
      'gameStart',
      { selectedTopic, numberQuestions, questionsDuration },
      (callback: any) => {
        console.log('Callback: gameStart - ', callback);
      },
    );
  };

  /**
   * Handles updating the game state, typically when emitted by the server
   * @param data
   */
  const handleGameState = (newGameState: any) => {
    setGameState(newGameState);
  };

  /**
   * Submits the player's answer to the server for the server to check
   * if correct
   * @param index
   */
  const submitAnswer = (index: any) => {
    socket.emit('playerAnswer', { index }, (callback: any) => {
      //
    });
  };

  /**
   * Attempts to have the player join a room which will only be allowed
   * if conditions are met e.g. name not taken
   * @param username
   * @param room
   */
  const attemptJoin = async (
    username: string,
    room: string,
    iconId: number,
    colorId: number,
  ) => {
    socket.emit(
      'attemptJoin',
      { username, room, iconId, colorId },
      (response: any) => {
        if (response.status === 200) {
          setCurrentPlayerName(username);
        }
      },
    );
  };

  const handleMainMenu = () => {
    socket.emit('backToJoinGame', (callback: any) => {
      console.log('Callback: backToJoinGame', callback);
    });
  };

  if (gameState === GameStates.JOIN) {
    return (
      <JoinGame
        handleJoin={attemptJoin}
        iconId={iconId}
        setIconId={setIconId}
        colorId={colorId}
        setColorId={setColorId}
        setCurrentPlayerName={setCurrentPlayerName}
      />
    );
  } else if (gameState === GameStates.LOBBY) {
    return (
      <Lobby
        players={players}
        onSubmit={triggerGameStart}
        currentPlayerName={currentPlayerName}
        topics={topics}
      />
    );
  } else if (gameState === GameStates.GAME) {
    return <Game question={question} submitAnswer={submitAnswer} />;
  } else if (gameState === GameStates.WAITING) {
    return <Waiting playersInProgress={playersInProgress} />;
  } else if (gameState === GameStates.SCORE) {
    return <Score scores={score} onSubmit={handleMainMenu} />;
  } else {
    return <div>else returned</div>;
  }
}

export default App;
