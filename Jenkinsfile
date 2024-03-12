pipeline {
  agent any
  tools {
    nodejs "nodejs_20.11.1"
  }
  stages {
    stage('Dependency') {
      steps {
        sh 'pnpm install --no-frozen-lockfile'
      }
    }
    stage('Build') {
      steps {
        sh 'pnpm run clean'
        sh 'pnpm run build'
      }
    }
  }
}
