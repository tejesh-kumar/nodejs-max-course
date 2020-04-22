// this controller handles the 404 routes.
exports.get404 = (req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page not found', path: '/default'});
}