

const requireAuth = (req, res, next) => {
    if(!req.session.user) {
        res.status(401).json({ error: 'Unauthorized action' });
    }

    next();
}

export default requireAuth;