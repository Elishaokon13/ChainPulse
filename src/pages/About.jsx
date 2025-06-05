import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  Button,
  Avatar,
  Divider,
  IconButton
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon
} from '@mui/icons-material';

const team = [
  {
    name: 'John Doe',
    role: 'Founder & CEO',
    bio: '10+ years in blockchain development and analytics',
    avatar: 'https://i.pravatar.cc/150?img=1',
    social: {
      github: 'https://github.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com'
    }
  },
  {
    name: 'Jane Smith',
    role: 'Lead Developer',
    bio: 'Expert in onchain analytics and data science',
    avatar: 'https://i.pravatar.cc/150?img=2',
    social: {
      github: 'https://github.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com'
    }
  },
  {
    name: 'Mike Johnson',
    role: 'Data Scientist',
    bio: 'Specialized in blockchain metrics and ML',
    avatar: 'https://i.pravatar.cc/150?img=3',
    social: {
      github: 'https://github.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com'
    }
  }
];

export default function About() {
  return (
    <Box>
      {/* Header Section */}
      <Box sx={{ mb: 6 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontFamily: 'Charter',
            fontWeight: 600,
            color: 'primary.main',
            mb: 2
          }}
        >
          About ChainPulse
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Empowering investors with real-time onchain insights
        </Typography>
      </Box>

      {/* Mission Section */}
      <Paper sx={{ 
        p: 4,
        mb: 6,
        background: 'linear-gradient(145deg, #ffffff 0%, #e8f0fe 100%)',
        border: '1px solid rgba(26, 115, 232, 0.1)'
      }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Our Mission
            </Typography>
            <Typography paragraph>
              ChainPulse is dedicated to providing investors with comprehensive onchain analytics
              and real-time insights to make informed decisions in the rapidly evolving blockchain
              ecosystem.
            </Typography>
            <Typography paragraph>
              We combine advanced data analysis, machine learning, and blockchain expertise to
              deliver actionable signals and metrics that help identify promising projects
              before they gain mainstream attention.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              What We Offer
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  Real-time Analytics
                </Typography>
                <Typography>
                  Track project metrics, wallet activity, and social signals in real-time
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  Early Signals
                </Typography>
                <Typography>
                  Identify promising projects through our proprietary scoring system
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  API Access
                </Typography>
                <Typography>
                  Integrate our data into your own applications and trading systems
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Team Section */}
      <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
        Our Team
      </Typography>
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {team.map((member) => (
          <Grid item xs={12} md={4} key={member.name}>
            <Card sx={{ 
              height: '100%',
              background: 'linear-gradient(145deg, #ffffff 0%, #e8f0fe 100%)',
              border: '1px solid rgba(26, 115, 232, 0.1)'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    src={member.avatar}
                    sx={{ width: 120, height: 120, mb: 2 }}
                  />
                  <Typography variant="h6" gutterBottom>
                    {member.name}
                  </Typography>
                  <Typography color="primary" gutterBottom>
                    {member.role}
                  </Typography>
                  <Typography color="text.secondary" align="center" paragraph>
                    {member.bio}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                  <IconButton 
                    color="primary" 
                    component="a" 
                    href={member.social.github}
                    target="_blank"
                  >
                    <GitHubIcon />
                  </IconButton>
                  <IconButton 
                    color="primary" 
                    component="a" 
                    href={member.social.twitter}
                    target="_blank"
                  >
                    <TwitterIcon />
                  </IconButton>
                  <IconButton 
                    color="primary" 
                    component="a" 
                    href={member.social.linkedin}
                    target="_blank"
                  >
                    <LinkedInIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Contact Section */}
      <Paper sx={{ 
        p: 4,
        background: 'linear-gradient(145deg, #ffffff 0%, #e8f0fe 100%)',
        border: '1px solid rgba(26, 115, 232, 0.1)'
      }}>
        <Typography variant="h5" gutterBottom>
          Get in Touch
        </Typography>
        <Typography paragraph>
          Have questions or want to learn more about ChainPulse? We'd love to hear from you.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<EmailIcon />}
            href="mailto:contact@chainpulse.io"
          >
            Contact Us
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<GitHubIcon />}
            href="https://github.com/chainpulse"
            target="_blank"
          >
            GitHub
          </Button>
        </Box>
      </Paper>
    </Box>
  );
} 