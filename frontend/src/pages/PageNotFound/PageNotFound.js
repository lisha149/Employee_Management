import React from "react";
import { Col, Row, Card, Image, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import NotFoundImage from "../../assets/404.svg";

const PageNotFound = () => {
  return (
    <main>
      <section className="vh-100 d-flex align-items-center justify-content-center">
        <Container>
          <Row>
            <Col
              xs={12}
              className="text-center d-flex align-items-center justify-content-center"
            >
              <div>
                <Card.Link as={Link} to="/">
                  <Image src={NotFoundImage} className="img-fluid w-75" />
                </Card.Link>
                <h1 className="text-primary mt-5">
                  Page not <span className="fw-bolder">found</span>
                </h1>
                <p className="lead my-4">
                  Oops! Looks like you followed a bad link. If you think this is
                  a problem with us, please tell us.
                </p>
                <Button
                  as={Link}
                  variant="primary"
                  className="animate-hover"
                  to="/"
                >
                  <div className=" me-3 ms-2">
                    <i class="fa-solid fa-left"></i>
                    Go back home
                  </div>
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default PageNotFound;
