require('dotenv').config();
const express = require('express');
const path = require('path');
const createError = require('http-errors');
const session = require('express-session');
const logger = require('morgan');
const passport = require('passport')
const methodOverride = require('method-override');

const app = express();

require('./config/database');

require('./config/passport');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const matchesRouter = require('./routes/matches');
const reviewsRouter = require('./routes/reviews');
const promotionsRouter = require('./routes/promotions')
const profilesRouter = require('./routes/profiles')
const postsRouter = require('./routes/posts')
const repliesRouter = require('./routes/replies')


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