import mongoose, {Schema} from 'mongoose';

//const { Schema } = mongoose;

/*
type TypeOfMedia = 'Book' | 'Movie' | 'Tv Show' | 'Album' | 'Podcast' | 'Other';


// Define a custom Mongoose schema type for TypeOfMedia
class TypeOfMediaType extends SchemaType {
  cast(val): string {
    if (!['Book', 'Movie', 'Tv Show', 'Album', 'Podcast', 'Other'].includes(val)) {
      throw new Error(`'${val}' is not a valid media type.`);
    }
    return val;
  }
}

// Add the custom schema type to Mongoose's type registry
mongoose.Schema.Types.TypeOfMedia = TypeOfMediaType;
*/

export interface MediaInterface {
  title: string;
  rating: number;
  type: string;
  review: string;
  imgUrl: string;
  creator: string; //username of the user that inputted this media
  //date watched?
}

export const MediaSchema = new Schema<MediaInterface>({
  title: { type: String, required: true },
  rating: {type: Number, required: true},
  type: {type: String, required: true},
  review: { type: String, default: '' },
  imgUrl: { type: String, default: '' },
  creator: { type: String, required: true },
  //date watched?
});


const MediaModel = mongoose.model<MediaInterface>('Media', MediaSchema);

export default MediaModel;