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
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-12">
        <h1 className="text-4xl font-semibold mb-4">
          About ChainPulse
        </h1>
        <p className="text-xl text-secondary-foreground">
          Empowering investors with real-time onchain insights
        </p>
      </div>

      {/* Mission Section */}
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Our Mission
            </h2>
            <p className="text-secondary-foreground mb-4">
              ChainPulse is dedicated to providing investors with comprehensive onchain analytics
              and real-time insights to make informed decisions in the rapidly evolving blockchain
              ecosystem.
            </p>
            <p className="text-secondary-foreground">
              We combine advanced data analysis, machine learning, and blockchain expertise to
              deliver actionable signals and metrics that help identify promising projects
              before they gain mainstream attention.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              What We Offer
            </h2>
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-lg font-semibold text-primary mb-1">
                  Real-time Analytics
                </p>
                <p className="text-secondary-foreground">
                  Track project metrics, wallet activity, and social signals in real-time
                </p>
              </div>
              <div>
                <p className="text-lg font-semibold text-primary mb-1">
                  Early Signals
                </p>
                <p className="text-secondary-foreground">
                  Identify promising projects through our proprietary scoring system
                </p>
              </div>
              <div>
                <p className="text-lg font-semibold text-primary mb-1">
                  API Access
                </p>
                <p className="text-secondary-foreground">
                  Integrate our data into your own applications and trading systems
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <h2 className="text-3xl font-semibold mb-8">
        Our Team
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {team.map((member) => (
          <div key={member.name}>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 h-full flex flex-col items-center text-center">
              <Avatar
                src={member.avatar}
                sx={{ width: 120, height: 120, mb: 4 }}
              />
              <h3 className="text-xl font-semibold mb-2">
                {member.name}
              </h3>
              <p className="text-primary mb-4">
                {member.role}
              </p>
              <p className="text-secondary-foreground mb-6 flex-grow">
                {member.bio}
              </p>
              <div className="flex justify-center gap-4">
                <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                  <GitHubIcon className="text-secondary-foreground hover:text-foreground w-6 h-6" />
                </a>
                <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                  <TwitterIcon className="text-secondary-foreground hover:text-foreground w-6 h-6" />
                </a>
                <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                  <LinkedInIcon className="text-secondary-foreground hover:text-foreground w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-8">
        <h2 className="text-2xl font-semibold mb-4">
          Get in Touch
        </h2>
        <p className="text-secondary-foreground mb-6">
          Have questions or want to learn more about ChainPulse? We'd love to hear from you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            startIcon={<EmailIcon />}
            href="mailto:contact@chainpulse.io"
          >
            Contact Us
          </Button>
          <Button
            variant="outline"
            startIcon={<GitHubIcon />}
            href="https://github.com/chainpulse"
            target="_blank"
          >
            GitHub
          </Button>
        </div>
      </div>
    </div>
  );
} 