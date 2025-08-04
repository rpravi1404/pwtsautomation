
export class HomePage {
    searchBox: any;
    page: any;
    searchResult: any;
    title: any;
    releaseYear: any;
    rating: any;
    genres: any;
    director: any;
    constructor(page: any) {
        this.page = page;
        this.searchBox = page.locator('#suggestion-search');
        this.searchResult = page.getByTestId('search-result--const').first();
        this.title = page.getByTestId('hero__primary-text');
        this.releaseYear = page.locator("a[class *= 'ipc-link'][href *= '/releaseinfo/']");
        this.rating = page.getByTestId('hero-rating-bar__aggregate-rating__score').first();
        this.genres = page.locator('.ipc-chip-list__scroller').locator('a');
        this.director = page.getByTestId('title-pc-principal-credit').first().locator('.ipc-metadata-list-item__content-container');
    }

    async navigateToHomePage() {
        await this.page.goto('https://www.imdb.com');
    }

    async searchMovie(movieName: string) {
        await this.searchBox.fill(movieName);
        await this.searchResult.click();
    }

    async getMovieDetails() {
        return {
            title: await this.title.textContent(),
            releaseYear: await this.releaseYear.textContent(),
            rating: await this.rating.textContent(),
            genres: await this.genres.allTextContents(),
            director: await this.director.textContent(),
        };
    }

}