import cloudinary from 'cloudinary';
import Contacts from '../../models/contacts.model.js';
import CategoryContacts from '../../models/category.contacts.model.js';


export const createContacts = async (req, res) => {
  try {
    const { name, description, phone, categoryContactsId } = req.body;
    const { path } = req.file;

    const uploadedImage = await cloudinary.uploader.upload(path);

    const categorycontacts = await  CategoryContacts.findById(categoryContactsId);
    
    if (!categorycontacts) return res.status(401).send({ message: "Category not found" });

    const newContacts = new Contacts({
      name,
      description,
      phone,
      image: uploadedImage.secure_url,
      category: categoryContactsId
    });

    const savedContacts = await newContacts.save();

    res.status(201).json(savedContacts);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
