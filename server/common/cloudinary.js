import { v2 as cloudinary } from 'cloudinary';

export const uploadImage = async (image) => {
  try {
    const result = await cloudinary.uploader.upload(image.path, {
      folder: 'TaskManager/Profile-Pictures',
      public_id: `user_${Date.now()}`,
      overwrite: true,
      quality: 'auto:low',
      fetch_format: 'auto',
      compression: 'low',
    });
    return result;

  } catch (error) {
    console.error('Error uploading image:', error);
    return error;
  }
};

export const uploadMultipleFiles = async (files) => {
  //console.log('Type of files:', Array.isArray(files) ? 'Array' : typeof files);
  try {
    const uploadPromises = files.map(file => 
      cloudinary.uploader.upload(file.path, {
        folder: 'TaskManager/Task-Attachments',
        public_id: `user_${Date.now()}`,
        overwrite: true,
      })
    );
    const results = await Promise.all(uploadPromises);
    //console.log(results);
    return results;

  } catch (error) {
    //console.log(error.message);
    console.error('Error uploading multiple files:', error);
    return error.message;
  }
};

export const deleteImage = (publicId) => {
    return cloudinary.uploader.destroy(publicId);
}

export const getImage = (publicId) => {
    return cloudinary.image(`${publicId}.jpg`);
}


export const countDocumentsInFolder = async () => {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'TaskManager/Task-Attachments',
      max_results: 500,
    });
    return result.resources.length;

  } catch (error) {
    console.error('Error fetching resources:', error);
    return 0;
  }
};
