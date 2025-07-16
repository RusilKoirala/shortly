import Link from '../models/link.model.js';
import {nanoid} from 'nanoid';
import User from '../models/user.model.js';

const createLink = async (req, res) => {
    const {originalUrl} = req.body;
    const ownerId = req.user.id; // Assuming req.user is set by authentication middleware

    try {
        const shortUrl = nanoid(5);
        const newLink = new Link({
            originalUrl,
            shortUrl,
            owner: ownerId
        });
        await newLink.save();
        // Add the link to the user's links array
        await User.findByIdAndUpdate(ownerId, { $push: { links: newLink._id } });
        res.status(201).json({ message: "Link created successfully", data: newLink });
    } catch (error) {
        console.error("Error creating link:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getLink = async (req, res) => {
    const { id } = req.params;
    try {
        const link = await Link.findOne({shortUrl: id});
        if (!link) {
            return res.status(404).json({ message: "Link not found" });
        }
        link.clicks += 1;
        await link.save();
        res.redirect(link.originalUrl);

    } catch (error) {
        console.error("Error fetching link:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const deleteLink = async (req, res) => {
    const { id } = req.params;
    try {
        const link = await Link.findOne({ shortUrl: id, owner: req.user.id });
        if (!link) {
            return res.status(404).json({ message: "Link not found or unauthorized" });
        }
        await link.remove();
        res.status(200).json({ message: "Link deleted successfully" });
    } catch (error) {
        console.error("Error deleting link:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getInfoAboutLink = async (req,res)=> {
    const {id}= req.params;
    try {
        const link = await Link.findOne({ shortUrl: id });
        if (!link) {
            return res.status(404).json({ message: "Link not found" });
        }
        const owner = await User.findById(link.owner).select('-password'); // Exclude password from response
        res.status(200).json({
            message: "Link info fetched successfully",
            data: {
                originalUrl: link.originalUrl,
                shortUrl: link.shortUrl,
                clicks: link.clicks,
                owner: owner.name, // Assuming owner has a name field
                createdAt: link.createdAt,
                updatedAt: link.updatedAt
            }
        });
    } catch (error) {
        console.error("Error fetching link info:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}



export { createLink, getLink, deleteLink, getInfoAboutLink };