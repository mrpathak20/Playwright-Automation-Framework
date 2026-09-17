pipeline {
    agent any

    parameters {
        choice(
            name: 'SPEC_FILE',
            choices: [
                'tests/playw0.spec.js',
                'tests/playw1.spec.js'
            ],
            description: 'Select the Playwright spec file to execute'
        )
    }

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
                sh 'npx cross-env TEST_ENV=uat playwright test "${SPEC_FILE}"'
            }
        }
    }

    post {
        always {
            sh 'npm run allure:generate || true'

            archiveArtifacts(
                artifacts: 'playwright-report/**, allure-report/**, test-results/**',
                allowEmptyArchive: true
            )
        }
    }
}