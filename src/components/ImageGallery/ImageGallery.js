import { GalleryList } from "./ImageGallery.styled";
import PropTypes from 'prop-types';
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";

export const ImageGallery = ({ images }) => {
  return (
    <GalleryList>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
        />
      ))}
    </GalleryList>
  )
}

// export const ImageGallery = ({ images }) => {
//     return (
//         <GalleryList>
//         {images.map(({ id, webformatURL, largeImageURL, tags }) => (
//             <ImageGalleryItem
//             key={id}
//             webformatURL={webformatURL}
//             largeImageURL={largeImageURL}
//             tags={tags}
//             />
//         ))}
//         </GalleryList>
//     )
// }

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags:PropTypes.string.isRequired,
    })
  ),
};


