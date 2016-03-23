module.exports = function(app) {

    // partials is anything with the word partials
    // :partialPath is a placeholder
    app.get('/partials/*', function(req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    // Index View:
    // this allows index for any route that is not built
    // good for clientside routing --> can be dangerous if typos
    app.get('*', function(req, res){
    res.render('index');
    });
}