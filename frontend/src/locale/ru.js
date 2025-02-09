const translation = {
  errors: {
    required: 'Обязательное поле',
    min3max20: 'От 3 до 20 символов',
    notUnique: 'Такое имя уже используется',
    authFailed: 'Неверные имя пользователя или пароль',
    oneOf: 'Пароли должны совпадать',
    userExists: 'Пользователь уже существует',
  },
  toast: {
    channelAdded: 'Канал создан',
    channelRemoved: 'Канал удален',
    channelRenamed: 'Канал переименован',
    networkError: 'Ошибка соединения',
    serverError: 'Сервер не отвечает',
  },
  buttons: {
    exit: 'Выйти',
    login: 'Войти',
    submit: 'Отправить',
    cancel: 'Отменить',
    signup: 'Зарегистрироваться',
  },
  modal: {
    channelName: 'Имя канала',
    addChannel: {
      title: 'Добавить канал',
    },
    removeChannel: {
      title: 'Удалить канал',
      body: 'Уверены?',
    },
    renameChannel: {
      title: 'Переименовать канал',
    },
  },
  mainPage: {
    channels: 'Каналы',
    remove: 'Удалить',
    rename: 'Переименовать',
  },
  chatContainer: {
    messages: {
      count_one: '{{count}} сообщение',
      count_few: '{{count}} сообщения',
      count_many: '{{count}} сообщений',
    },
    inputPlaceholder: 'Введите сообщение...',
    inputLabel: 'Новое сообщение',
  },
  loginPage: {
    username: 'Ваш ник',
    password: 'Пароль',
    account: 'Нет аккаунта?',
    registration: 'Регистрация',
    title: 'Войти',
  },
  notFoundPage: {
    title: 'Страница не найдена',
    description: 'Но вы можете перейти',
    link: 'на главную страницу',
  },
  signupPage: {
    username: 'Имя пользователя',
    password: 'Пароль',
    confirmPassword: 'Подтвердите пароль',
    title: 'Регистрация',

  },
};

export default { translation };
