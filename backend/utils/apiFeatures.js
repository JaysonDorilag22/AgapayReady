// apiFeatures.js
import Contact from '../models/contacts.model.js'
import Guideline from '../models/guidelines.model.js'
import CategoryContacts from '../models/category.contacts.model.js'
import CategoryGuidelines from '../models/category.guidelines.model.js'

export default class APIFeatures {
    constructor(queryStr) {
        this.queryStr = queryStr;
    }

    search() {
        console.log(this.queryStr);
        const keyword = this.queryStr.keyword ? {
            $or: [
                { name: { $regex: this.queryStr.keyword, $options: 'i' } },
                { description: { $regex: this.queryStr.keyword, $options: 'i' } },
                { short_description: { $regex: this.queryStr.keyword, $options: 'i' } },
            ]
        } : {};
        console.log(this.queryStr, keyword);
        return Promise.all([
            Contact.find({ ...keyword }),
            Guideline.find({ ...keyword }),
            CategoryContacts.find({ name: { $regex: this.queryStr.keyword, $options: 'i' } }),
            CategoryGuidelines.find({ name: { $regex: this.queryStr.keyword, $options: 'i' } })
        ]).then(([contacts, guidelines, categoriesContacts, categoriesGuidelines]) => {
            return { contacts, guidelines, categoriesContacts, categoriesGuidelines };
        });
    }
}
