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
      await page.reload();
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

    it('should reset every 500 ms', async () => {
      await page.reload();
      await page.evaluate(async () => {
        const n = Math.floor(Math.random() * 100 + 1);
        $('button').xclick(n, () => $('#logs').html('click'));
        for (let i = 0; i < n - 1; i++) {
          $('button').click();
        }
      });
      setTimeout(async () => {
        const text = await page.evaluate(async () => {
          $('button').click();
          return $('#logs').html();
        });
        expect(text).toEqual('not clicked');
      }, 500);
    });

    it('should invalidate timers on next iteration', async () => {
      await page.reload();
      const text = await page.evaluate(() => {
        const n = Math.floor(Math.random() * 100 + 1);
        $('button').xclick(n, () =>
          $('#logs').html($('#logs').html() + 'click')
        );
        for (let i = 0; i < 2 * n; i++) {
          $('button').click();
        }
        return $('#logs').html();
      });
      expect(text).toEqual('not clickedclickclick');
    });
  },
  timeout
);
