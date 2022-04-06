describe('xclick helper function', () => {
  let page;
  beforeAll(async () => {
    page = await global.__BROWSER__.newPage();
    await page.goto('http://localhost:5432/test/index.html');
  });

  it('triggers event every x clicks', async () => {
    await page.reload();
    const text = await page.evaluate(() => {
      const n = Math.floor(Math.random() * 100 + 1);
      $('button').xclick(n, () => $('#logs').html('click'));
      for (let i = 0; i < n; i++) {
        $('button').trigger('click');
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
        $('button').trigger('click');
      }
    });
    setTimeout(async () => {
      const text = await page.evaluate(async () => {
        $('button').trigger('click');
        return $('#logs').html();
      });
      expect(text).toEqual('not clicked');
    }, 500);
  });

  it('should invalidate timers on next iteration', async () => {
    await page.reload();
    const text = await page.evaluate(() => {
      const n = Math.floor(Math.random() * 100 + 1);
      $('button').xclick(n, () => $('#logs').html($('#logs').html() + 'click'));
      for (let i = 0; i < 2 * n; i++) {
        $('button').trigger('click');
      }
      return $('#logs').html();
    });
    expect(text).toEqual('not clickedclickclick');
  });

  it('should reset on mousemove', async () => {
    await page.reload();
    await page.evaluate(() => {
      const n = Math.floor(Math.random() * 100 + 1);
      $('button').xclick(n, () => $('#logs').html('click'));
      for (let i = 0; i < n - 1; i++) {
        $('button').trigger('click');
      }
    });
    await page.mouse.move(100, 100);
    const text = await page.evaluate(() => {
      $('button').trigger('click');
      return $('#logs').html();
    });
    expect(text).toEqual('not clicked');
  });

  it('should allow chaining', async () => {
    await page.reload();
    await page.evaluate(() => {
      $('button')
        .xclick(1, () => $('#logs').html('click'))
        .text('Click me!');
    });
  });
});
