import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class QueuePage extends BasePage {
    readonly queuesTableRows: Locator;
    readonly noQueuesMessage: Locator;
    readonly tableHeaders: string[] = [
        'Name',
        'Coming from',
        'Priority',
        'Status',
        'Queue',
        'Wait time',
        'Actions'
    ];

    constructor(page: Page) {
        super(page);
        this.queuesTableRows = page.locator('table.cds--data-table > tbody > tr');
        this.noQueuesMessage = page.locator('p.-esm-service-queues__queue-table__content___hD-u1', { hasText: 'No patients to display' });
    }

    /**
     * Returns the number of service queues (rows) in the table.
     */
    async getServiceQueuesCount(): Promise<number> {
        if (await this.noQueuesMessage.isVisible().catch(() => false)) {
            return 0;
        }
        return await this.queuesTableRows.count();
    }

    /**
     * Returns all queue row details as an array of arrays (each row is an array of cell texts).
     */
    async getAllServiceQueuesDetails(): Promise<string[][]> {
        const count = await this.getServiceQueuesCount();
        const details: string[][] = [];
        for (let i = 0; i < count; i++) {
            const row = this.queuesTableRows.nth(i);
            const cellCount = await row.locator('td').count();
            const rowData: string[] = [];
            for (let j = 0; j < cellCount; j++) {
                rowData.push(await row.locator('td').nth(j).innerText());
            }
            details.push(rowData);
        }
        return details;
    }
}
