import { useState, useEffect } from "react";
import { fetchImg } from "services/ApiPixabay/Api";
import { PER_PAGE as pagelimit } from '../services/ApiPixabay/Api';
import { Button } from "./Button/Button";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from './Searchbar/Searchbar';
import ImageLoader from "./Loader/Loader";
import toast, { Toaster } from 'react-hot-toast';

export const App = () => {

  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [totalImg, setTotalImg] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }


    const loadImages = async () => {

      try {
        setIsLoading(true);
        const { hits, totalHits} = await fetchImg(query, page);
        setImages(prevState => [...prevState, ...hits]);
        setLoadMore(page <= Math.ceil(totalHits / pagelimit) ? true : false);
        setTotalImg(totalHits);

        if (page === 1 && totalHits > 0 ) {
          toast.success(`We finded ${totalHits} images!`)
        }

      } catch (error) {
        toast.warn(`Sorry, there are no images matching your search query! Please try again.`);
        console.log(error);

      } finally {
        setIsLoading(false);
      }
    };

    loadImages();

  }, [page, query]);

  useEffect(() => {
    if (totalImg === 0) {
      toast.error('Nothing was found for your request', {
        duration: 3000,
        style: {
          border: '1px solid transparent',
          padding: '16px',
          color: 'red',
          width: '300px',
        },
      });
    }
  }, [totalImg]);

  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }, [images]);


  const handleSubmitSearch = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
  }

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1)
  };

  return (
    <>
      <Searchbar onSubmit = {handleSubmitSearch} />
      {images.length > 0 && (<ImageGallery images={images}/>)}

      {(images.length >= pagelimit && loadMore && !isLoading) && (<Button onLoadMore = {handleLoadMore}/>)}

      {isLoading && (<ImageLoader/>)}

      <Toaster position="top-right" />
    </>
  );
};
