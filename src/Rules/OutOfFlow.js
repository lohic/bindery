import Rule from './Rule';

class OutOfFlow extends Rule {
  constructor(options) {
    super(options);
    this.name = 'Out of Flow';
  }
  beforeAdd(elmt) {
    // Avoid breaking inside this element. Once it's completely added,
    // it will moved onto the background layer.

    elmt.setAttribute('data-ignore-overflow', true);
    return elmt;
  }
  afterAdd(elmt, book, continueOnNewPage, makeNewPage) {
    this.createOutOfFlowPages(elmt, book, makeNewPage);

    // Catches cases when we didn't need to create a new page. but unclear
    if (this.continue !== 'same' || book.pageInProgress.hasOutOfFlowContent) {
      continueOnNewPage(true);
      if (this.continue === 'left' || this.continue === 'right') {
        book.pageInProgress.setPreference(this.continue);
      }
    }

    return elmt;
  }
}

export default OutOfFlow;
