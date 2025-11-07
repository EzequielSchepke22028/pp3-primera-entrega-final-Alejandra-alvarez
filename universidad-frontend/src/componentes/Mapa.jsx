const Mapa = () => {
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

export default Mapa;
