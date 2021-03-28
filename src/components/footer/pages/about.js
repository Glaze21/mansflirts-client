import React, { Component } from "react";
import FooterNavBar from "../footerUtil/FooterNavBar";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Markdown from "../footerUtil/Markdown";
import about from "../footerUtil/about.md";
import withRoot from "../footerUtil/withRoot";
import Footer from "../../../components/Footer";

class About extends Component {
  state = {
    about: "",
  };
  componentWillMount() {
    fetch(about)
      .then((res) => res.text())
      .then((about) => {
        this.setState({ about });
      });
  }
  render() {
    let { about } = this.state;

    return (
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <FooterNavBar />
        <Container style={{ marginBottom: "10.4rem" }}>
          <Box mt={7} mb={12}>
            <Typography
              variant="h3"
              marked="center"
              align="center"
              style={{ marginBottom: 36 }}
            >
              Par Mums
              <span className="footerTitleUnderline"></span>
            </Typography>
            <Markdown>{about}</Markdown>
          </Box>
        </Container>
        <div style={{ flex: 1 }} />
        <Footer />
      </div>
    );
  }
}

export default withRoot(About);
