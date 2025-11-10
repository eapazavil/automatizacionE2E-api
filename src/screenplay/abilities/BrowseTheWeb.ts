import { Page } from '@playwright/test';

export class BrowseTheWeb {
    constructor(private page: Page) {}

    static using(page: Page): BrowseTheWeb {
        return new BrowseTheWeb(page);
    }

    async navigate(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async click(selector: string): Promise<void> {
        await this.page.click(selector);
    }

    async fill(selector: string, text: string): Promise<void> {
        await this.page.fill(selector, text);
    }

    async getText(selector: string): Promise<string | null> {
        return await this.page.textContent(selector);
    }

    getPage(): Page {
        return this.page;
    }
}