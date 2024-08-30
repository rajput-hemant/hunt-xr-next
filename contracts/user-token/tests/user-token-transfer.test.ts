import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.0.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

Clarinet.test({
    name: "Ensure that tokens can be transferred between accounts",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        let deployer = accounts.get('deployer')!;
        let wallet1 = accounts.get('wallet_1')!;
        let wallet2 = accounts.get('wallet_2')!;
        let block = chain.mineBlock([
            Tx.contractCall('user-token', 'mint', [types.uint(100), types.principal(wallet1.address)], deployer.address),
            Tx.contractCall('user-token', 'transfer', [types.uint(50), types.principal(wallet1.address), types.principal(wallet2.address), types.none()], wallet1.address)
        ]);
        assertEquals(block.receipts.length, 2);
        assertEquals(block.height, 2);
        block.receipts[1].result.expectOk().expectBool(true);
        block.receipts[1].events.expectFungibleTokenTransferEvent(50, wallet1.address, wallet2.address, 'user-token');
    },
});