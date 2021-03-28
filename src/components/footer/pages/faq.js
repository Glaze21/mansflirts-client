import React, { Component } from "react";
import FooterNavBar from "../footerUtil/FooterNavBar";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Footer from "../Footer";
import { makeStyles } from "@material-ui/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  // title: {
  //   color: "rgba(0, 0, 0, 0.87)",
  //   fontSize: 42,
  //   fontFamily: "Open Sans, sans-serif",
  //   fontWeight: 500,
  //   lineHeight: 1.167,
  //   letterSpacing: "0em",
  //   textTransform: "uppercase",
  // },
  // question: {
  //   "&:hover": {
  //     cursor: "pointer",
  //     color: "pink",
  //     backgroundColor: "white",
  //   },
  //   "&:focus": {
  //     backgroundColor: "white",
  //   },
  // },
  // answer: {
  //   marginLeft: 15,
  // },
}));

var list = [
  {
    id: 1,
    question: "Kāpēc es nevaru nosūtīt ziņu?",
    answer:
      "Lai nosūtītu ziņu, jums nepieciešamas 30 monētas. Ja jūs nevarat nosūtīt ziņu, tad, visticamāk, jums nepieciešams iegādāties papildus monētas.",
  },
  {
    id: 2,
    question: "Kur pazuda manas monētas?",
    answer: `Ja esat iegādājies monētas un jūsu pašreizējais atlikums parāda 0 Monētas, ir 2 iespējas:\n
            1. Jūs jau esat izmantojis visas monētas. Lūdzu, ņemiet vērā, ka ziņas nosūtīšana vienmēr maksā 30 monētas.\n
            2. Jūs vai jūsu banka esat atcēluši pirkumu, un jums ir nesamaksāts atlikums, kas vispirms jāsamaksā. Lūdzu, sazinieties ar mums, lai iegūtu papildinformāciju: info@istaiespeja.lv.
            `,
  },
  {
    id: 3,
    question: "Manas pirktās monētas nav pieejamas",
    answer:
      "Tehnisku iemeslu dēļ iespējama kavēšanās starp monētu iegādi un monētu saņemšanu. Ja monētas nepārādās pēc 30 minūtēm, lūdzu, sazinieties ar mums caur e-pasta adresi: info@istaiespeja.lv.",
  },
  {
    id: 4,
    question: "Kā izdzēst savu profilu?",
    answer:
      "Jūsu profila sadaļā nospiediet pogu 'Izdzēst profilu', kura atrodās lapas apakšā.",
  },
  {
    id: 5,
    question: "Kādi dati tiek izdzēsti?",
    answer:
      "Mēs izdzēšam pilnīgi visus datus, kas ir saistīti ar jūsu profilu, tiek izdzēsts viss, ieskaitot jūsu nosūtītās ziņas un maksāšanas vēsture.",
  },
  {
    id: 6,
    question: "Vai iespējams dabūt monētas bezmaksas?",
    answer:
      "Šobrīd mēs nepiedāvājam iespēju nopelnīt bezmaksas monētas. Ja jums vajadzēs vairāk monētu, jums tās būs jāpērk.",
  },
  {
    id: 7,
    question: "Esmu runājies ar kādu, bet vairs nevaru sarunāties par brīvu",
    answer:
      "Ziņu sūtīšana vienmēr maksā monētas, kā tas aprakstīts mūsu pakalpojumu sniegšanas noteikumos. Lai turpinātu sazināties ar lietotājiem, iegādājieties papildus monētas.",
  },
  {
    id: 8,
    question: "Vai es varētu iegādāties nedēļas vai mēneša VIP piederību?",
    answer:
      "Šobrīd nepiedāvājam nevienu abonēšanas / VIP modeli. Pērkot monētas, jūs saņemat tikai tās monētas, par kurām esat samaksājis. Kad šīs monētas būs iztērētas, jūs varat izlemt vai vēlāties papildus monētas.",
  },
  {
    id: 9,
    question: "Kāpēc sadaļā Profils nav iespējams nomainīt e-pastu un paroli?",
    answer:
      "Iespēja nomainīt paroli un e-pastu pieejama tikai lietotājiem, kas piereģistrējās izmantojot e-pastu un paroli. Ja Jūs izmantojat Facebook, lai pieslēgtos mājaslapai, tad ši opcija jums nebūs pieejama.",
  },
  {
    id: 10,
    question:
      "Man ir ideja mājaslapas uzlabojumiem vai es esmu atradis kļūmi, par ko vēlos ziņot. Kur man to darīt?",
    answer:
      "Visus ieteikumu sūtiet uz e-pastu: info@istaiespeja.lv. Ja esat atradis kļūmi mājaslapā, tad, lūdzu, sazinieties ar mums un aprakstiet kļūmi pēc iespējas detalizētāk.",
  },
];
function Faq() {
  const classes = useStyles();
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {console.log(list)}
      {list.map((item) => (
        <Accordion key={item.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id={item.id}
          >
            <Typography className={classes.heading}>{item.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{item.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      {/* <FooterNavBar />
        <Container style={{ marginBottom: "3.4rem" }}>
          <Box mt={7} mb={4.5}>
            <Typography
              variant="h3"
              gutterBottom
              marked="center"
              align="center"
              className={classes.title}
            >
              Jautājumi
              <span className="footerTitleUnderline"></span>
            </Typography>
          </Box>
          <div>
            {items.list.map((list) => {
              return (
                <List key={list.id}>
                  <div>
                    <ListItem
                      className={classes.question}
                      onClick={this.handleClick.bind(this, list.name)}
                    >
                      <ListItemText primary={list.name} />
                      {this.state[list.name] ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse
                      component="li"
                      in={this.state[list.name]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List disablePadding>
                        {list.items.map((item) => {
                          return (
                            <ListItem key={item.id} className={classes.answer}>
                              <ListItemText primary={item.name} />
                            </ListItem>
                          );
                        })}
                      </List>
                    </Collapse>
                  </div>
                  <Divider absolute />
                </List>
              );
            })}
          </div>
        </Container>
        <div style={{ flex: 1 }} />
        <Footer /> */}
    </div>
  );
}

export default Faq;
