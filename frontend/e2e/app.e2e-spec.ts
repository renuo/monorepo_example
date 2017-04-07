import { FrontendPage } from './app.po';

describe('frontend App', () => {
  let page: FrontendPage;

  beforeEach(() => {
    page = new FrontendPage();
  });

  it('should show list of todos', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toContain('hello');
    expect(page.getParagraphText()).toContain('world');
  });
});
