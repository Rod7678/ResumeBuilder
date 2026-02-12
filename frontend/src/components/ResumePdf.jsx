import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
    fontFamily: "Helvetica"
  },
  heading: {
    fontSize: 18,
    marginBottom: 10
  },
  section: {
    marginBottom: 10
  },
  title: {
    fontSize: 14,
    marginBottom: 4
  }
});

const ResumePDF = ({ user }) => {
  // const { user, professional, education, projects } = resume;
  if(!user) null;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.heading}>{user.full_name}</Text>
        <Text>{user.email}</Text>
        <Text>{user.phone}</Text>
        <Text>{user.location}</Text>

        <View style={styles.section}>
          <Text style={styles.title}>Professional Experience</Text>
          {/* {professional.map(p => (
            <Text key={p.id}>
              {p.job_role} ({p.joining_date})
            </Text>
          ))} */}
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Education</Text>
          {/* {education.map(e => (
            <Text key={e.id}>
              {e.degree} - {e.institute_name}
            </Text>
          ))} */}
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Projects</Text>
          {/* {projects.map(pr => (
            <Text key={pr.id}>{pr.project_title}</Text>
          ))} */}
        </View>
      </Page>
    </Document>
  );
};

export default ResumePDF;
