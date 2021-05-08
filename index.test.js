const { setupStreamingConnection } = require('./index');

const leaveGap = ({ lines, testCase, testCaseNo }) => {
  for (let i = 0; i< lines; i++) {
    console.log('');
  }
  console.log(`TestCase No: ${testCaseNo}`);
  console.log(`Running: ${testCase}`);
}

console.log('testing in process...');

(async () => {
// test case 1: sunny day scenario, all inputs are valid and outputs are expected to be valid json objects
  leaveGap({
    lines: 5,
    testCaseNo: 1,
    testCase: 'setup streamingConnection',
  });

  console.log('testCase1 failed');

})();
