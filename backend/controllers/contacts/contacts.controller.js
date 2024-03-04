import cloudinary from 'cloudinary';
import Contacts from '../../models/contacts.model.js';
import CategoryContacts from '../../models/category.contacts.model.js';
import Contact from '../../models/contacts.model.js';


export const createContacts = async (req, res) => {
  try {
    const { name, description, phone, category } = req.body;
    let { image } = req.body;

    // Check if image is provided
    if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        image = result.secure_url;
    }

    // Create new guideline instance
    const newContact = new Contacts({
        name,
        description,
        image,
        phone,
        category
    });

    // Save the guideline to the database
    const savedContact = await newContact.save();

    res.status(201).json(savedContact);
} catch (error) {
    errorHandler(res, error);
}
};

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contacts.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getContactById = async (req, res) => {
  try {
    const contact = await Contacts.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getContactsByCategory = async (req, res) => {
  try {
      const { categoryId } = req.params;

      // Find guidelines by category
      const contacts = await Contact.find({ category: categoryId });

      res.status(200).json(contacts);
  } catch (error) {
      errorHandler(res, error);
  }
};

export const updateContactById = async (req, res) => {
  try {
    const { name, short_description, description } = req.body;
    let image = req.body.image;
    if (req.file) {
      const { path } = req.file;
      const uploadedImage = await cloudinary.uploader.upload(path);
      image = uploadedImage.secure_url;
    }

    const updatedContact = await Contacts.findByIdAndUpdate(
      req.params.id,
      { name, short_description, description, image },
      { new: true }
    );
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteContactById = async (req, res) => {
  try {
    const contact = await Contacts.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    const imageUrl = contact.image;

    const deletedContact = await Contacts.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    const publicId = imageUrl.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(publicId);

    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
