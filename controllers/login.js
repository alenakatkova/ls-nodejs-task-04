const db = require('../models/db');
const psw = require('../libs/password');
const validateFields = require('../libs/validation').validateFields;

// Обработка GET запроса. Рендеринг страницы login
module.exports.getLogin = async (ctx, next) => {
  ctx.render('pages/login');
};

// Обработка POST запроса. Сравнение введенного логина и пароля с данными из БД
module.exports.sendLogin = async (ctx, next) => {
  // Валидация формы
  let isValid = await validateFields(ctx.request.body);
  if (!isValid) {
    return ctx.render('pages/login', { msgslogin: 'Заполните все поля' });
  }

  const { email, password } = ctx.request.body;
  const user = db.getState().user;

  if (!user) {
    return ctx.render('pages/login', { msgslogin: 'Сначала задайте пароль и почту пользователя' });
  }

  if (user.email !== email || !psw.validPassword(password)) {
    return ctx.render('pages/login', { msgslogin: 'Неправильные имя пользователя или пароль' });
  } else {
    ctx.session.isAdmin = true;
    ctx.redirect('/admin');
  }
};
