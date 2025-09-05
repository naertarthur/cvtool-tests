pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/naertarthur/cvtool-tests.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                bat 'npx wdio run wdio.conf.js'
            }
        }
        stage('Allure Report') {
            steps {
                bat 'npx allure generate allure-results --clean -o allure-report'
            }
            post {
                always {
                    archiveArtifacts artifacts: 'allure-report/**', fingerprint: true
                }
            }
        }
    }
}
