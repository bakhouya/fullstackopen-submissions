
import { test, expect } from '@playwright/test'

test.describe('Blog app', () => {
    beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173')
    })

    test('front page shows login form correctly', async ({ page }) => {
      const loginButton = page.getByRole('button', { name: 'login' })
      await expect(loginButton).toBeVisible() 
      
      await expect(page.getByLabel('username')).toBeVisible()
      await expect(page.getByLabel('password')).toBeVisible()
  
    })
    test('user can log in', async ({ page }) => {
      const loginButton = page.getByRole('button', { name: 'login' })
      await expect(loginButton).toBeVisible() 

      await page.getByLabel('username').fill('mostafa')
      await page.getByLabel('password').fill('12345')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible()
      await expect(page.getByText('Blogs')).toBeVisible()
     
    })
    test.describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            const loginButton = page.getByRole('button', { name: 'login' })
            await page.getByLabel('username').fill('mostafa')
            await page.getByLabel('password').fill('12345')
            await page.getByRole('button', { name: 'login' }).click()
        })
    
        test('a new note can be created', async ({ page }) => {
          await page.getByRole('button', { name: 'new note' }).click()
          await page.getByRole('textbox').fill('a note created by playwright')
          await page.getByRole('button', { name: 'save' }).click()
          await expect(page.getByText('a note created by playwright')).toBeVisible()
        })
      })
  
  })