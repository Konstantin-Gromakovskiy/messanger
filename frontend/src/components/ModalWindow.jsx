import { Button, Modal, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { closeModal } from '../redux/store/uiSlice.js';

const ModalWindow = () => {
  const dispatch = useDispatch();
  const { isOpen, type } = useSelector((state) => state.ui.modal);
  const [currentInput, setCurrentInput] = useState('');
  if (!isOpen) return null;

  const sendChannel = (e) => {
    e.preventDefault();
    console.log(currentInput);
    dispatch(closeModal());
    setCurrentInput('');
  };

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
          <Button variant="danger" type="submit">Отправить</Button>
        </div>
      </>
    ),
  };

  const mapping = {
    addChannel,
    renameChannel,
    removeChannel,
  };

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
