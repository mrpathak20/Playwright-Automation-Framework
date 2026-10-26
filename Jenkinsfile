
pipeline {
    agent any

    parameters {
        choice(
            name: 'SPEC_FILE',
            choices: [
                'tests/playw0.spec.js',
                'tests/playw1.spec.js',
                'tests/parallel.spec.js',
                'tests/apie2e.spec.js',
                'tests/api.spec.js'
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
                sh 'git --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browser') {
           
        when {
           expression {
                 return !(params.SPEC_FILE in [
              'tests/api.spec.js',
            'tests/apie2e.spec.js'
              ])
             }
}

            steps {
                sh 'npx playwright install chromium'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    if (params.SPEC_FILE in ['tests/api.spec.js', 'tests/apie2e.spec.js']) {
                        echo 'Running API tests without the UAT UI environment'
                        sh 'npx playwright test "${SPEC_FILE}"'
                    } else {
                        echo 'Running UI tests against the configured UAT environment'
                        sh 'npx cross-env TEST_ENV=uat playwright test "${SPEC_FILE}"'
                    }
                }
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
