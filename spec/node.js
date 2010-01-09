
process.mixin(require('sys'))
require.paths.unshift('spec', '/home/ben/.gem/ruby/1.8/gems/jspec-3.1.0/lib', 'lib')
require('jspec')
require('unit/spec.helper')
require('yourlib')

quit = process.exit
print = puts

readFile = function(path) {
  var result
  require('posix')
    .cat(path, "utf8")
    .addCallback(function(contents){ result = contents })
    .addErrback(function(){ throw new Error("failed to read file `" + path + "'") })
    .wait()
  return result
}

JSpec
  .exec('spec/unit/spec.js')
  .run({ reporter: JSpec.reporters.Terminal })
  .report()
