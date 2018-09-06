const db = require('../models/db');
const validateFields = require('../libs/validation').validateFields;
const nodemailer = require('nodemailer');
const config = require('../config');

// Обработка GET запроса. Рендеринг главной страницы
module.exports.getHome = async (ctx, next) => {
  ctx.render('pages/index', {
    goods: db.getState().goods,
    skills: db.getState().skills
  });
};

// Обработка POST запроса. Сохранение сообщения от пользователя в БД
module.exports.sendEmail = async (ctx, next) => {
  const { email, name, message } = ctx.request.body;

  let isValid = await validateFields(ctx.request.body);
  if (!isValid) {
    return ctx.render('pages/index', {
      goods: db.getState().goods,
      skills: db.getState().skills,
      msgsemail: 'Поля не заполнены'
    });
  }

  // Запись нового сообщения от пользователя в БД
  let emails = db.getState().emails || [];

  emails.push({
    email: email,
    name: name,
    message: message
  });

  db.set('emails', emails).write();

  // Отправка сообщения с помощью nodemailer
  const transporter = nodemailer.createTransport(config.mail.smtp);
  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: config.mail.smtp.auth.user,
    subject: config.mail.subject,
    text: message.trim().slice(0, 500) + `\n Отправлено с: <${email}>`
  };

  await transporter.sendMail(mailOptions);
  return ctx.redirect('/');
};
