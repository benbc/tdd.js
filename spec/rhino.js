
load('/home/ben/.gem/ruby/1.8/gems/jspec-3.1.0/lib/jspec.js')
load('/home/ben/.gem/ruby/1.8/gems/jspec-3.1.0/lib/jspec.xhr.js')
load('lib/tdd.js')
load('spec/unit/spec.helper.js')

JSpec
.exec('spec/unit/spec.js')
.run({ reporter: JSpec.reporters.Terminal, fixturePath: 'spec/fixtures' })
.report()