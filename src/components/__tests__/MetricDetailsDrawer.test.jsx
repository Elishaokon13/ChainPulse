import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MetricDetailsDrawer from '../MetricDetailsDrawer';

const mockProject = {
  id: '1',
  name: 'Test Project',
  tvl: 1000000,
  wallets: 500,
  mentions: [],
  commits: 25
};

describe('MetricDetailsDrawer', () => {
  const defaultProps = {
    open: true,
    onClose: jest.fn(),
    project: mockProject,
    showBackArrow: true
  };

  it('renders TVL details correctly', () => {
    render(<MetricDetailsDrawer {...defaultProps} metric="tvl" />);
    
    expect(screen.getByText('Total Value Locked (TVL)')).toBeInTheDocument();
    expect(screen.getByText('$1,000,000')).toBeInTheDocument();
    expect(screen.getByText('Timeframe')).toBeInTheDocument();
  });

  it('renders wallet details correctly', () => {
    render(<MetricDetailsDrawer {...defaultProps} metric="wallets" />);
    
    expect(screen.getByText('Active Wallets')).toBeInTheDocument();
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('Timeframe')).toBeInTheDocument();
  });

  it('renders social mentions correctly', () => {
    render(<MetricDetailsDrawer {...defaultProps} metric="mentions" />);
    
    expect(screen.getByText('Social Mentions')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument(); // mentions count
    expect(screen.getByText('Timeframe')).toBeInTheDocument();
  });

  it('renders development activity correctly', () => {
    render(<MetricDetailsDrawer {...defaultProps} metric="commits" />);
    
    expect(screen.getByText('Development Activity')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument(); // commits count
  });

  it('calls onClose when close button is clicked', () => {
    render(<MetricDetailsDrawer {...defaultProps} metric="tvl" />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('changes timeframe when selected', () => {
    render(<MetricDetailsDrawer {...defaultProps} metric="tvl" />);
    
    const select = screen.getByLabelText('Timeframe');
    fireEvent.mouseDown(select);
    fireEvent.click(screen.getByText('30d'));
    
    expect(screen.getByText('30d')).toBeInTheDocument();
  });
}); 