var exec = require('child_process').exec

var gulp = require('gulp')
var gulpsync = require('gulp-sync')(gulp)

// npm run build
gulp.task('build-dapple-token-auction', function (cb) {
  exec('dapple build --template meteor --no-deploy-data', {cwd: 'dapple_packages/token-auction'}, function (err, res, failed) {
    if (err) {
      console.log(err)
    } else if (failed) {
      process.stdout.write(failed)
    } else {
      process.stdout.write('\u001b[32mDapple build completed!\n')
    }
    cb(err)
  })
})

gulp.task('copy-dapple-token-auction', ['build-dapple-token-auction'], function (){
  return gulp.src([
      'dapple_packages/token-auction/build/meteor.js'
  ])
  .pipe(gulp.dest('frontend/packages/dapple/build/'))
})

// meteor-build-client ../build
gulp.task('build-meteor', function (cb) {
  exec('meteor-build-client ../dist --path ""', {cwd: 'frontend'}, function (err, res, failed) {
    if (err) {
      console.log(err)
    } else if (failed) {
      process.stdout.write(failed)
    } else {
      process.stdout.write('\u001b[32mMeteor build completed!\n')
    }
    cb(err)
  })
})

gulp.task('build-dapple', ['copy-dapple-token-auction'])
gulp.task('deploy', gulpsync.sync(['build-dapple', 'build-meteor']))

gulp.task('build', ['build-dapple'])
gulp.task('default', ['build'])