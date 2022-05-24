import { IncomingForm } from 'formidable';
import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  // parse form with a Promise wrapper
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

  try {
    const response = await new Promise((res, rej) => {
      cloudinary.v2.uploader.upload(
        data.files.audio.filepath,
        {
          use_filename: true,
          resource_type: 'auto',
          filename_override: data.fields.name,
          format: 'mp3',
          folder: 'diglisjubilee',
          tags: [data.fields.email, data.fields.name],
        },
        (error, success) => {
          if (error) {
            rej(error);
          } else {
            res(success);
          }
        },
      );
    });
    console.log({ response });
    res.json(response);
  } catch (err) {
    throw new Error(err.message);
  }
};

export default handler;
