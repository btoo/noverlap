import Noverlap from '../index';

const noverlap = Noverlap();

export const processSomeData = noverlap(data => {
  console.log(`this execution should only happen once within 420ms when applied with: ${data})`);
  return `response from submitting: ${data}`
});

export const fetchSomeData = noverlap(payload => {
  console.log(`this fetch should only happen once within 420ms when applied with: ${payload})`);
  return new Promise((resolve, reject) => setTimeout(_ => resolve(`response from submitting: ${payload}`)));
});
