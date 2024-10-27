import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import SearchForm from './SearchForm';
import { searchKeywords } from '../services/apiService';

jest.mock('../services/apiService');

describe('SearchForm', () => {
    const mockOnResults = jest.fn();
    const mockSetLoading = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the form correctly', () => {
        render(<SearchForm onResults={mockOnResults} setLoading={mockSetLoading} />);
        expect(screen.getByPlaceholderText(/enter keywords/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/enter url/i)).toBeInTheDocument();
        expect(screen.getByText(/search/i)).toBeInTheDocument();
    });

    test('submits the form with valid inputs', async () => {
        (searchKeywords as jest.Mock).mockResolvedValue('results');

        render(<SearchForm onResults={mockOnResults} setLoading={mockSetLoading} />);

        fireEvent.change(screen.getByPlaceholderText(/enter keywords/i), { target: { value: 'conveyancing software' } });
        fireEvent.change(screen.getByPlaceholderText(/enter url/i), { target: { value: 'www.smokeball.com' } });
        fireEvent.click(screen.getByText(/search/i));

        await waitFor(() => {
            expect(mockSetLoading).toHaveBeenCalledWith(true);
            expect(searchKeywords).toHaveBeenCalledWith('conveyancing software', 'www.smokeball.com');
            expect(mockOnResults).toHaveBeenCalledWith('results');
            expect(mockSetLoading).toHaveBeenCalledWith(false);
        });
    });

    test('shows error when keywords are missing', async () => {
        render(<SearchForm onResults={mockOnResults} setLoading={mockSetLoading} />);

        fireEvent.change(screen.getByPlaceholderText(/enter url/i), { target: { value: 'www.smokeball.com' } });
        fireEvent.click(screen.getByText(/search/i));

        await waitFor(() => {
            expect(screen.getByText(/keywords are required/i)).toBeInTheDocument();
            expect(mockSetLoading).not.toHaveBeenCalled();
            expect(mockOnResults).not.toHaveBeenCalled();
        });
    });

    test('shows error when URL is missing', async () => {
        render(<SearchForm onResults={mockOnResults} setLoading={mockSetLoading} />);

        fireEvent.change(screen.getByPlaceholderText(/enter keywords/i), { target: { value: 'conveyancing software' } });
        fireEvent.click(screen.getByText(/search/i));

        await waitFor(() => {
            expect(screen.getByText(/url is required/i)).toBeInTheDocument();
            expect(mockSetLoading).not.toHaveBeenCalled();
            expect(mockOnResults).not.toHaveBeenCalled();
        });
    });

    test('disables the button and shows loading state during form submission', async () => {
        (searchKeywords as jest.Mock).mockResolvedValue('results');

        render(<SearchForm onResults={mockOnResults} setLoading={mockSetLoading} />);

        fireEvent.change(screen.getByPlaceholderText(/enter keywords/i), { target: { value: 'conveyancing software' } });
        fireEvent.change(screen.getByPlaceholderText(/enter url/i), { target: { value: 'www.smokeball.com' } });
        fireEvent.click(screen.getByText(/search/i));

        expect(screen.getByText(/search/i)).toBeDisabled();

        await waitFor(() => {
            expect(mockSetLoading).toHaveBeenCalledWith(true);
            expect(searchKeywords).toHaveBeenCalledWith('conveyancing software', 'www.smokeball.com');
            expect(mockOnResults).toHaveBeenCalledWith('results');
            expect(mockSetLoading).toHaveBeenCalledWith(false);
        });

        expect(screen.getByText(/search/i)).not.toBeDisabled();
    });
});