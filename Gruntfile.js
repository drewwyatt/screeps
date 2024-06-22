require('dotenv').config()

const email = process.env.SCREEPS_EMAIL
const token = process.env.SCREEPS_TOKEN
const branch = process.env.SCREEPS_BRANCH ?? 'main'

if (!email || !token) {
  throw new Error('Missing SCREEPS_EMAIL or SCREEPS_TOKEN')
}

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-screeps')

  grunt.initConfig({
    screeps: {
      options: {
        email,
        token,
        branch,
      },
      dist: {
        src: ['dist/*.js'],
      },
    },
  })
}
