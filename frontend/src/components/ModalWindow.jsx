import { Button, Modal, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import cn from 'classnames';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { closeModal, setCurrentChannelId } from '../redux/store/uiSlice.js';
import {
  useAddChannelMutation, useRemoveChannelMutation, useRenameChannelMutation, useGetChannelsQuery,
} from '../redux/store/channelsApi.js';

const ModalWindow = () => {
  const { data: channels = [] } = useGetChannelsQuery();
  const dispatch = useDispatch();
  const {
    currentChannelId,
    defaultChannelId,
    modal: { isOpen, type, extra },
  } = useSelector((state) => state.ui);
  const [addChannelMutation] = useAddChannelMutation();
  const [removeChannelMutation] = useRemoveChannelMutation();
  const [renameChannelMutation] = useRenameChannelMutation();
  const inputRef = useRef();
  const { t } = useTranslation();

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
      if (type === 'addChannel') {
        const { data: { id, name } } = await addChannelMutation(values.inputValue);
        dispatch(setCurrentChannelId({ id, name }));
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

  const CancelSubmitBtns = (
    <div className="d-flex justify-content-end">
      <Button onClick={() => dispatch(closeModal())} variant="secondary" className="me-2" type="button">
        {t('buttons.cancel')}
      </Button>
      <Button
        onClick={type === 'removeChannel' ? deleteChannel : null}
        disabled={formik.isSubmitting}
        variant={type === 'removeChannel' ? 'danger' : 'primary'}
        type={type === 'removeChannel' ? 'button' : 'submit'}
      >
        {t('buttons.submit')}
      </Button>
    </div>
  );
  console.log(formik.errors.inputValue);

  return (
    <Modal centered show={isOpen} onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{t(`modal.${type}.title`)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {type === 'removeChannel' ? (
          <>
            <p className="lead">{t(`modal.${type}.body`)}</p>
            {CancelSubmitBtns}
          </>
        ) : (
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
              <Form.Label column="sm" className="visually-hidden">{t('modal.channelName')}</Form.Label>
              <div className="invalid-feedback">{formik.errors.inputValue}</div>
              {CancelSubmitBtns}
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ModalWindow;
