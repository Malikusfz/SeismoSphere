import React from 'react';
import {
  Card, CardGroup, CardImg, CardBody, CardTitle, CardText, CardSubtitle, Fade,
} from 'react-bootstrap';
import DropImg from '../images/Drop.png';
import CoverImg from '../images/Cover.png';
import HoldOnImg from '../images/HoldOn.png';

const getActionImage = (action) => {
  switch (action) {
    case 'Drop':
      return DropImg;
    case 'Cover':
      return CoverImg;
    case 'Hold On':
      return HoldOnImg; 
    default:
      return '';
  }
};

const getActionSubtitle = (action) => {
  switch (action) {
    case 'Drop':
      return 'Segera jatuhkan diri Anda ke lantai atau tanah';
    case 'Cover':
      return 'Berlindung di bawah furnitur yang kokoh melindungi Anda';
    case 'Hold On':
      return 'Pegang kuat pada furnitur yang Anda gunakan sebagai perlindungan';
    default:
      return '';
  }
};

const getActionText = (action) => {
  switch (action) {
    case 'Drop':
      return 'Ini membantu Anda mengurangi risiko jatuh selama gempa, yang bisa menyebabkan cedera.';
    case 'Cover':
      return 'Berlindung di bawah meja atau furnitur yang kokoh. Jika tidak ada meja atau furnitur, gunakan lengan Anda untuk melindungi kepala dan leher dan cari perlindungan di dekat dinding dalam jauhi jendela, kaca, atau benda yang dapat jatuh.';
    case 'Hold On':
      return 'Menggenggam furnitur membantu menjaga perlindungan Anda tetap stabil di atas Anda. Jika Anda tidak berada di bawah furnitur, tetap di tempat dan melindungi kepala dan leher meminimalkan risiko bergerak ke daerah yang lebih berbahaya.';
    default:
      return '';
  }
};

function EarthquakePrevention() {
  return (
    <Fade appear in>
      <Card className="my-2">
        <Card.Body>
          <Card.Title className="text-center">
            Penanggulangan Gempa
          </Card.Title>
          <CardGroup>
            {['Drop', 'Cover', 'Hold On'].map((action) => (
              <Card key={action} style={{ width: '18rem' }}>
                <CardImg variant="top" src={getActionImage(action)} alt={action} />
                <CardBody>
                  <CardTitle>{action}</CardTitle>
                  <CardSubtitle className="mb-2 text-muted">
                    {getActionSubtitle(action)}
                  </CardSubtitle>
                  <CardText>{getActionText(action)}</CardText>
                </CardBody>
              </Card>
            ))}
          </CardGroup>
        </Card.Body>
      </Card>
    </Fade>
  );
}

export default EarthquakePrevention;
