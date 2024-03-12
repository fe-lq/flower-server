pipeline {
  agent any
  tools {
    nodejs "nodejs_20.11.1"
  }
  stages {
    stage('Dependency') {
      steps {
        sh 'pnpm --registry http://registry.npmmirror.com/ install --no-frozen-lockfile'
      }
    }
    stage('Build') {
      steps {
        sh 'pnpm run build'
      }
    }
  }
}
