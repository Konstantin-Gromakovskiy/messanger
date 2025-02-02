import { Button, Modal, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { closeModal, setCurrentChannelId } from '../redux/store/uiSlice.js';
import { useAddChannelMutation, useRemoveChannelMutation } from '../redux/store/channelsApi.js';

const ModalWindow = () => {
  const dispatch = useDispatch();
  const { modal, currentChannelId, defaultChannelId } = useSelector((state) => state.ui);
  const { isOpen, type, extra } = modal;
  const [currentInput, setCurrentInput] = useState('');
  const [addChannelMutation] = useAddChannelMutation();
  const [removeChannelMutation] = useRemoveChannelMutation();

  if (!isOpen) return null;

  const sendChannel = async (e) => {
    e.preventDefault();
    try {
      dispatch(closeModal());
      const response = await addChannelMutation(currentInput);
      dispatch(setCurrentChannelId(response.data.id));
      setCurrentInput('');
    } catch (error) {
      console.log(error);
    }
  };
  const deleteChannel = async (e) => {
    e.preventDefault();
    try {
      dispatch(closeModal());
      const response = await removeChannelMutation(extra.channelId);
      if (response.data.id === currentChannelId) dispatch(setCurrentChannelId(defaultChannelId));
    } catch (error) {
      console.log(error);
    }
  };

  // TODO отрефакторить типы инпутов
  const addChannel = {
    modalTitle: 'Добавить канал',
    modalBody: (
      <Form onSubmit={sendChannel}>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            onChange={(e) => setCurrentInput(e.target.value)}
            value={currentInput}
            className="mb-2"
            type="text"
          />
          <Form.Label className="visually-hidden">Имя канала</Form.Label>
          <div className="d-flex justify-content-end">
            <Button onClick={() => dispatch(closeModal())} variant="secondary" className="me-2" type="submit">Отменить</Button>
            <Button variant="primary" type="submit">Отправить</Button>
          </div>
        </Form.Group>
      </Form>
    ),
  };

  const renameChannel = {
    modalTitle: 'Редактировать канал',
    modalBody: (
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Control onChange={setCurrentInput} value={currentInput} className="mb-2" type="text" />
          <Form.Label className="visually-hidden">Имя канала</Form.Label>
          <div className="d-flex justify-content-end">
            <Button onClick={() => dispatch(closeModal())} variant="secondary" className="me-2" type="submit">Отменить</Button>
            <Button variant="primary" type="submit">Отправить</Button>
          </div>
        </Form.Group>
      </Form>
    ),
  };

  const removeChannel = {
    modalTitle: 'Удалить канал',
    modalBody: (
      <>
        <p className="lead">Уверенны?</p>
        <div className="d-flex justify-content-end">
          <Button onClick={() => dispatch(closeModal())} variant="secondary" className="me-2" type="submit">Отменить</Button>
          <Button onClick={deleteChannel} variant="danger" type="button">Отправить</Button>
        </div>
      </>
    ),
  };

  const mapping = { addChannel, renameChannel, removeChannel };

  return (
    <Modal centered show={isOpen} onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{mapping[type].modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {mapping[type].modalBody}
      </Modal.Body>
    </Modal>
  );
};

export default ModalWindow;
