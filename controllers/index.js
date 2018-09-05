const db = require('../models/db');

// Обработка GET запроса. Рендеринг главной страницы
module.exports.getHome = async (ctx, next) => {
  ctx.render('pages/index', {
    goods: db.getState().goods,
    skills: db.getState().skills
  });
};
