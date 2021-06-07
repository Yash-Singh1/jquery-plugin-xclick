const timeout = 1500;

describe(
  'xclick helper function',
  () => {
    let page;
    beforeAll(async () => {
      page = await global.__BROWSER__.newPage();
      await page.goto('http://localhost:5432/test/index.html');
    }, timeout);

    it('n click should work', async () => {
      const text = await page.evaluate(() => {
        const n = Math.floor(Math.random() * 100 + 1);
        $('button').xclick(n, () => $('#logs').html('click'));
        for (let i = 0; i < n; i++) {
          $('button').click();
        }
        return $('#logs').html();
      });
      expect(text).toEqual('click');
    });
  },
  timeout
);
