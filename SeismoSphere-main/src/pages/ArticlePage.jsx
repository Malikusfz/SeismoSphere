import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  CardGroup,
  ListGroup,
  ListGroupItem,
  CardHeader,
} from "reactstrap";

function ArticlePage() {
  return (
    <>
      <section>
        <Card className="my-2">
          <CardBody>
            <CardTitle tag="h5" align="center">
              Tanda Tanda Gempa
            </CardTitle>
            <CardGroup>
              <Card style={{ width: "18rem" }}>
                <CardHeader tag="h5">Sebelum Gempa</CardHeader>
                <ListGroup flush>
                  <ListGroupItem>Perubahan perilaku hewan</ListGroupItem>
                  <ListGroupItem>Kenaikan air tanah</ListGroupItem>
                  <ListGroupItem>Perubahan medan magnet bumi</ListGroupItem>
                  <ListGroupItem>Gas yang keluar dari tanah</ListGroupItem>
                </ListGroup>
              </Card>
              <Card style={{ width: "18rem" }}>
                <CardHeader tag="h5">Selama Gempa</CardHeader>
                <ListGroup flush>
                  <ListGroupItem>Getaran tanah</ListGroupItem>
                  <ListGroupItem>Suara gemuruh</ListGroupItem>
                  <ListGroupItem>Pergerakan objek dan bangunan</ListGroupItem>
                  <ListGroupItem>Perubahan permukaan tanah</ListGroupItem>
                </ListGroup>
              </Card>
              <Card style={{ width: "18rem" }}>
                <CardHeader tag="h5">Setelah Gempa</CardHeader>
                <ListGroup flush>
                  <ListGroupItem>Gempa bumi susulan</ListGroupItem>
                  <ListGroupItem>Perubahan dalam sumber air</ListGroupItem>
                  <ListGroupItem>Kerusakan infrastruktur</ListGroupItem>
                  <ListGroupItem>Tsunami</ListGroupItem>
                </ListGroup>
              </Card>
            </CardGroup>
          </CardBody>
        </Card>
      </section>

      <section>
        <Card className="my-2">
          <CardBody>
            <CardTitle tag="h5" align="center">
              Penanggulangan Gempa
            </CardTitle>
            <CardGroup>
              <Card style={{ width: "18rem" }}>
                <CardImg top alt="Sample" src="https://picsum.photos/300/200" />
                <CardBody>
                  <CardTitle tag="h5">Drop</CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6" align="justify">
                    Segera jatuhkan diri Anda ke lantai atau tanah
                  </CardSubtitle>
                  <CardText align="justify">
                    Ini membantu Anda mengurangi risiko jatuh selama gempa, yang bisa menyebabkan cedera.
                  </CardText>
                </CardBody>
              </Card>
              <Card style={{ width: "18rem" }}>
                <CardImg top alt="Sample" src="https://picsum.photos/300/200" />
                <CardBody>
                  <CardTitle tag="h5">Cover</CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6" align="justify">
                    Berlindung di bawah furnitur yang kokoh melindungi Anda
                  </CardSubtitle>
                  <CardText align="justify">
                    Berlindung di bawah meja atau furnitur yang kokoh. Jika tidak ada meja atau furnitur, gunakan lengan Anda untuk melindungi kepala dan leher dan cari perlindungan di dekat dinding dalam jauhi jendela, kaca, atau benda yang dapat jatuh.
                  </CardText>
                </CardBody>
              </Card>
              <Card style={{ width: "18rem" }}>
                <CardImg top alt="Sample" src="https://picsum.photos/300/200" />
                <CardBody>
                  <CardTitle tag="h5">Hold On</CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6" align="justify">
                    Pegang kuat pada furnitur yang Anda gunakan sebagai perlindungan
                  </CardSubtitle>
                  <CardText align="justify">
                    Menggenggam furnitur membantu menjaga perlindungan Anda tetap stabil di atas Anda. Jika Anda tidak berada di bawah furnitur, tetap di tempat dan melindungi kepala dan leher meminimalkan risiko bergerak ke daerah yang lebih berbahaya.
                  </CardText>
                </CardBody>
              </Card>
            </CardGroup>
          </CardBody>
        </Card>
      </section>
    </>
  );
}

export default ArticlePage;
