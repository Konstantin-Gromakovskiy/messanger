import React from 'react';

const NotFoundPage = () => (
  <div className="text-center">
    <img alt="Страница не найдена" className="img-fluid h-25" src="../../assets/404.svg" />
    <h4 className="h4 text-muted">Страница не найдена</h4>
    <p className="text-muted">
      Но вы можете перейти
      {' '}
      <a href="/">на главную страницу</a>
    </p>
  </div>

);

export default NotFoundPage;
