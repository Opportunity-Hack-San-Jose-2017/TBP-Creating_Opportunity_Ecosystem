import { CilentPage } from './app.po';

describe('cilent App', () => {
  let page: CilentPage;

  beforeEach(() => {
    page = new CilentPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
