import { useState } from "react"
import PropTypes from "prop-types";
import { ImageModal } from "components/Modal/Modal";
import { GalleryItem, GalleryImg } from "./ImageGalleryItem.styled"

export const ImageGalleryItem = ({ image }) => {

  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <GalleryItem>
        <GalleryImg
          src={image.webformatURL}
          alt={image.tags}
          onClick={() => {setIsOpenModal(true)}}
        />
      </GalleryItem>
      {isOpenModal && (
        <ImageModal
          image={image}
          onCloseModal={() => {setIsOpenModal(false)}}
        />)}
    </>
  )
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};

