import React, { useState } from "react";
import Slider from "react-slick";
import { map } from "lodash";
import { Image, Modal } from "semantic-ui-react";

// Configuración del slider: es una constante afuera del componente (lesson 109)
const settings = {
   className: "carousel-screenshots",
   dots: false,
   infinite: true,
   speed: 500,
   slidesToShow: 4,
   swipeToSlider: true,
};

export default function CarouselScreenshots(props) {
   const { title, screenshots } = props;
   const [showModal, setShowModal] = useState(false);
   const [urlImage, setUrlImage] = useState(null);

   // Para abrir el modal con la imagen: (lesson 110)
   const openImagen = (url) => {
      setUrlImage(url);
      setShowModal(true);
   };

   return (
      <>
         <Slider {...settings}>
            {map(screenshots, (screenshot) => (
               <Image
                  key={screenshot.id}
                  src={screenshot.url}
                  alt={screenshot.name}
                  onClick={() => openImagen(screenshot.url)}
               />
            ))}
         </Slider>
         <Modal open={showModal} onClose={() => setShowModal(false)} size="large">
            <Image src={urlImage} alt={title} />
         </Modal>
      </>
   );
}
