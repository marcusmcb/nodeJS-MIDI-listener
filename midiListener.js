const midi = require('midi');

const input = new midi.Input();

const numberOfPorts = input.getPortCount();

for (let i = 0; i < numberOfPorts; i++) {
  console.log(`Input Port ${i}: ${input.getPortName(i)}`);
}

input.ignoreTypes(false, false, false);

input.on('message', (deltaTime, message) => {
  console.log('------------')
  console.log(`Received message [${message}] after ${deltaTime} ticks.`);
});

if (numberOfPorts > 0) {
  input.openPort(0);
  console.log('Listening for MIDI messages...');
} else {
  console.log('No MIDI devices found.');
}

process.on('SIGINT', () => {
  input.closePort();
  console.log('\nClosed MIDI port and exiting.');
  process.exit();
});
