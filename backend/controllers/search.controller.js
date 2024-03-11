// search.controller.js

import APIFeatures from "../utils/apiFeatures.js";
import Contact from '../models/contacts.model.js';
import Guideline from '../models/guidelines.model.js';
import CategoryContacts from '../models/category.contacts.model.js';
import CategoryGuidelines from '../models/category.guidelines.model.js';


export const search = async (req, res) => {
    try {
        const { keyword } = req.query;

        const apiFeatures = new APIFeatures({ keyword });

        const contacts = await apiFeatures.search(Contact);
        const guidelines = await apiFeatures.search(Guideline);
        const categoriesContacts = await apiFeatures.search(CategoryContacts);
        const categoriesGuidelines = await apiFeatures.search(CategoryGuidelines);

        const results = {
            contacts,
            guidelines,
            categoriesContacts,
            categoriesGuidelines
        };

        res.json(results);
    } catch (error) {
        console.error('Error in searchController:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
