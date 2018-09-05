const db = require('../models/db');

// Обработка GET запроса. Рендеринг главной страницы
module.exports.getHome = async (ctx, next) => {
  const goods = db.getState().goods || [];
  const skills = db.getState().skills || [];

  ctx.render('pages/index', {
    goods: goods,
    skills: skills
  });
};
