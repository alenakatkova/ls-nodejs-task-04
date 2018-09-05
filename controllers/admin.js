const db = require('../models/db');
const validation = require('../libs/validation');

// Обработка GET запроса. Рендеринг страницы admin
module.exports.getAdmin = async (ctx, next) => {
  ctx.render('pages/admin');
};

// Обработка POST запроса. Сохранение анкеты в БД
module.exports.sendSkills = async (ctx, next) => {
  const { age, concerts, cities, years } = ctx.request.body;

  // Валидация формы
  let isValid = validation.validateFields(ctx.request.body);
  if (!isValid) {
    return ctx.render('pages/admin', { msgskill: 'Поля не заполнены' });
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
