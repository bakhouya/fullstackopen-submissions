import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateForm from '../create'

test('<CreateForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<CreateForm createBlog={createBlog} />)

  const inputTitle = screen.getByRole('textbox', { name: /title/i })
  const inputAuthor = screen.getByRole('textbox', { name: /author/i })
  const inputUrl = screen.getByRole('textbox', { name: /url blog/i })
  const inputLikes = screen.getByRole('spinbutton', { name: /likes/i })
  const sendButton = screen.getByText('Create')

  await user.type(inputTitle, 'testing a form title')
  await user.type(inputAuthor, 'mostafa')
  await user.type(inputUrl, 'http://test.com')
  await user.type(inputLikes, '5')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing a form title')
})
