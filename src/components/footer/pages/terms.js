import React, { Fragment, useState, useEffect } from "react";
import FooterNavBar from "../footerUtil/FooterNavBar";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Markdown from "../footerUtil/Markdown";
import termsFile from "../footerUtil/terms.md";
import withRoot from "../footerUtil/withRoot";
import Footer from "../Footer";

function Terms() {
  const [terms, setTerms] = useState("");
  useEffect(() => {
    fetch(termsFile)
      .then((res) => res.text())
      .then((text) => {
        setTerms(text);
      });
  }, []);
  return (
    <Fragment>
      <FooterNavBar />
      <Container>
        <Box mt={15} mb={12}>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Vadlīnijas
            <span className="footerTitleUnderline"></span>
          </Typography>
          <Markdown>{terms}</Markdown>
        </Box>
      </Container>
      <Footer />
    </Fragment>
  );
}

export default withRoot(Terms);
