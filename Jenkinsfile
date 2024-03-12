pipeline {
  agent any
  tools {
    nodejs "nodejs_20.11.1"
  }
  stages {
    stage('Dependency') {
      steps {
        sh 'npm install pnpm'
        sh 'pnpm install'
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
