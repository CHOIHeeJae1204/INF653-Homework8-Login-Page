const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const hbs = require('hbs');
const path = require('path');

const app = express();
const PORT = 3000;

const SECRET = 'mySecretKey12345!';

// predefined users
const users = {
    "admin": {
        username: "admin",
        password: "password123",
        fullName: "System Administrator",
        email: "admin@university.edu",
        bio: "Managing the campus network infrastructure."
    },
    "student_dev": {
        username: "student_dev",
        password: "dev_password",
        fullName: "Jane Developer",
        email: "jane.d@student.edu",
        bio: "Full-stack enthusiast and coffee drinker."
    }
};

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(SECRET));
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true }
}));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// redirect to login if not logged in
function isLoggedIn(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

// routes
app.get('/', (req, res) => {
    res.redirect('/login');
});

// show login page
app.get('/login', (req, res) => {
    const theme = req.signedCookies.theme || 'light';
    const nextThemeLabel = theme === 'light' ? 'Dark' : 'Light';
    const error = req.query.error || null;

    res.render('login', { theme, nextThemeLabel, error });
});

// handle login form submit
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (users[username] && users[username].password === password) {
        req.session.user = users[username];
        res.redirect('/profile');
    } else {
        res.redirect('/login?error=Invalid username or password');
    }
});

// clear session and go back to login
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.redirect('/login');
    });
});

// protected profile page
app.get('/profile', isLoggedIn, (req, res) => {
    const theme = req.signedCookies.theme || 'light';
    const nextThemeLabel = theme === 'light' ? 'Dark' : 'Light';
    const user = req.session.user;

    res.render('profile', {
        theme,
        nextThemeLabel,
        fullName: user.fullName,
        email: user.email,
        bio: user.bio,
        username: user.username
    });
});

// toggle light/dark theme
app.get('/toggle-theme', (req, res) => {
    const currentTheme = req.signedCookies.theme || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    res.cookie('theme', newTheme, {
        httpOnly: true,
        signed: true
    });

    const referer = req.get('Referer') || '/login';
    res.redirect(referer);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
