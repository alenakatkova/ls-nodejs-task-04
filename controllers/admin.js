const db = require('../models/db');
const validation = require('../libs/validation');
const fs = require('fs');
const util = require('util');
const _path = require('path');
const rename = util.promisify(fs.rename);
const unlink = util.promisify(fs.unlink);

// Обработка GET запроса. Рендеринг страницы admin
module.exports.getAdmin = async (ctx, next) => {
  if (ctx.session.isAdmin) {
    ctx.render('pages/admin');
  } else {
    ctx.render('pages/login');
  }
};

// Обработка POST запроса. Сохранение анкеты в БД
module.exports.sendSkills = async (ctx, next) => {
  const { age, concerts, cities, years } = ctx.request.body;

  // Валидация формы
  let isValid = validation.validateFields(ctx.request.body);
  if (!isValid) {
    return ctx.render('pages/admin', {
      msgskill: 'Поля не заполнены' });
  } else {
    db.set('skills', [{
      number: age,
      text: 'Возраст начала занятий на скрипке'
    }, {
      number: concerts,
      text: 'Концертов отыграл'
    }, {
      number: cities,
      text: 'Максимальное число городов в туре'
    }, {
      number: years,
      text: 'Лет на сцене в качестве скрипача'
    }]).write();

    ctx.render('pages/admin');
  }
};

// Обработка POST запроса. Сохранение нового товара в БД
module.exports.uploadGood = async (ctx, next) => {
  const { price } = ctx.request.body;
  const { path } = ctx.request.files.photo;
  const productName = ctx.request.body.name;
  const fileName = ctx.request.files.photo.name;
  
  let upload = './public/upload';

  // Валидация формы
  let areFieldsValidValid = validation.validateFields(ctx.request.body);
  let isFileValid = validation.validateUpload(ctx.request.files.photo);
  if (!areFieldsValidValid || !isFileValid) {
    await unlink(path);
    return ctx.render('pages/admin', {
      msgfile: 'Заполните все поля'
    });
  }

  let newFilePath = _path.join(upload, ctx.request.files.photo.name);

  const errUpload = await rename(path, newFilePath);
  if (errUpload) {
    await unlink(newFilePath);
    return ctx.render('pages/admin', {
      msgfile: 'Произошла ошибка, попробуйте еще раз'
    });
  }

  db
    .get('goods')
    .push({
      photo: fileName,
      src: _path.join('./upload', fileName),
      name: productName,
      price: price
    })
    .write();

  ctx.render('pages/admin');
};
