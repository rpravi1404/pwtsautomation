import {expect, test} from '@playwright/test';
import {HomePage} from '../pages/homePage';

test.describe('IMDB Tests', () => {
  test('should search and assert movie details', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.navigateToHomePage();
        await expect(page).toHaveTitle(/IMDb/);
        await homePage.searchMovie('Inception');
        const movieDetails = await homePage.getMovieDetails();
        expect(movieDetails.title).toBe('Inception');
        expect(movieDetails.releaseYear).toContain('2010');
        const rating = Number(movieDetails.rating?.split('/')[0]);
        expect(rating).toBeGreaterThan(8);
        expect(movieDetails.genres).toContain('Action');
        console.log('Director:', movieDetails.director);
    });
  });