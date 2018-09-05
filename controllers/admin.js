// Обработка GET запроса. Рендеринг страницы admin
module.exports.getAdmin = async (ctx, next) => {
  ctx.render('pages/admin');
};
