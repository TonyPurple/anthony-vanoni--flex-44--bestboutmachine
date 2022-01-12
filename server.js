require('dotenv').config();
var express = require('express');
var path = require('path');
var createError = require('http-errors');
var session = require('express-session');
var logger = require('morgan');
var passport = require('passport')
var methodOverride = require('method-override');

var app = express();

require('./config/database');

require('./config/passport');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var matchesRouter = require('./routes/matches');
var reviewsRouter = require('./routes/reviews');
var promotionsRouter = require('./routes/promotions')
var profilesRouter = require('./routes/profiles')
var postsRouter = require('./routes/posts')
var repliesRouter = require('./routes/replies')


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        sameSite: 'lax',
    }
}));
app.use(passport.initialize());
app.use(passport.session());
//pass user to view
app.use(function(req, res, next) {
    res.locals.user = req.user;
    next();
});

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/matches', matchesRouter);
app.use('/', reviewsRouter)
app.use('/', promotionsRouter)
app.use('/profiles', profilesRouter)
app.use('/posts', postsRouter)
app.use('/', repliesRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;