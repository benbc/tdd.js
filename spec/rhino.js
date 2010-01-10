load('spec/lib/env.js');
Envjs('spec/fixture.html', { logLevel: Envjs.NONE });
load('lib/jquery.js');
load('spec/lib/jspec.js');
load('spec/lib/jspec.jquery.js');
load('spec/lib/jspec.xhr.js');
load('lib/tdd.js');
load('spec/unit/spec.helper.js');

JSpec
  .exec('spec/unit/spec.js')
  .run({ reporter: JSpec.reporters.Terminal, fixturePath: 'spec/fixtures' })
  .report();
