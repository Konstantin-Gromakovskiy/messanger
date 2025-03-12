import React from 'react';
import { useTranslation } from 'react-i18next';
import notFound from '../assets/404.svg';
import routes from '../routes.js';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <img alt={t('notFoundPage.title')} className="img-fluid h-25" src={notFound} />
      <h4 className="h4 text-muted">{t('notFoundPage.title')}</h4>
      <p className="text-muted">
        {`${t('notFoundPage.description')} `}
        <a href={routes.mainPagePath()}>{t('notFoundPage.link')}</a>
      </p>
    </div>

  );
};
export default NotFoundPage;
