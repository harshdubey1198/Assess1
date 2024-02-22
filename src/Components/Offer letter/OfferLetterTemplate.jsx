import React from 'react';
import { useLocation } from 'react-router-dom';
import { PDFDownloadLink, Page, Text, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
  },
  content: {
    fontFamily: 'Arial',
    fontSize: 12,
    lineHeight: 1.5,
    textAlign: 'justify',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  greeting: {
    marginBottom: 10,
  },
  body: {
    marginBottom: 20,
  },
  detailHeader: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  details: {
    marginBottom: 20,
  },
  detail: {
    marginBottom: 5,
  },
  footer: {
    marginBottom: 20,
  },
  signature: {
    fontStyle: 'italic',
  },
});

const OfferLetterTemplate = () => {
  const routeLocation = useLocation();
  const formData = routeLocation.state;

  if (!formData) {
    return <div>Error: Form data is missing!</div>;
  }

  const { candidateName, designation, ctc, location, joiningDate, companyName } = formData;

  const PdfDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.text}>Dear {candidateName},</Text>
        <Text style={styles.text}>
          We are delighted to extend an offer for the position of {designation} at {companyName}. Your qualifications
          and experience align perfectly with what we are looking for, and we believe you will make a valuable addition
          to our team.
        </Text>
        <Text style={styles.text}>The details of the offer are as follows:</Text>
        <Text style={styles.text}>Position: {designation}</Text>
        <Text style={styles.text}>CTC: {ctc}</Text>
        <Text style={styles.text}>Location: {location}</Text>
        <Text style={styles.text}>Date of Joining: {joiningDate}</Text>
        <Text style={styles.text}>
          Please review this offer carefully and let us know your decision at your earliest convenience. We look forward
          to having you join our team and contribute to our success.
        </Text>
        <Text style={styles.text}>Best regards,</Text>
        <Text style={styles.text}>[Your Name]</Text>
        <Text style={styles.text}>[Your Position]</Text>
        <Text style={styles.text}>[Company Name]</Text>
      </Page>
    </Document>
  );

  return (
    <div>
      <h2>Offer Letter</h2>
      <PDFDownloadLink document={<PdfDocument />} fileName="offer_letter.pdf">
       <button> {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}download pdf</button>
      </PDFDownloadLink>
    </div>
  );
};

export default OfferLetterTemplate;
