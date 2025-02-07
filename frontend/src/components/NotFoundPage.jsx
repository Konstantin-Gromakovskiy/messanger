import React from 'react';
import notFound from '../assets/404.svg';

const NotFoundPage = () => (
  <div className="text-center">
    <img alt="Страница не найдена" className="img-fluid h-25" src={notFound} />
    <h4 className="h4 text-muted">Страница не найдена</h4>
    <p className="text-muted">
      {'Но вы можете перейти '}
      <a href="/">на главную страницу</a>
    </p>
  </div>

);

export default NotFoundPage;
