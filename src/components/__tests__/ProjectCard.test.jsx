import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectCard from '../ProjectCard';

const mockProject = {
  id: '1',
  name: 'Test Project',
  description: 'Test Description',
  chain: 'Ethereum',
  tvl: 1000000,
  wallets: 500,
  hype: 'High',
  score: 85,
  mentions: [],
  commits: 25
};

describe('ProjectCard', () => {
  it('renders project information correctly', () => {
    render(<ProjectCard project={mockProject} onSelect={() => {}} />);
    
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Ethereum')).toBeInTheDocument();
    expect(screen.getByText('$1,000,000')).toBeInTheDocument();
    expect(screen.getByText('500')).toBeInTheDocument();
  });

  it('calls onSelect when clicked', () => {
    const handleSelect = jest.fn();
    render(<ProjectCard project={mockProject} onSelect={handleSelect} />);
    
    fireEvent.click(screen.getByText('Test Project'));
    expect(handleSelect).toHaveBeenCalledWith(mockProject.id);
  });

  it('displays correct hype level', () => {
    render(<ProjectCard project={mockProject} onSelect={() => {}} />);
    
    const hypeChip = screen.getByText('High');
    expect(hypeChip).toBeInTheDocument();
  });

  it('displays correct score', () => {
    render(<ProjectCard project={mockProject} onSelect={() => {}} />);
    
    expect(screen.getByText('85')).toBeInTheDocument();
  });
}); 