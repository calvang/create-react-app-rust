const execSync = require('child_process').execSync;

module.exports = {
  build: () => {
    // first build app.big.wasm and then optimize to app.wasm with wasm-gc
    try {
      execSync(
        'rustc +nightly --target wasm32-unknown-unknown -O --crate-type=cdylib src/App.rs -o public/app.wasm'
      );
    } catch (error) {}
  },
  isRustInstalled: () => {
    try {
      execSync('rustup show');
      return true;
    } catch (error) {
      return false;
    }
  },
  installRustWebAssemblyTools: () => {
    execSync(
      'rustup default nightly && rustup update nightly && rustup target add wasm32-unknown-unknown --toolchain nightly'
    );
  },
};