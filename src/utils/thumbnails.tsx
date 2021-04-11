import Img from 'next/image';

const thumbnails = ['facebook', 'twitter', 'linkedin', 'mail'];

const mapped = thumbnails.map(t => <Img src={`/icons/${t}.png`} width={50} height={50} />);
const [facebook, twitter, linkedin, mail] = mapped;

export { facebook, twitter, linkedin, mail };