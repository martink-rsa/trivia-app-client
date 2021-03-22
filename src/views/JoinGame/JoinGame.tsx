import {
  useState,
  useEffect,
  FormEvent,
  Dispatch,
  SetStateAction,
} from 'react';

import ViewWrapper from '../../components/ViewWrapper/ViewWrapper';
import MainContainer from '../../components/MainContainer/MainContainer';
import PlayerSelector from '../../components/PlayerSelector/PlayerSelector';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

import Logo from '../../assets/images/logo-white.png';

type Props = {
  handleJoin: (
    name: string,
    room: string,
    iconId: number,
    colorId: number,
  ) => void;
  iconId: number;
  setIconId: Dispatch<SetStateAction<number>>;
  colorId: number;
  setColorId: Dispatch<SetStateAction<number>>;
  setCurrentPlayerName: Dispatch<SetStateAction<string>>;
};

function JoinGame({
  handleJoin,
  iconId,
  setIconId,
  colorId,
  setColorId,
  setCurrentPlayerName,
}: Props) {
  /** The name of the player */
  const [playerName, setPlayerName] = useState('');

  /** The room the player will join */
  const [room, setRoom] = useState('');

  /**
   * Validates and sets the players name from an HTML input.
   * @param event The Input element event
   */
  const changePlayerName = (event: FormEvent<HTMLInputElement>): void => {
    const { value } = event.currentTarget as HTMLInputElement;
    if (value.match(/^[A-Za-z0-9]+$/) && value.length < 16) {
      setPlayerName(value.toUpperCase());
    }
    if (value === '') {
      setPlayerName('');
    }
  };

  /**
   * Validates and sets the room to play in from an HTML input.
   * @param event The Input element event
   */
  const changeRoom = (event: FormEvent<HTMLInputElement>): void => {
    const { value } = event.currentTarget as HTMLInputElement;
    if (value.match(/^[A-Za-z0-9]+$/) && value.length < 16) {
      setRoom(value.toUpperCase());
    }
    if (value === '') {
      setRoom('');
    }
  };

  /**
   * Submits the user's details
   * @param event The Form event
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    handleJoin(playerName, room, iconId, colorId);
  };

  useEffect(() => {
    // Resetting the player's name when they are back on the Join view
    setCurrentPlayerName('');
  }, [setCurrentPlayerName]);

  return (
    <ViewWrapper backgroundColor="primary">
      <MainContainer>
        <img src={Logo} alt="Trivia App Logo" />
      </MainContainer>
      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          name="name"
          id="name"
          required
          onChange={changePlayerName}
          value={playerName}
          placeholder="YOURNAME"
        />
        <Input
          label="Room"
          name="room"
          id="room"
          required
          onChange={changeRoom}
          value={room}
          placeholder="ROOMNAME"
        />
        <PlayerSelector
          iconId={iconId}
          setIconId={setIconId}
          colorId={colorId}
          setColorId={setColorId}
        />
        <Button type="submit" invert fullWidth>
          JOIN
        </Button>
      </form>
    </ViewWrapper>
  );
}

export default JoinGame;
