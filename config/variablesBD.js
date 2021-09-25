// variables para poblar la base de datos
// Publicaciones
const imagenes=[
    'https://cdn.pixabay.com/photo/2016/09/08/18/45/cube-1655118_960_720.jpg',
    'https://cdn.pixabay.com/photo/2015/03/17/02/01/cubes-677092_960_720.png',
    'https://cdn.pixabay.com/photo/2019/03/28/10/19/sunset-4086848_960_720.jpg',
    'https://cdn.pixabay.com/photo/2021/08/20/14/53/monastery-6560623_960_720.jpg',
    'https://cdn.pixabay.com/photo/2015/04/11/15/21/tabby-717806_960_720.jpg',
    'https://cdn.pixabay.com/photo/2021/09/20/16/47/pumpkins-6641314_960_720.jpg',
    'https://cdn.pixabay.com/photo/2021/08/22/05/32/cathedral-6564157_960_720.jpg',
    'https://cdn.pixabay.com/photo/2020/06/29/14/15/lightbulb-5352822_960_720.jpg',
    'https://cdn.pixabay.com/photo/2021/04/26/01/39/trees-6207925_960_720.jpg',
    'https://cdn.pixabay.com/photo/2021/09/20/16/47/pumpkins-6641314_960_720.jpg',
    'https://cdn.pixabay.com/photo/2021/07/28/08/44/elephants-6498609_960_720.jpg',
    'https://cdn.pixabay.com/photo/2021/07/20/03/39/fisherman-6479663_960_720.jpg',
    'https://cdn.pixabay.com/photo/2021/07/31/12/26/plane-6511877_960_720.jpg',
    'https://cdn.pixabay.com/photo/2021/03/29/01/54/wallaby-6132753_960_720.jpg',
    'https://cdn.pixabay.com/photo/2021/08/20/03/13/birds-6559371_960_720.jpg',
    'https://cdn.pixabay.com/photo/2020/09/24/13/30/leaves-5598709_960_720.png',
    'https://cdn.pixabay.com/photo/2021/01/19/18/45/field-5932123_960_720.jpg',
    'https://cdn.pixabay.com/photo/2021/08/29/13/19/kingfisher-6583229_960_720.jpg'
];
const descripciones = [
    'Por muy corto que sea el camino. Quien pisa fuerte, ¡deja huella!',
    'A quien debes retar, impresionar, y superar es a ti misma.',
    'Vivir de las apariencias te hace esclavo de los demás.',
    'Cada uno tiene su historia. Yo estoy aquí para aprender, no para juzgar.',
    'La vida continua, con o sin ti.',
    'A veces hay que seguir. Como si nada, como si nadie, como nunca',
    'Cuando quieres algo, todo el universo conspira para que realices tu deseo.',
    'Deseo que veas más atardeceres que series de Netflix.',
    'Para vivir más tiempo tenemos que envejecer.',
    'Tu cuerpo escucha todo lo que dice tu mente. Sé positiva.',
    '¿Tomas algo para ser feliz? Sí, decisiones.',
    'Continúa sonriendo, porque la vida es bella y hay muchas cosas por las que sonreír.',
    'Hay que mirar más allá de lo que ves.',
    'Una mentalidad positiva te ayuda a triunfar, piensa bien para vivir mejor.',
    'No hay medicina que cure lo que no cura la felicidad.',
    'Y descubrirás que esperar no es la mejor forma de ser libre.',
    'La felicidad es como la gripe: un estado que se transmite, se contagia y se propaga.',
    'Juzgar una persona no define quien es ella. Define quien eres tú.',
    'No le llames sueño, llámalo plan'
];
// Comentarios
const attachment = [true,false];
const texto = descripciones;

module.exports = {
    imagenes,
    descripciones,
    attachment,
    texto
};