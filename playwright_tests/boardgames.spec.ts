import { test, expect, request, APIRequestContext } from '@playwright/test';

let apiContext: APIRequestContext;
const baseURL = 'http://localhost:8080';

//Create an apiContext to make requests
test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
        baseURL,
        extraHTTPHeaders: {
            'Content-Type': 'application/json',
        }
    });
});

//Destroy api context after test ends
test.afterAll(async () => {
    await apiContext.dispose();
});

//Take a screenshot after a failure
test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
        await page.screenshot({ path: `screenshots/${testInfo.title}-${testInfo.project.name}.png`, fullPage: true });

        const html = await page.locator('body').evaluate(el => el.outerHTML);
        console.log(html);
    }
});

test('should delete board game through UI and confirm it is gone', async ({ page, browserName }) => {
    //test.skip(browserName == 'webkit', 'Skip tests in webkit for now');
    test.skip();
    //Create a test board game in the DB for testing purposes through an API call
    const testGame = {
        name: `Test Game ${Date.now()}`,
        publisher: 'Test Publisher',
        reorder_quantity: 50,
    };

    const createResponse = await apiContext.post('/api/boardgames', { data: testGame });
    expect(createResponse.ok()).toBeTruthy();
    const created = await createResponse.json();
    const gameId = created.boardgame_id;

    //Go through steps of deleting board game through UI
    await page.goto('https://anthowu07.github.io/#/boardgames');

    // Set up handler for the confirm popup
    page.once('dialog', async dialog => {
        expect(dialog.message()).toContain('Are you sure you want to delete this board game? All associated inventory will also be deleted.');
        await dialog.accept(); // Click "OK"
    });

    //Surround delete with try/catch incase it fails through UI
    try {
        const row = page.locator('[data-testid="board-game-row"]', { hasText: testGame.name });
        const deleteButton = row.getByTestId('delete-button');
        await deleteButton.click({ timeout: 5000 });
        // Assert that the board game is no longer in the table:
        await expect(
            page.locator('[data-testid="board-game-row"]', { hasText: testGame.name })
        ).toHaveCount(0);

    } catch (error) {
        console.warn('UI deletion failed, falling back to API cleanup:', error);

        // Make a DELETE request in case of UI failure
        const deleteResponse = await apiContext.delete(`/api/boardgames/${gameId}`);
        expect(deleteResponse.ok()).toBeTruthy();
        throw error;
    }
});

