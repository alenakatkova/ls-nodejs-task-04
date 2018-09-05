// Обработка GET запроса. Рендеринг страницы login
module.exports.getLogin = async (ctx, next) => {
  ctx.render('pages/login');
};
