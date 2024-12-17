import React from "react";
import styled from "styled-components";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { Snackbar, Alert } from "@mui/material";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  @media (max-width: 960px) {
    padding: 0px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 0px 0px 80px 0px;
  gap: 12px;
  padding: 54px 0px 80px 0px;
  @media (max-width: 960px) {
    flex-direction: column;
    padding: 63px 18px 54px 18px;
  }
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`;

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  padding: 32px;
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  font-size: 24px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid #678dd4;
  }
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid #678dd4;
  }
`;

const ContactButton = styled.input`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: hsla(120, 80%, 50%, 1); /* Radiant green */
  background: linear-gradient(
    225deg,
    hsla(120, 62%, 44%, 1) 0%,
    hsla(0, 0%, 20%, 1) 100%
  ); /* Radiant green to light black */
  background: -moz-linear-gradient(
    225deg,
    hsla(120, 60%, 41%, 1) 0%,
    hsla(0, 0%, 20%, 1) 100%
  );
  background: -webkit-linear-gradient(
    225deg,
    hsla(120, 61%, 39%, 1) 0%,
    hsla(0, 0%, 20%, 1) 100%
  );
  &:hover {
    //     transform: scale(1.05);
    // transition: all 0.4s ease-in-out;
    box-shadow:  20px 20px 60px #1F2634,
    filter: brightness(1);
    cursor: pointer;
    }
    &:active {
    transform: scale(0.95); 
    box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.2); 
  }
    &:disabled {
    background: gray;
    cursor: not-allowed;
    opacity: 0.6; 
  }
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
`;

const Contact = () => {
  //hooks
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [notificationMessage, setNotificationMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("success");
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_mgw68jm",
        "template_3vm0rmu",
        form.current,
        "bH-M9B48cT7dt6Hg_"
      )
      .then(
        (result) => {
          console.log("Email sent successfully:", result);
          setNotificationMessage("Email sent successfully!");
          setSeverity("success");
          setOpen(true);
          form.current.reset();
          setEmail("");
          setName("");
          setSubject("");
          setMessage("");
        },
        (error) => {
          console.error("Error sending email:", error);
          setNotificationMessage("Failed to send email. Please try again.");
          setSeverity("error");
          setOpen(true);
        }
      );
  };

  const isFormValid =
    email.trim() && name.trim() && subject.trim() && message.trim();

  return (
    <Container id="contact">
      <Wrapper>
        <Title>Contact</Title>
        <Desc>
          I would be delighted to connect! Please feel free to reach out if you
          have any questions or opportunities.
        </Desc>
        <ContactForm ref={form} onSubmit={handleSubmit}>
          <ContactTitle>Let's Connect 📧</ContactTitle>
          <ContactInput
            placeholder="Please enter your email"
            name="from_email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
          <ContactInput
            placeholder="Please enter your name"
            name="from_name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
          />
          <ContactInput
            placeholder="Subject"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            autoComplete="off"
          />
          <ContactInputMessage
            placeholder="Message"
            rows="4"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoComplete="off"
          />
          <ContactButton type="submit" value="Send" disabled={!isFormValid} />
        </ContactForm>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          sx={{
            zIndex: 9999,
            position: "absolute",
            top: "25%",
          }}
        >
          <Alert
            onClose={() => setOpen(false)}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {notificationMessage}
          </Alert>
        </Snackbar>
      </Wrapper>
    </Container>
  );
};

export default Contact;
