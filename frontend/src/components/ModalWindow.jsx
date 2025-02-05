import { Button, Modal, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import cn from 'classnames';
import * as yup from 'yup';
import { closeModal, setCurrentChannelId } from '../redux/store/uiSlice.js';
import {
  useAddChannelMutation, useRemoveChannelMutation, useRenameChannelMutation, useGetChannelsQuery,
} from '../redux/store/channelsApi.js';

const ModalWindow = () => {
  const { data: channels = [] } = useGetChannelsQuery();
  const dispatch = useDispatch();
  const { modal, currentChannelId, defaultChannelId } = useSelector((state) => state.ui);
  const { isOpen, type, extra } = modal;
  const [addChannelMutation] = useAddChannelMutation();
  const [removeChannelMutation] = useRemoveChannelMutation();
  const [renameChannelMutation] = useRenameChannelMutation();
  const inputRef = useRef();

  yup.setLocale({
    string: {
      min: 'Минимум 3 символов',
      max: 'Максимум 20 символов',
      notOneOf: 'Такое имя уже используется',
      required: 'Обязательное поле',
    },
  });

  const inputSchema = yup.object().shape({
    inputValue: yup.string().trim().min(3).max(20)
      .notOneOf(channels.map((channel) => channel.name), 'Такое имя уже используется')
      .required('Обязательное поле'),
  });
  const formik = useFormik({
    initialValues: {
      inputValue: '',
    },
    validationSchema: inputSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { resetForm }) => {
      if (type === 'addChannel') {
        const response = await addChannelMutation(values.inputValue);
        dispatch(setCurrentChannelId(response.data.id));
      } else {
        await renameChannelMutation({ id: extra.channelId, name: values.inputValue });
      }
      resetForm();
      dispatch(closeModal());
    },
  });

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const deleteChannel = async (e) => {
    e.preventDefault();
    try {
      dispatch(closeModal());
      const response = await removeChannelMutation(extra.channelId);
      if (response.data.id === currentChannelId) dispatch(setCurrentChannelId(defaultChannelId));
    } catch (err) {
      console.log(err);
    }
  };

  const manageChannel = {
    modalTitle: type === 'addChannel' ? 'Добавить канал' : 'Редактировать канал',
    modalBody: (
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            ref={inputRef}
            onChange={formik.handleChange}
            value={formik.values.inputValue}
            name="inputValue"
            className={`mb-2 ${cn({ 'is-invalid': formik.errors.inputValue })}`}
            type="text"
          />
          <Form.Label column="sm" className="visually-hidden">Имя канала</Form.Label>
          <div className="invalid-feedback">{formik.errors.inputValue}</div>
          <div className="d-flex justify-content-end">
            <Button onClick={() => dispatch(closeModal())} variant="secondary" className="me-2" type="button">Отменить</Button>
            <Button disabled={formik.isSubmitting} variant="primary" type="submit">Отправить</Button>
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

  const mapping = { addChannel: manageChannel, renameChannel: manageChannel, removeChannel };

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
