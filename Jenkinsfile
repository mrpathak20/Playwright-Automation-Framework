pipeline {
    agent any

    environment {
        PATH = "/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
    }

    stages {
        stage('Environment Check') {
            steps {
                sh 'node -v'
                sh 'npm -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browser') {
            steps {
                sh 'npx playwright install chromium'
            }
        }

       stage('Run Playwright Tests') {
            steps {
                sh 'npx cross-env TEST_ENV=uat playwright test tests/playw1.spec.js'
            }
        }
    }

    post {
        always {
            sh 'npm run allure:generate || true'

            archiveArtifacts artifacts: 'playwright-report/**, allure-report/**, test-results/**', 
                             allowEmptyArchive: true
        }
    }
}