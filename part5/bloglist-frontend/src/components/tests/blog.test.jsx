import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Blog from '../Blog'; 


vi.mock('react-icons/fa', () => ({
  FaThumbsUp: () => <span data-testid="fa-thumbs-up">Like Icon</span>,
}));

describe('Blog Component Tests (5.13, 5.14, 5.15)', () => {
  const mockBlog = {
    title: 'How to write robust tests',
    author: 'Code Master',
    url: 'http://testurl.com/robust',
    likes: 10,
    user: { username: 'tester', name: 'Test User' },
  };

  const mockUser = { username: 'tester', name: 'Test User' };
  
  // Define mock functions using vi.fn()
  let mockLikeHandler = vi.fn();
  let mockDeleteHandler = vi.fn();

  beforeEach(() => {
    // Reset the mock functions before each test
    mockLikeHandler.mockClear();
    mockDeleteHandler.mockClear();
  });
  
  // Helper function to render the component with all required props
  const renderBlog = (blog = mockBlog) => {
    return render(
      <Blog blog={blog} onLike={mockLikeHandler} onDelete={mockDeleteHandler} user={mockUser} />
    );
  };
  // ----------------------------------------------------------------------
  // Title and Author Visible, URL and Likes Hidden by Default
  // ----------------------------------------------------------------------
  test('Renders title and author, but hides URL and likes by default', () => {
    renderBlog();
    // 1. Title and Author are visible
    const summaryText = screen.getByText(`${mockBlog.title} - ${mockBlog.author}`);
    expect(summaryText).toBeInTheDocument();

    // 2. URL element is NOT visible
    const urlElement = screen.queryByText(mockBlog.url);
    expect(urlElement).not.toBeInTheDocument();

    // 3. Likes count is NOT visible
    expect(screen.queryByText(`Likes: ${mockBlog.likes}`)).not.toBeInTheDocument();
    
    // Check for a details container if used, otherwise rely on content checks
    const detailsContainer = screen.queryByTestId('blog-details-container');
    expect(detailsContainer).toBeNull();
  });

  // ----------------------------------------------------------------------
  // URL and Likes are shown when the 'view' button is clicked
  // ----------------------------------------------------------------------
  test('Renders URL and likes when the view button is clicked', () => {
    renderBlog();

    // 1. Find the 'view' button
    const viewButton = screen.getByRole('button', { name: /view/i });

    // 2. Click the button to show details
    fireEvent.click(viewButton);

    // 3. The button text changes to 'hide'
    expect(screen.getByRole('button', { name: /hide/i })).toBeInTheDocument();

    // 4. URL is now visible
    const urlElement = screen.getByText(mockBlog.url);
    expect(urlElement).toBeInTheDocument();

    // 5. Likes count is now visible
    const likesElement = screen.getByRole('button', { name: /like/i });
    expect(likesElement).toBeInTheDocument();
  });

  // ----------------------------------------------------------------------
  // Like button clicked twice calls event handler twice
  // ----------------------------------------------------------------------
  test('Like handler is called twice when the button is clicked twice', () => {
    renderBlog();

    // 1. Show details to reveal the Like button
    const viewButton = screen.getByRole('button', { name: /view/i });
    fireEvent.click(viewButton);

    // 2. Find the like button
    const likeButton = screen.getByRole('button', { name: /like/i });

    // 3. Click it twice
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    // 4. The mock handler was called exactly twice
    expect(mockLikeHandler.mock.calls).toHaveLength(2);
    // 5. Check if it was called with the correct blog object
    expect(mockLikeHandler).toHaveBeenCalledWith(mockBlog);
  });
});
