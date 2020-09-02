const execSync = require('child_process').execSync
const { gitCommands, NO_GIT_ERROR_MESSAGE } = require('./gitCommands')

function compareVersion (v1, v2) {
  let _v1 = v1.split('.'),
    _v2 = v2.split('.'),
    _r = parseInt(_v1[0] || 0, 10) - parseInt(_v2[0] || 0, 10)

  return v1 !== v2 && _r === 0 ? compareVersion(_v1.splice(1).join('.'),
    _v2.splice(1).join('.')) : _r
}

function formatDate (date) {
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  month = month < 10 ? ('0' + month) : month
  let day = date.getDate()
  day = day < 10 ? ('0' + day) : day
  let hour = date.getHours()
  hour = hour < 10 ? ('0' + hour) : hour
  let minute = date.getMinutes()
  minute = minute < 10 ? ('0' + minute) : minute
  let second = date.getSeconds()
  second = second < 10 ? ('0' + second) : second
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

function getGitInfo () {
  const gitInfo = {}
  const errorMsg = execSync(gitCommands.status).toString().trim()
  if (errorMsg !== NO_GIT_ERROR_MESSAGE) {
    gitInfo.commitId = execSync(gitCommands.commitHash).toString().trim()
    gitInfo.userName = execSync(gitCommands.username).toString().trim()
    gitInfo.email = execSync(gitCommands.email).toString().trim()
    gitInfo.commitDate = formatDate(
      new Date(execSync(gitCommands.lastCommitDate)))

    gitInfo.commitMessage = execSync(gitCommands.commitMessage).
      toString().
      trim()
  } else {
    return null
  }
  return gitInfo
}

module.exports = {
  compareVersion,
  formatDate,
  getGitInfo,
}



