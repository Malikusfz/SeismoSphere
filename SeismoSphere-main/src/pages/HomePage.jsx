import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EarthquakeContext from "../state/EarthquakeContext";
import { actions } from "../state/earthquake";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  CardGroup,
  CardSubtitle,
  Row,
  Col,
} from "reactstrap";

function HomePage() {
  const [latestEarthquake, setLatestEarthquake] = useState(null);
  const [loading, setLoading] = useState(true);
  const { dispatch } = useContext(EarthquakeContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEarthquakes = async () => {
      try {
        const cachedData = localStorage.getItem("earthquakes");
        if (cachedData) {
          const earthquakes = JSON.parse(cachedData);
          setLatestEarthquake(earthquakes[0]);
          setLoading(false);
        } else {
          const response = await axios.get(
            "https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json"
          );
          const earthquakes = response.data.Infogempa.gempa;
          setLatestEarthquake(earthquakes[0]);
          localStorage.setItem("earthquakes", JSON.stringify(earthquakes));
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchEarthquakes();
  }, []);

  const handleRowClick = (gempa) => {
    dispatch(actions.setSelectedEarthquake(gempa));
    navigate("/map");
  };

  return (
    <>
      <header>
        <h1>SeismoSphere</h1>
        <p>Lacak Gempa Secara Real-Time dan Selalu Siaga!</p>
      </header>
      <main>
        <section>
          <Row>
            <Col sm="6">
              <Card body>
                <CardTitle tag="h5">Gempa</CardTitle>
                <CardImg
                  alt="Card image cap"
                  src="https://picsum.photos/300/200"
                  style={{ width: "100%", height: "auto" }}
                />
                <CardText>
                  Gempa adalah getaran permukaan bumi akibat pelepasan energi
                  dari dalam bumi secara tiba-tiba.
                </CardText>
              </Card>
            </Col>
            <Col sm="6">
              <Card body>
                <CardTitle tag="h5">Gempa Bumi Terkini</CardTitle>
                {loading ? (
                  <CardText>Loading...</CardText>
                ) : (
                  latestEarthquake && (
                    <>
                      <CardText
                        onClick={() => handleRowClick(latestEarthquake)}
                      >
                        <strong>Tanggal:</strong> {latestEarthquake.Tanggal}
                      </CardText>
                      <CardText>
                        <strong>Waktu:</strong> {latestEarthquake.Jam}
                      </CardText>
                      <CardText>
                        <strong>Magnitude:</strong> {latestEarthquake.Magnitude}
                      </CardText>
                      <CardText>
                        <strong>Kedalaman:</strong> {latestEarthquake.Kedalaman}
                      </CardText>
                      <CardText>
                        <strong>Wilayah:</strong> {latestEarthquake.Wilayah}
                      </CardText>
                    </>
                  )
                )}
              </Card>
            </Col>
          </Row>
        </section>

        <section>
          <Card className="my-2">
            <CardBody>
              <CardTitle tag="h5" align="center">
                Jenis Jenis Gempa
              </CardTitle>
              <CardGroup>
                <Card
                  style={{
                    width: "18rem",
                  }}
                >
                  <img alt="Sample" src="https://picsum.photos/300/200" />
                  <CardBody>
                    <CardTitle tag="h5">Gempa Tektonik</CardTitle>
                    <CardText>
                      Gempa ini disebabkan oleh pergerakan lempeng tektonik di
                      kerak bumi. Ini adalah jenis gempa yang paling umum dan
                      sering kali paling merusak.
                    </CardText>
                  </CardBody>
                </Card>
                <Card
                  style={{
                    width: "18rem",
                  }}
                >
                  <img alt="Sample" src="https://picsum.photos/300/200" />
                  <CardBody>
                    <CardTitle tag="h5">Gempa Vulkanik</CardTitle>
                    <CardText>
                      Gempa ini terjadi akibat aktivitas vulkanik, seperti
                      letusan gunung berapi atau pergerakan magma di dalam bumi.
                    </CardText>
                  </CardBody>
                </Card>
                <Card
                  style={{
                    width: "18rem",
                  }}
                >
                  <img alt="Sample" src="https://picsum.photos/300/200" />
                  <CardBody>
                    <CardTitle tag="h5">Gempa Reruntuhan</CardTitle>
                    <CardText>
                      Gempa ini disebabkan oleh runtuhan tanah atau batuan di
                      daerah karst atau tambang. Mereka biasanya lebih kecil dan
                      lokal.
                    </CardText>
                  </CardBody>
                </Card>
              </CardGroup>
            </CardBody>
          </Card>
        </section>
      </main>
    </>
  );
}

export default HomePage;
