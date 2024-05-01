//Router for handling Media updates

import express from "express";
import MediaModel, { MediaInterface } from "../models/media";
import requireAuth from "../middlewares/require-auth";

const MediaRouter = express.Router()

//GET route for fetching all Media
MediaRouter.get('/', async (req, res) => {
    try {
        const Media = await MediaModel.find();
        res.status(200).send(Media);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Media: ', error: error.message });
    };
});


interface MediaQuery {
    type?: string;
    rating?: string;
}

MediaRouter.get('/bycreator', requireAuth, async (req, res) => {
    const currentUser = req.session!.user;
    const { type, rating } = req.query as MediaQuery;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query = { creator: currentUser } as any;
    if (type && type !== 'All') {
        query.type = type;
    }
    if (rating && rating !== 'All') {
        query.rating = rating;
    }

    try {
        const media = await MediaModel.find(query);
        res.status(200).send(media);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching media by creator: ', error: error.message });
    }
});



// GET route for fetching a Media by ID
MediaRouter.get('/:id', requireAuth, async (req, res) => {
    const { id } = req.params;
    try {
        const Media = await MediaModel.findById(id);
        if (!Media) {
            res.status(404).send('Media not found');
            return;
        }
        res.status(200).send(Media);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Media: ', error: error.message });
    }
});

//POST route for adding a Media with a body of MediaText
MediaRouter.post('/add', requireAuth, async (req, res) => {
    const { title, rating, type, review, imgUrl } = req.body as MediaInterface;
    const creator = req.session!.user;

    try {
        const addedMedia = new MediaModel({  title, rating, type, review, imgUrl, creator });
        await addedMedia.save();
        res.status(200).send('Media added successfully');
    } catch (error) {
        res.status(500).json({ message: 'Error adding Media: ', error: error.message });
    };
});


// PUT route for updating a Media by ID (FOR UPDATING)
MediaRouter.put('/:id', requireAuth, async (req, res) => {
    const { id } = req.params;
    const { title, rating, type, review, imgUrl } = req.body as MediaInterface;

    try {
        const media = await MediaModel.findById(id);
        if (!media) {
            res.status(404).send('Media not found');
            return;
        }

        // Update the media properties
        if (title) media.title = title;
        if (rating) media.rating = rating;
        if (type) media.type = type;
        if (review) media.review = review;
        if (imgUrl) media.imgUrl = imgUrl;

        await media.save();
        res.status(200).send('Media updated successfully');
    } catch (error) {
        res.status(500).json({ message: 'Error updating media: ', error: error.message });
    }
});

MediaRouter.delete('/:id', requireAuth, async (req, res) => {
    const { id } = req.params;

    try {
        const deletedMedia = await MediaModel.findByIdAndDelete(id);
        if (!deletedMedia) {
            res.status(404).send('Media not found');
            return;
        }
        res.status(200).send('Media deleted successfully');
    } catch (error) {
        res.status(500).json({ message: 'Error deleting media: ', error: error.message });
    }
});

export default MediaRouter;