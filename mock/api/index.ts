import MockRecordAPI from './record'
import MockConfigAPI from './config'
import MockUserAPI from './user'
import MockContestAPI from './contest'
import MockProblemAPI from './problem'
import MockAuth from './auth'

export default [
  ...MockRecordAPI,
  ...MockConfigAPI,
  ...MockUserAPI,
  ...MockContestAPI,
  ...MockProblemAPI,
  ...MockAuth,
]
