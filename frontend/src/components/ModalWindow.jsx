import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Form, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import cn from 'classnames';
import { useRef, useEffect } from 'react';
import filter from 'leo-profanity';
import { closeModal, setCurrentChannelId } from '../redux/store/uiSlice.js';
import {
  useAddChannelMutation, useRemoveChannelMutation, useRenameChannelMutation, useGetChannelsQuery,
} from '../redux/store/channelsApi.js';

const AddingModalWindow = () => {
  const { t } = useTranslation();
  const { data: channels = [] } = useGetChannelsQuery();
  const dispatch = useDispatch();
  const [addChannel] = useAddChannelMutation();
  const inputRef = useRef();

  const inputSchema = yup.object().shape({
    inputValue: yup.string().trim().min(3, t('errors.min3max20')).max(20, t('errors.min3max20'))
      .notOneOf(channels.map((channel) => channel.name), t('errors.notUnique'))
      .required(t('errors.required')),
  });

  const formik = useFormik({
    initialValues: {
      inputValue: '',
    },
    validationSchema: inputSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { resetForm }) => {
      try {
        const { id } = await addChannel(filter.clean(values.inputValue)).unwrap();
        dispatch(setCurrentChannelId({ id }));
        toast(t('toast.channelAdded'), { type: 'success' });
        resetForm();
        dispatch(closeModal());
      } catch (error) {
        toast(t('toast.networkError'), { type: 'error' });
      }
    },
  });
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal centered show onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.addChannel.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              required
              onChange={formik.handleChange}
              value={formik.values.inputValue}
              name="inputValue"
              className={`mb-2 ${cn({ 'is-invalid': formik.errors.inputValue })}`}
              type="text"
              isInvalid={formik.touched.inputValue && formik.errors.inputValue}
              ref={inputRef}
              id="inputValue"
            />
            <Form.Label htmlFor="inputValue" column="sm" className="visually-hidden">{t('modal.channelName')}</Form.Label>
            <Form.Control.Feedback type="invalid">{formik.errors.inputValue}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button onClick={() => dispatch(closeModal())} variant="secondary" className="me-2" type="button">
                {t('buttons.cancel')}
              </Button>
              <Button disabled={formik.isSubmitting} variant="primary" type="submit">
                {t('buttons.submit')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const RemovingModalWindow = () => {
  const { t } = useTranslation();
  const {
    currentChannelId,
    defaultChannelId,
    modal: { isOpen, extra },
  } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const [removeChannel] = useRemoveChannelMutation();

  const deleteChannel = async (e) => {
    e.preventDefault();
    try {
      const response = await removeChannel(extra.channelId);
      if (response.data.id === currentChannelId) {
        dispatch(setCurrentChannelId({ id: defaultChannelId }));
      }
      dispatch(closeModal());
      toast(t('toast.channelRemoved'), { type: 'success' });
    } catch (error) {
      toast(t('toast.networkError'), { type: 'error' });
    }
  };

  return (
    <Modal centered show={isOpen} onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.removeChannel.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modal.removeChannel.body')}</p>
        <div className="d-flex justify-content-end">
          <Button onClick={() => dispatch(closeModal())} variant="secondary" className="me-2" type="button">
            {t('buttons.cancel')}
          </Button>
          <Button
            onClick={deleteChannel}
            variant="danger"
            type="button"
          >
            {t('buttons.submit')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const RenamingModalWindow = () => {
  const { t } = useTranslation();
  const { data: channels = [] } = useGetChannelsQuery();
  const { channelName, channelId } = useSelector((state) => state.ui.modal.extra);
  const dispatch = useDispatch();
  const [renameChannel] = useRenameChannelMutation();
  const inputRef = useRef();

  const inputSchema = yup.object().shape({
    inputValue: yup.string().trim().min(3, t('errors.min3max20')).max(20, t('errors.min3max20'))
      .notOneOf(channels.map((channel) => channel.name), t('errors.notUnique'))
      .required(t('errors.required')),
  });

  const formik = useFormik({
    initialValues: {
      inputValue: channelName,
    },
    validationSchema: inputSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { resetForm }) => {
      try {
        await renameChannel({
          id: channelId,
          name: filter.clean(values.inputValue.trim()),
        }).unwrap();
        toast(t('toast.channelRenamed'), { type: 'success' });
        resetForm();
        dispatch(closeModal());
      } catch (error) {
        toast(t('toast.networkError'), { type: 'error' });
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, []);

  return (
    <Modal centered show onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.renameChannel.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              required
              onChange={formik.handleChange}
              value={formik.values.inputValue}
              name="inputValue"
              className={`mb-2 ${cn({ 'is-invalid': formik.errors.inputValue })}`}
              type="text"
              isInvalid={formik.touched.inputValue && formik.errors.inputValue}
              ref={inputRef}
              id="inputValue"
            />
            <Form.Label htmlFor="inputValue" column="sm" className="visually-hidden">{t('modal.channelName')}</Form.Label>
            <Form.Control.Feedback type="invalid">{formik.errors.inputValue}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button onClick={() => dispatch(closeModal())} variant="secondary" className="me-2" type="button">
                {t('buttons.cancel')}
              </Button>
              <Button disabled={formik.isSubmitting} variant="primary" type="submit">
                {t('buttons.submit')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const ModalWindow = () => {
  const { type, isOpen } = useSelector((state) => state.ui.modal);
  if (!isOpen) return null;
  const mapping = {
    addChannel: <AddingModalWindow />,
    renameChannel: <RenamingModalWindow />,
    removeChannel: <RemovingModalWindow />,
  };
  return mapping[type];
};

export default ModalWindow;
