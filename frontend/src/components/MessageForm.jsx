import { Button, Form, InputGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import filter from 'leo-profanity';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useAddMessageMutation } from '../redux/store/messagesApi.js';
import useAuth from '../hook/useAuth.js';

const MessageForm = () => {
  const { t } = useTranslation();
  const [addMassage] = useAddMessageMutation();
  const { logOut, username } = useAuth();
  const inputRef = useRef({});
  const {
    currentChannelId,
    modal: { isOpen },
  } = useSelector((state) => state.ui);

  useEffect(() => { inputRef.current.focus(); }, [isOpen]);

  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: async (values, { resetForm }) => {
      try {
        const message = filter.clean(values.body.trim());
        await addMassage({ body: message, channelId: currentChannelId, username }).unwrap();
        resetForm();
      } catch (error) {
        switch (error.status) {
          case 401:
            logOut();
            break;
          case 500:
            toast.error(t('toast.serverError'));
            break;
          default:
            toast.error(t('toast.unknownError'));
            console.log(error);
        }
      }
    },
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form onSubmit={formik.handleSubmit} noValidate className="">
        <InputGroup size="sm">
          <Form.Control
            ref={inputRef}
            onChange={formik.handleChange}
            value={formik.values.body}
            type="text"
            placeholder={t('chatContainer.inputPlaceholder')}
            name="body"
            aria-label={t('chatContainer.inputLabel')}
          />
          <InputGroup.Text>
            <Button
              disabled={formik.isSubmitting || formik.values.body.trim().length === 0}
              type="submit"
              variant="outline-primary"
              className=" btn-group-vertical"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
                />
              </svg>
              <span className="visually-hidden">{t('buttons.submit')}</span>
            </Button>
          </InputGroup.Text>
        </InputGroup>
      </Form>
    </div>
  );
};

export default MessageForm;
