import { GamesDenPage } from './app.po';

describe('games-den App', () => {
  let page: GamesDenPage;

  beforeEach(() => {
    page = new GamesDenPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
