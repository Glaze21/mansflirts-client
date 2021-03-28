import React, { Fragment, useState, useEffect } from "react";
import FooterNavBar from "../footerUtil/FooterNavBar";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Markdown from "../footerUtil/Markdown";
import privacyFile from "../footerUtil/privacy.md";
import withRoot from "../footerUtil/withRoot";
import Footer from "../Footer";

function Privacy() {
  const [privacy, setPrivacy] = useState("");
  useEffect(() => {
    fetch(privacyFile)
      .then((res) => res.text())
      .then((text) => {
        setPrivacy(text);
      });
  }, []);
  return (
    <Fragment>
      <FooterNavBar />
      <Container>
        <Box mt={15} mb={12}>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Privātuma politika
            <span className="footerTitleUnderline"></span>
          </Typography>
          <Markdown>{privacy}</Markdown>
        </Box>
      </Container>
      <Footer />
    </Fragment>
  );
}

export default withRoot(Privacy);
