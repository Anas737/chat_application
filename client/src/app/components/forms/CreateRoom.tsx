import React from "react";
import Modal from "../Modal";

interface CreateRoomProps {
  createRoom: (roomName: string) => void;
  closeCreateRoom: () => void;
}

const CreateRoom: React.FC<CreateRoomProps> = ({
  createRoom,
  closeCreateRoom,
}) => {
  const [roomName, setRoomName] = React.useState("");

  const handleOnChange = React.useCallback((e) => {
    setRoomName(e.target.value);
  }, []);

  const handleOnSubmit = React.useCallback(
    (e) => {
      e.preventDefault();

      if (roomName.trim() !== "") {
        createRoom(roomName);

        closeCreateRoom();
      }
    },
    [createRoom, roomName, closeCreateRoom]
  );

  return (
    <Modal closeModal={closeCreateRoom}>
      <div className="from__container">
        <form className="form">
          <div className="form-group">
            <label className="form-group__label" htmlFor="room-name">
              Room name
            </label>
            <input
              className="from-group__input"
              id="room-name"
              type="text"
              onChange={handleOnChange}
            />
          </div>

          <button
            className="form__submit-btn"
            onClick={(e) => handleOnSubmit(e)}
          >
            Create !
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default CreateRoom;
