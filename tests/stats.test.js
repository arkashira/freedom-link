import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Stats from '../ui/stats';

jest.mock('axios');

describe('Stats component', () => {
  it('renders data usage statistics', async () => {
    axios.get.mockResolvedValue({
      data: {
        uploaded: 1024,
        downloaded: 2048,
        total: 3072,
      },
    });
    const { getByText } = render(<Stats />);
    await waitFor(() => expect(getByText('Uploaded: 1024 bytes')).toBeInTheDocument());
    await waitFor(() => expect(getByText('Downloaded: 2048 bytes')).toBeInTheDocument());
    await waitFor(() => expect(getByText('Total: 3072 bytes')).toBeInTheDocument());
  });

  it('renders error message when API call fails', async () => {
    axios.get.mockRejectedValue(new Error('API error'));
    const { getByText } = render(<Stats />);
    await waitFor(() => expect(getByText('Error: API error')).toBeInTheDocument());
  });
});