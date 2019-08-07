/**
 * TODO use jest
 */

import Noverlap from '../index';

const noverlap = Noverlap();

export const processSomeData = noverlap(data => {
  console.log(`this execution should only happen once within 420ms when applied with: ${data})`);
  return `response from submitting: ${data}`
});

export const fetchSomeData = noverlap(payload => {
  console.log(`this fetch should only happen once within 420ms when applied with: ${payload})`);
  return new Promise((resolve, reject) => setTimeout(() => resolve(`response from submitting: ${payload}`)));
});

import asyncConfig from './async-config';
import async from './async';
import callbacks from './callbacks';
import override from './override';
import repeat from './repeat';
import timeout from './timeout';
import unique from './unique';
(async () => {
  try {
    console.log('=== testing async config ===');
    await asyncConfig();
    console.log();
    
    console.log('=== testing async ===')
    await async();
    console.log();

    console.log('=== testing callbacks ===')
    await callbacks();
    console.log();

    console.log('=== testing override ===')
    await override();
    console.log();

    console.log('=== testing repeat ===')
    await repeat();
    console.log();

    console.log('=== testing timeout ===')
    await timeout();
    console.log();

    console.log('=== testing unique ===')
    await unique();
    console.log();

    console.log('✅');
  } catch (err) {
    console.error(err)
  }
})();