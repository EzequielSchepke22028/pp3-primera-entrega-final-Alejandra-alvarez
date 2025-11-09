import React from 'react';

const Mapa = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>📍 [translate:¿Dónde encontrarnos?]</h2>

      <h3>ITF4 - [translate:Murgiondo 2126]</h3>
      <iframe
        src="https://maps.google.com/maps?q=Murgiondo%202126&t=&z=15&ie=UTF8&iwloc=&output=embed"
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Mapa Murgiondo 2126"
      ></iframe>

      <h3>ITF9 - Av. San Juan 9876</h3>
      <iframe
        src="https://maps.google.com/maps?q=Av.%20San%20Juan%209876&t=&z=15&ie=UTF8&iwloc=&output=embed"
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Mapa ITF9"
      ></iframe>

      <h3>ITF12 - Av. Corrientes 4567</h3>
      <iframe
        src="https://maps.google.com/maps?q=Av.%20Corrientes%204567&t=&z=15&ie=UTF8&iwloc=&output=embed"
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Mapa ITF12"
      ></iframe>
    </div>
  );
};

export default Mapa;


/*import React from 'react';

const Mapa = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>📍 ¿Dónde encontrarnos?</h2>

      <h3>ITF4 - Murgiondo 2105</h3>
      {/* CORRECCIÓN: Debes usar la etiqueta <iframe> completa 
        y la URL va en el atributo src. 
        He usado una URL de ejemplo ya que la tuya es incompleta.
      }
      <iframe 
        src= "https://maps.app.goo.gl/XBtf7FcdXQKHDic1A"        src="https://maps.google.com/maps?q=Av.%20Rivadavia%2012345&t=&z=15&ie=UTF8&iwloc=&output=embed" 
        width="100%" 
        height="300" 
        style={{ border: 0 }} 
        allowFullScreen="" 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
        title="Mapa ITF4"
      ></iframe>

      <h3>ITF9 - Av. San Juan 9876</h3>
      <iframe 
        src="https://maps.google.com/maps?q=Av.%20San%20Juan%209876&t=&z=15&ie=UTF8&iwloc=&output=embed" 
        width="100%" 
        height="300" 
        style={{ border: 0 }} 
        allowFullScreen="" 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
        title="Mapa ITF9"
      ></iframe>

      <h3>ITF12 - Av. Corrientes 4567</h3>
      <iframe 
        src="https://maps.google.com/maps?q=Av.%20Corrientes%204567&t=&z=15&ie=UTF8&iwloc=&output=embed" 
        width="100%" 
        height="300" 
        style={{ border: 0 }} 
        allowFullScreen="" 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
        title="Mapa ITF12"
      ></iframe>
    </div>
  );
};

export default Mapa; */

/*import React from 'react';

const Mapa = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>📍 ¿Dónde encontrarnos?</h2>

      <h3>ITF4 - Av. Rivadavia 12345</h3>
      {/* CORRECCIÓN: Debes usar la etiqueta <iframe> completa 
        y la URL va en el atributo src. 
        He usado una URL de ejemplo ya que la tuya es incompleta.
      }
     /* <iframe 
        src="https://maps.google.com/maps?q=Av.%20Rivadavia%2012345&t=&z=15&ie=UTF8&iwloc=&output=embed" 
        width="100%" 
        height="300" 
        style={{ border: 0 }} 
        allowFullScreen="" 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
        title="Mapa ITF4"
      ></iframe>

      <h3>ITF9 - Av. San Juan 9876</h3>
      <iframe 
        src="https://maps.google.com/maps?q=Av.%20San%20Juan%209876&t=&z=15&ie=UTF8&iwloc=&output=embed" 
        width="100%" 
        height="300" 
        style={{ border: 0 }} 
        allowFullScreen="" 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
        title="Mapa ITF9"
      ></iframe>

      <h3>ITF12 - Av. Corrientes 4567</h3>
      <iframe 
        src="https://maps.google.com/maps?q=Av.%20Corrientes%204567&t=&z=15&ie=UTF8&iwloc=&output=embed" 
        width="100%" 
        height="300" 
        style={{ border: 0 }} 
        allowFullScreen="" 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
        title="Mapa ITF12"
      ></iframe>
    </div>
  );
};

export default Mapa;*/

/*import React from 'react';

const Mapa = () => {
return (
<div style={{ padding: '20px' }}>
<h2>¿Dónde encontrarnos?</h2>

<h3>ITF4 - Av. Rivadavia 12345</h3>
https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.415379575084!2d-58.47234568477056!3d-34.64234558045237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccd6c3c0c3f3f%3A0x2f0b0e0e0e0e0e0e!2sMurgiondo%202126%2C%20C1440%20CABA!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar</iframe>

<h3>ITF9 - Av. San Juan 9876</h3>
https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.415379575084!2d-58.47234568477056!3d-34.64234558045237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccd6c3c0c3f3f%3A0x2f0b0e0e0e0e0e0e!2sSan%20Juan%209876%2C%20CABA!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar</iframe>

<h3>ITF12 - Av. Corrientes 4567</h3>
https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.415379575084!2d-58.47234568477056!3d-34.64234558045237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccd6c3c0c3f3f%3A0x2f0b0e0e0e0e0e0e!2sCorrientes%204567%2C%20CABA!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar</iframe>
</div>
);
};

export default Mapa;*/

/*const Mapa = () => {
return (
<div style={{ width: '100%', height: '450px' }}>
<iframe
src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.415379575084!2d-58.47234568477056!3d-34.64234558045237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccd6c3c0c3f3f%3A0x2f0b0e0e0e0e0e0e!2sMurgiondo%202126%2C%20C1440%20CABA!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar"
width="100%"
height="100%"
style={{ border: 0 }}
allowFullScreen=""
loading="lazy"
referrerPolicy="no-referrer-when-downgrade"
title="Ubicación Murgiondo 2126"
></iframe>
</div>
);
};

export default Mapa;*/
