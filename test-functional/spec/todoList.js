describe('testing', function () {

  before('setup assertion lib', function () {
    var chai = require('chai');
    var chaiAsPromised = require('chai-as-promised');

    chai.use(chaiAsPromised);
    expect = chai.expect;
    chai.Should();
  });

  it('should test', function () {
    return browser
      .url('http://google.com')
      .getTitle().should.eventually.be.equal('Google');
  });

});
